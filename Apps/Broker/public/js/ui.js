import { USER_ID, BODY, PRODUCTS, ORDER_BUTTON, ORDER_BUTTON_TEXT } from './constants.js';
import { formatTime } from './utils.js';
import { sendOrder } from './calls.js';



let ORDER_SIZE = 0;



export const isProcessing = () => {
    return BODY.classList.contains('is-processing');
}



export const createCounter = (value) => {
    const counter = document.createElement('div');
    counter.classList.add('counter');

    const counterText = document.createElement('p');
    counterText.textContent = value;

    counter.appendChild(counterText);
  
    return counter;
}



export const updateOrderButtonText = () => {
    if (ORDER_SIZE === 0) {
        ORDER_BUTTON_TEXT.textContent = `Buy`;
    } else {
        ORDER_BUTTON_TEXT.textContent = `Buy (${ORDER_SIZE})`;
    }
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
    
    ORDER_SIZE += 1;
    updateOrderButtonText();

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
  
    ORDER_SIZE = Math.max(0, ORDER_SIZE - 1);
    updateOrderButtonText();

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

    ORDER_SIZE = 0;
    updateOrderButtonText();
}



export const blockStore = () => {
    BODY.classList.add('is-processing');
    ORDER_BUTTON.classList.add('is-inactive');
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



export const cleanNotifications = () => {
    const notifications = document.getElementById('notifications');
    while (notifications.firstChild) {
        notifications.firstChild.remove();
    }
}



export const computeOrder = () => {
    return Array.from(PRODUCTS).reduce((prev, current) => {
        const counter = current.querySelector('.counter');

        if (counter) {
            const count = Number(counter.textContent);
            return { ...prev, [current.dataset.name]: count };
        }

        return prev;
    }, {});
}



export const showOrder = (order) => {
    const text = ORDER_SIZE === 1 ? `You have ordered 1 product:` : `You have ordered ${ORDER_SIZE} products:`;

    addNotification(formatTime(new Date()), text);

    Object.entries(order).forEach(([product, count]) => {
        addNotification(formatTime(new Date()), `${count}x ${product}`);
    });
}



export const initializeStore = async () => {
    initializeProducts();
    lazyLoadImages();

    ORDER_BUTTON.addEventListener('click', async () => {
        if (ORDER_BUTTON.classList.contains('is-inactive')) {
            return;
        }
    
        blockStore();
        cleanNotifications();
    
        const order = computeOrder();
    
        resetProductCounters();
        showOrder(order);
    
        await sendOrder({ userId: USER_ID, products: order });
    });
}














export const lazyLoadImages = () => {
    const lazyImages = document.querySelectorAll('img.lazy-load');

    if ('IntersectionObserver' in window) {
        let lazyImageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    let lazyImage = entry.target;
                    lazyImage.src = lazyImage.dataset.src;
                    lazyImage.classList.remove('lazy-load');
                    lazyImageObserver.unobserve(lazyImage);
                }
            });
        });
    
        lazyImages.forEach(function(lazyImage) {
            lazyImageObserver.observe(lazyImage);
        });

        return;
    }
    
    // Fallback for browsers without IntersectionObserver support
    console.warn(`No support for the IntersectionObserver!`);
    lazyImages.forEach(function(lazyImage) {
        lazyImage.src = lazyImage.dataset.src;
    });
}