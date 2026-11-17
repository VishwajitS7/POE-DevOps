(function (root) {
  const products = [
    { id: 'mug', name: 'Everyday Mug', price: 12, icon: '☕', description: 'A cozy start to your morning.' },
    { id: 'tote', name: 'Canvas Tote', price: 18, icon: '👜', description: 'Room for all your everyday things.' },
    { id: 'notebook', name: 'Pocket Notebook', price: 9, icon: '📓', description: 'A little space for big ideas.' }
  ];

  function addToCart(cart, productId) {
    if (!products.some((product) => product.id === productId)) {
      throw new RangeError(`Unknown product: ${productId}`);
    }

    const existingItem = cart.find((item) => item.id === productId);
    if (existingItem) {
      return cart.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      );
    }

    return [...cart, { id: productId, quantity: 1 }];
  }

  function getCartTotal(cart) {
    return cart.reduce((total, item) => {
      const product = products.find((entry) => entry.id === item.id);
      return total + product.price * item.quantity;
    }, 0);
  }

  const store = { products, addToCart, getCartTotal };
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = store;
  }
  root.Store = store;
})(globalThis);
