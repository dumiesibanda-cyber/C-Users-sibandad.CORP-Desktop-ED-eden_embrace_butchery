let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(name, price) {
    const item = cart.find(i => i.name === name);
    if (item) {
        item.qty += 1;
    } else {
        cart.push({name, price, qty: 1});
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    alert(name + ' added to cart');
}

function updateCartCount() {
    const countEl = document.getElementById('cart-count');
    if (countEl) countEl.innerText = cart.reduce((sum, i) => sum + i.qty, 0);
}

function displayCart() {
    const container = document.getElementById('cart-items');
    if (!container) return;
    container.innerHTML = '';
    cart.forEach((item, index) => {
        container.innerHTML += `<div>${item.name} - $${item.price} x ${item.qty} <button onclick="removeItem(${index})">Remove</button></div>`;
    });
    const totalEl = document.getElementById('cart-total');
    if (totalEl) totalEl.innerText = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
}

function removeItem(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
    updateCartCount();
}

function displayOrderSummary() {
    const summaryEl = document.getElementById('order-summary');
    if (!summaryEl) return;
    summaryEl.innerHTML = '';
    cart.forEach(item => {
        summaryEl.innerHTML += `<p>${item.name} - $${item.price} x ${item.qty}</p>`;
    });
    summaryEl.innerHTML += `<h3>Total: $${cart.reduce((sum, i) => sum + i.price * i.qty, 0)}</h3>`;
}

document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    displayCart();
    displayOrderSummary();
});
