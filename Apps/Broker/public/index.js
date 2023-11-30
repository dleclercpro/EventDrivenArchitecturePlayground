const PROTOCOL = `ws`;
const HOST = `localhost`;
const PORT = 4000;
const URL = `${PROTOCOL}://${HOST}:${PORT}`;

const WS = new WebSocket(BROKER_URL);

WS.onopen = (e) => console.log(`WS connection opened.`);
WS.onclose = (e) => console.log(`WS connection closed.`);
WS.onmessage = (e) => handleNotification(e);
WS.onerror = (err) => console.error(`WS error: ${err}`);



const handleNotification = (event) => {
  const emptyNotification = docuemnt.getElementById('empty-message');
  const notifications = document.getElementById('notifications');

  if (notifications.contains(emptyNotification)) {
    notifications.removeChild(emptyNotification);
  }

  console.log(`Received notification: ${event.data}`);

  const p = document.createElement('p');
  p.appendChild(document.createTextNode(event.data));
  notifications.appendChild(p);
}

const sendOrder = () => {
  const products = document.getElementById('products-select');
  const product = products.value;

  WS.send(product);

  console.log(`Order sent: ${product}`);

  products.value = '';
}