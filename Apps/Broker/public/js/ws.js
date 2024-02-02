import { EVENT_TO_TEXT } from './constants.js';
import { resetStore, addNotification } from './ui.js';
import { formatTime } from './utils.js';

export const createWebSocketConnection = (url, userId) => {
    const ws = new WebSocket(url);

    ws.addEventListener('open', (e) => {
        console.log(`[WebSocket] Connection opened on: ${url}`);
        
        // Send user ID to server
        ws.send(userId);
    });

    ws.addEventListener('close', (e) => {
        console.log(`[WebSocket] Connection closed.`);
    });

    ws.addEventListener('error', (e) => {
        console.error(`[WebSocket] Error: ${JSON.stringify(event)}`)
    });

    ws.addEventListener('message', (message) => {
        console.log(`[WebSocket] Received message.`);

        const event = JSON.parse(message.data);
        const time = formatTime(new Date(event.time));

        addNotification(time, EVENT_TO_TEXT[event.name]);

        // Reset store functions once order has been cleared out
        if (['OrderCompleted', 'OrderCancelled'].includes(event.name)) {
            resetStore();
        }
    });

    return ws;
}