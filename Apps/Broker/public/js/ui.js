import { USER_ID, BODY, PRODUCTS, ORDER_BUTTON } from './constants.js';
import { formatTime } from './utils.js';
import { sendOrder } from './calls.js';



export const isProcessing = () => {
    return BODY.classList.contains('is-processing');
}



export const createCounter = (value) => {
    const counter = document.createElement('p');
    counter.textContent = value;
    counter.classList.add('counter');
  
    return counter;
}
  
  

export const getAllProducts = () => {
    return document.querySelectorAll(`.product`);
}
export const getAllProductCounters = () => {
    return document.querySelectorAll('.counter');
}



export const addProductToOrder = (el) => {
    ORDER_BUTTON.classList.remove('is-inactive');
    
    const counters = el.querySelectorAll('.counter');
    
    if (counters.length === 0) {
      el.appendChild(createCounter(1));
      return;
    }
  
    const counter = counters[0];
    counter.textContent = Number(counter.textContent) + 1;
}



export const removeProductFromOrder = (el) => {
    const counters = el.querySelectorAll('.counter');
    
    if (counters.length === 0) {
      return;
    }
  
    const counter = counters[0];
    const count = Number(counter.textContent);
  
    if (count === 1) {
      counter.remove();
      return;
    }
  
    counter.textContent = Math.max(0, count - 1);
}



export const initializeProducts = () => {
    getAllProducts().forEach(productElement => {
        productElement.addEventListener('click', () => {
            if (isProcessing()) return;
            addProductToOrder(productElement);
        });
    
        productElement.addEventListener('contextmenu', (e) => {
            e.preventDefault();

            if (isProcessing()) return;
            removeProductFromOrder(productElement);
    
            // Make order button inactive, in case no product has been selected
            if (getAllProductCounters().length === 0) {
                ORDER_BUTTON.classList.add('is-inactive');
            }
        });
    });
}



export const resetProductCounters = () => {
    const counters = getAllProductCounters();
    counters.forEach(counter => counter.remove());
  
    ORDER_BUTTON.classList.add('is-inactive');
}



export const resetStore = () => {
    BODY.classList.remove('is-processing');
    ORDER_BUTTON.classList.remove('is-inactive');
}



export const blockStore = () => {
    BODY.classList.add('is-processing');
    ORDER_BUTTON.classList.add('is-inactive');

    resetProductCounters();
}



export const addNotification = (time, message) => {
    const notifications = document.getElementById('notifications');
    const notificationEl = document.createElement('p');
    notificationEl.classList.add('notification');

    const timeEl = document.createElement('strong');
    timeEl.classList.add('time');

    timeEl.appendChild(document.createTextNode(`${time}:`));

    notificationEl.appendChild(timeEl);
    notificationEl.appendChild(document.createTextNode(' '));
    notificationEl.appendChild(document.createTextNode(message));

    notificationEl.classList.add('fade-in'); // Add class for styling and animation

    notifications.appendChild(notificationEl);
}



export const handleClickOnOrderButton = async () => {
    if (ORDER_BUTTON.classList.contains('is-inactive')) {
        return;
    }

    // Block UI while order is being processed
    blockStore();

    // Remove previous notifications
    const notifications = document.getElementById('notifications');
    while (notifications.firstChild) {
        notifications.firstChild.remove();
    }

    // Build order using product counters
    const selectedProducts = Array.from(PRODUCTS).reduce((prev, current) => {
        const counter = current.querySelector('.counter');

        if (counter) {
            const count = Number(counter.textContent);
            return { ...prev, [current.dataset.name]: count };
        }

        return prev;
    }, {});

    // Show order to user
    addNotification(formatTime(new Date()), `You have ordered:`);
    Object.entries(selectedProducts).forEach(([product, count]) => {
        addNotification(formatTime(new Date()), `${count}X ${product}`);
    });

    // Send order to server
    await sendOrder({ userId: USER_ID, products: selectedProducts });
}



export const initializeStore = async () => {
    initializeProducts();

    ORDER_BUTTON.addEventListener('click', handleClickOnOrderButton);
}