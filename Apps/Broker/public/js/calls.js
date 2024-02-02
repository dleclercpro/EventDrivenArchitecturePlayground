export const sendOrder = async (order) => {
    const res = await fetch(`/order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(order),
    });

    console.log(`Order sent: [User ID: ${order.userId}]`);

    return res;
}