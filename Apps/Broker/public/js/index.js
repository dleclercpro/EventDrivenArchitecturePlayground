import { BODY, ORDER_BUTTON, USER_ID } from './constants.js';
import { addProductToOrder, removeProductFromOrder, getAllProductCounters, resetProductCounters, initializeProducts, blockStore } from './products.js';
import { formatTime, addNotification } from './utils.js';
import { createWebSocketConnection } from './ws.js';
import { sendOrder } from './calls.js';

// Dynamically construct WebSocket URL based on the current location
const WS_PROTOCOL = window.location.protocol === `https:` ? `wss:` : `ws:`;
const WS_HOST = window.location.host;
const WS_PATH = `/`;
const WS_URL = `${WS_PROTOCOL}//${WS_HOST}${WS_PATH}`;

const WS = createWebSocketConnection(WS_URL, USER_ID);



// Add event listeners
initializeProducts();



ORDER_BUTTON.addEventListener('click', async () => {
    if (ORDER_BUTTON.classList.contains('is-inactive')) {
        return;
    }

    const notifications = document.getElementById('notifications');
    const products = document.getElementsByClassName('product');

    const selectedProducts = Array.from(products).reduce((prev, current) => {
        const counter = current.querySelector('.counter');

        if (counter) {
            const count = Number(counter.textContent);
            return { ...prev, [current.dataset.name]: count };
        }

        return prev;
    }, {});

    // Remove previous notifications
    while (notifications.firstChild) {
        notifications.firstChild.remove();
    }

    // Block UI while order is being processed
    blockStore();

    // Show order to user
    addNotification(formatTime(new Date()), `You have ordered:`);
    Object.entries(selectedProducts).forEach(([product, count]) => {
        addNotification(formatTime(new Date()), `${count}X ${product}`);
    });

    // Send order to server
    await sendOrder({ userId: USER_ID, products: selectedProducts });
});