import { books } from "./data.js";
import { addToCart } from "./cart.js";
import { renderCart } from "./ui.js";

export function renderBooks() {
  const bookList = document.getElementById("book-list");
  bookList.innerHTML = "<h2>Available Books</h2>";

  books.forEach(book => {
    const div = document.createElement("div");
    div.classList.add("book");
    div.innerHTML = `
      <h3>${book.title}</h3>
      <p><strong>Author:</strong> ${book.author}</p>
      <p><strong>Price:</strong> ₹${book.price}</p>
      <p>${book.available ? "✅ In Stock" : "❌ Out of Stock"}</p>
      <button ${book.available ? "" : "disabled"}>Add to Cart</button>
    `;
    div.querySelector("button").addEventListener("click", () => {
      addToCart(book);
      renderCart();
    });
    bookList.appendChild(div);
  });
}
