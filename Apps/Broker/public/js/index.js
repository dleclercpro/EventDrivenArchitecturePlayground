import { USER_ID } from './constants.js';
import { initializeStore } from './ui.js';
import { createWebSocketConnection } from './ws.js';

// Dynamically construct WebSocket URL based on the current location
const WS_PROTOCOL = window.location.protocol === `https:` ? `wss:` : `ws:`;
const WS_HOST = window.location.host;
const WS_PATH = `/`;
const WS_URL = `${WS_PROTOCOL}//${WS_HOST}${WS_PATH}`;

const WS = createWebSocketConnection(WS_URL, USER_ID);

// Setup UI
initializeStore();