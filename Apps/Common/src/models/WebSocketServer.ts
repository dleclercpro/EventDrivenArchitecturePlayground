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

        this.server.on('connection', (ws: CustomWebSocket) => {
            this.logger.debug(`[WebSocket] Client connected.`);

            // FIXME: simulate authentication by assigning a user ID
            ws.userId = 'DUMMY_USER';

            ws.on('message', (message: string) => {
                this.logger.info(`[WebSocket] Received: ${message}`);
            });

            ws.on('close', () => {
                this.logger.info(`[WebSocket] Client disconnected.`);
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

                this.logger.info(`Server shut down gracefully.`);
                resolve();
            });
        });
    }

    public findWebSocketByUserId(userId: string) {
        if (!this.server) throw new Error('MISSING_SERVER');

        return Array.from(this.server.clients)
            .find((client) => {
                const ws = client as CustomWebSocket;
                return (
                    ws.userId === userId &&
                    ws.readyState === WebSocket.OPEN
                );
            }) as CustomWebSocket;
    }
}

export default WebSocketServer;