import { BODY, ORDER_BUTTON } from './constants.js';
import { isProcessing } from './utils.js';

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