const test = require('node:test');
const assert = require('node:assert/strict');
const { addToCart, getCartTotal } = require('../public/store.js');

test('adding a product creates a cart item without changing the original cart', () => {
  const cart = [];
  const updatedCart = addToCart(cart, 'mug');

  assert.deepEqual(updatedCart, [{ id: 'mug', quantity: 1 }]);
  assert.deepEqual(cart, []);
});

test('adding the same product increases its quantity', () => {
  const cart = addToCart([{ id: 'mug', quantity: 1 }], 'mug');

  assert.deepEqual(cart, [{ id: 'mug', quantity: 2 }]);
});

test('cart total includes each product price and quantity', () => {
  const total = getCartTotal([
    { id: 'mug', quantity: 2 },
    { id: 'notebook', quantity: 1 }
  ]);

  assert.equal(total, 33);
});

test('adding an unknown product reports an error', () => {
  assert.throws(() => addToCart([], 'not-a-product'), RangeError);
});
