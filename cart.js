export let cart = [];

export function addToCart(book) {
  const existing = cart.find(item => item.id === book.id);
  if (!existing) {
    cart.push({ ...book, quantity: 1 });
  } else {
    existing.quantity++;
  }
}

export function removeFromCart(bookId) {
  cart = cart.filter(item => item.id !== bookId);
}

export function getCartTotal() {
  return cart.reduce((total, item) => total + item.price * item.quantity, 0);
}
