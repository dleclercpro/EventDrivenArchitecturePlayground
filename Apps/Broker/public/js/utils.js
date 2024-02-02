export const formatTime = (date) => {

    // Extract hours, minutes, and seconds
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');

    // Concatenate into the desired format
    return `${hours}:${minutes}:${seconds}`;
}