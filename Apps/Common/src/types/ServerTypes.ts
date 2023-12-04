import * as WebSocket from 'ws';

export interface CustomWebSocket extends WebSocket {
  userId?: string;
};