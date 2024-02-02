import { BODY } from './constants.js';

export const formatTime = (date) => {

    // Extract hours, minutes, and seconds
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');

    // Concatenate into the desired format
    return `${hours}:${minutes}:${seconds}`;
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



export const isProcessing = () => {
    return BODY.classList.contains('is-processing');
}