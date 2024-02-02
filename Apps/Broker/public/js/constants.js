export const USER_ID = 'DUMMY_USER_12345';
export const EVENT_TO_TEXT = {
    OrderCreated: 'Your order was created.',
    OrderCancelled: 'Your order was cancelled.',
    OrderCompleted: 'Your order was successfully completed.',
    PaymentAccepted: 'Your payment method was accepted.',
    PaymentDeclined: 'Your payment method was declined.',
    WorkerSearchStarted: 'Searching for a suitable delivery service...',
    WorkerSearchCompleted: 'Delivery service found!',
    WorkerAcceptedJob: 'Delivery service accepted the job.',
    WorkerDeclinedJob: 'Delivery service declined the job.',
    DeliveryStarted: 'Your order is on the way!',
    DeliveryAborted: 'The delivery of your order had to be aborted.',
    DeliveryCompleted: 'Your order has been delivered!',
};

export const WS_PROTOCOL = window.location.protocol === `https:` ? `wss:` : `ws:`;
export const WS_HOST = window.location.host;
export const WS_PATH = `/`;
export const WS_URL = `${WS_PROTOCOL}//${WS_HOST}${WS_PATH}`;

export const BODY = document.querySelector('body');
export const ORDER_BUTTON = document.getElementById('order-button');
export const PRODUCTS = document.getElementsByClassName('product');