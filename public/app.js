const productGrid = document.querySelector('#product-grid');
const cartItems = document.querySelector('#cart-items');
const cartCount = document.querySelector('#cart-count');
const cartTotal = document.querySelector('#cart-total');
const orderMessage = document.querySelector('#order-message');
let cart = [];

function renderProducts() {
  productGrid.innerHTML = Store.products.map((product) => `
    <article class="product-card">
      <div class="product-icon" aria-hidden="true">${product.icon}</div>
      <h3>${product.name}</h3>
      <p>${product.description}</p>
      <div class="product-footer">
        <strong>$${product.price.toFixed(2)}</strong>
        <button class="add-button" type="button" data-product-id="${product.id}">Add to cart</button>
      </div>
    </article>
  `).join('');
}

function renderCart() {
  const quantity = cart.reduce((count, item) => count + item.quantity, 0);
  cartCount.textContent = quantity;
  cartTotal.textContent = `$${Store.getCartTotal(cart).toFixed(2)}`;

  if (cart.length === 0) {
    cartItems.innerHTML = '<p class="empty-cart">Your cart is empty.</p>';
    return;
  }

  cartItems.innerHTML = cart.map((item) => {
    const product = Store.products.find((entry) => entry.id === item.id);
    return `<p class="cart-item">${product.name} <span>× ${item.quantity}</span></p>`;
  }).join('');
}

productGrid.addEventListener('click', (event) => {
  const button = event.target.closest('[data-product-id]');
  if (!button) return;

  cart = Store.addToCart(cart, button.dataset.productId);
  orderMessage.textContent = '';
  renderCart();
});

document.querySelector('#checkout-button').addEventListener('click', () => {
  if (cart.length === 0) {
    orderMessage.textContent = 'Add an item to your cart before checking out.';
    return;
  }

  cart = [];
  renderCart();
  orderMessage.textContent = 'Thanks for your order!';
});

renderProducts();
renderCart();
