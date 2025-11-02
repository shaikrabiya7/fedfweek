import { renderBooks } from "./books.js";
import { cart, removeFromCart, getCartTotal } from "./cart.js";

export function renderCart() {
  const cartDiv = document.getElementById("cart");
  cartDiv.innerHTML = "<h2>🛒 Shopping Cart</h2>";

  if (cart.length === 0) {
    cartDiv.innerHTML += "<p>Your cart is empty.</p>";
    return;
  }

  cart.forEach(item => {
    const div = document.createElement("div");
    div.classList.add("cart");
    div.innerHTML = `
      <h4>${item.title}</h4>
      <p>Price: ₹${item.price}</p>
      <p>Quantity: ${item.quantity}</p>
      <button>Remove</button>
    `;
    div.querySelector("button").addEventListener("click", () => {
      removeFromCart(item.id);
      renderCart();
    });
    cartDiv.appendChild(div);
  });

  const total = getCartTotal();
  cartDiv.innerHTML += `<h3>Total: ₹${total}</h3>`;
}

renderBooks();
renderCart();
