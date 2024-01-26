import http from 'http';
import WebSocket from 'ws';
import { Logger } from 'pino';
import { CustomWebSocket } from '../types/ServerTypes';

class WebSocketServer {
    protected logger: Logger;

    protected server?: WebSocket.Server;

    public constructor(logger: Logger) {
        this.logger = logger;
    }

    public async setup(server: http.Server) {
        this.server = new WebSocket.Server({ server });
    }

    public getServer() {
        return this.server;
    }

    public async start() {
        if (!this.server) throw new Error('MISSING_SERVER');

        this.server.on('listening', () => {
            this.logger.debug(`[WebSocket] Server is listening for connections...`);
        });

        this.server.on('connection', (ws: CustomWebSocket) => {
            this.logger.debug(`[WebSocket] Client connected.`);

            ws.on('message', (msg: string) => {
                const message = String(msg);

                this.logger.info(`[WebSocket] Received: ${message}`);

                // First message is user ID
                if (!ws.userId) {
                    ws.userId = message;

                    // Store WS connection
                    this.server?.clients.add(ws);

                    this.logger.info(`[WebSocket] Stored socket connection for user: ${ws.userId}`);
                }
            });

            ws.on('close', () => {
                this.logger.info(`[WebSocket] Client disconnected.`);

                this.server?.clients.delete(ws);
            });

            ws.on('error', (err) => {
                this.logger.error(`[WebSocket] Client experienced an error: ${err}`);

                this.server?.clients.delete(ws);
            });
        });
    }

    public async stop() {
        if (!this.server) throw new Error('MISSING_SERVER');

        return new Promise<void>((resolve, reject) => {
            this.server!.close((err) => {
                if (err) {
                    this.logger.fatal(`Could not shut down server gracefully: ${err}`);
                    reject(err);
                }

                this.logger.info(`[WebSocket] Server shut down gracefully.`);
                resolve();
            });
        });
    }

    public findOpenWebSocketByUserId(userId: string) {
        if (!this.server) throw new Error('MISSING_SERVER');

        return Array.from(this.server.clients)
            .find((client) => {
                const ws = client as CustomWebSocket;
                this.logger.trace(`Found WS client for user: ${ws.userId}`);

                return (
                    ws.userId === userId &&
                    ws.readyState === WebSocket.OPEN
                );
            }) as CustomWebSocket | undefined;
    }
}

export default WebSocketServer;