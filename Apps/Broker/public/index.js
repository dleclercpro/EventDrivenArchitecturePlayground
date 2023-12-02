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

  const event = JSON.parse(message.data);
  const time = new Date(event.time);

  const emptyNotification = document.getElementById('empty-notification');
  const notifications = document.getElementById('notifications');

  if (notifications.contains(emptyNotification)) {
    notifications.removeChild(emptyNotification);
  }

  const eventElement = document.createElement('p');
  const timeElement = document.createElement('strong');

  timeElement.appendChild(document.createTextNode(`${formatTime(time)}:`));

  eventElement.appendChild(timeElement);
  eventElement.appendChild(document.createTextNode(' '));
  eventElement.appendChild(document.createTextNode(event.name));
  
  notifications.appendChild(eventElement);
}



const submitOrder = async () => {
  const products = document.getElementById('products-select');
  const productId = products.value;

  // Send order to server
  await fetch(`${URL}/order`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      userId: USER_ID,
      productId,
    }),
  });

  console.log(`Order sent: ${productId}`);
}