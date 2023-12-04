const HOST = `localhost`;
const PORT = 4000;
const URL = `http://${HOST}:${PORT}`;
const WS_URL = `ws://${HOST}:${PORT}`;
const USER_ID = 'DUMMY_USER_12345';

const WS = new WebSocket(WS_URL);

WS.addEventListener('open', (e) => handleOpenConnection(e));
WS.addEventListener('close', (e) => handleCloseConnection(e));
WS.addEventListener('error', (e) => handleError(e));
WS.addEventListener('message', (e) => handleMessage(e));

const EVENT_TO_TEXT = {
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



const formatTime = (date) => {

  // Extract hours, minutes, and seconds
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');

  // Concatenate into the desired format
  return `${hours}:${minutes}:${seconds}`;
}



const handleOpenConnection = (event) => {
  console.log(`[WebSocket] Connection opened.`);

  // Send user ID to server
  WS.send(USER_ID);
}

const handleCloseConnection = (event) => {
  console.log(`[WebSocket] Connection closed.`);
}

const handleError = (event) => {
  console.error(`[WebSocket] Error: ${JSON.stringify(event)}`)
}

const handleMessage = (message) => {
  console.log(`[WebSocket] Message: ${message}`);

  const notifications = document.getElementById('notifications');
  const eventElement = document.createElement('p');
  const timeElement = document.createElement('strong');

  const event = JSON.parse(message.data);
  const time = formatTime(new Date(event.time));

  timeElement.appendChild(document.createTextNode(`${time}:`));

  eventElement.appendChild(timeElement);
  eventElement.appendChild(document.createTextNode(' '));
  eventElement.appendChild(document.createTextNode(EVENT_TO_TEXT[event.name]));
  
  notifications.appendChild(eventElement);
}



const submitOrder = async () => {
  const notifications = document.getElementById('notifications');
  const products = document.getElementById('products-select');

  // Remove previous notifications
  while (notifications.firstChild) {
    notifications.removeChild(notifications.firstChild);
  }

  // Get product selected by customer
  const productId = products.value;

  // Send order to server
  const order = { userId: USER_ID, productId };
  await fetch(`${URL}/order`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(order),
  });

  console.log(`Order sent: [User ID: ${order.userId}, Product ID: ${order.productId}]`);
}