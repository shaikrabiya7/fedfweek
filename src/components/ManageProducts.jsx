import { useEffect, useState } from "react";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
  });

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
    setProducts(storedProducts);
  }, []);

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  const handleChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const getLocalImage = (productName) => {
    const name = productName.toLowerCase();
    if (name.includes("laptop")) return "/images/laptop.jpg";
    if (name.includes("iphone")) return "/images/iphone.jpg";
    if (name.includes("watch")) return "/images/watch.jpg";
    return "/images/default.jpg";
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price) {
      alert("Please fill all fields!");
      return;
    }

    const newItem = {
      id: Date.now(),
      name: newProduct.name,
      price: parseFloat(newProduct.price),
      image: newProduct.image || getLocalImage(newProduct.name),
    };

    setProducts([...products, newItem]);
    setNewProduct({ name: "", price: "", image: "" });
  };

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this product?")) {
      setProducts(products.filter((p) => p.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h2 className="text-3xl font-bold mb-6">Manage Products</h2>

      <form
        onSubmit={handleAddProduct}
        className="bg-white p-6 rounded-lg shadow-md w-96 mb-8"
      >
        <h3 className="text-xl font-semibold mb-4">Add New Product</h3>

        <input
          type="text"
          name="name"
          value={newProduct.name}
          onChange={handleChange}
          placeholder="Product Name"
          className="w-full border p-2 mb-3 rounded"
        />

        <input
          type="number"
          name="price"
          value={newProduct.price}
          onChange={handleChange}
          placeholder="Price"
          className="w-full border p-2 mb-3 rounded"
        />

        <input
          type="text"
          name="image"
          value={newProduct.image}
          onChange={handleChange}
          placeholder="Image URL (optional)"
          className="w-full border p-2 mb-3 rounded"
        />

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded w-full hover:bg-blue-600"
        >
          Add Product
        </button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
        {products.length === 0 ? (
          <p className="text-gray-600 col-span-3 text-center">
            No products added yet.
          </p>
        ) : (
          products.map((p) => (
            <div
              key={p.id}
              className="bg-white shadow-md rounded-lg p-4 text-center hover:shadow-lg transition"
            >
              <img
                src={p.image || getLocalImage(p.name)}
                alt={p.name}
                className="w-full h-40 object-cover rounded mb-3 border"
                onError={(e) => (e.target.src = "/images/default.jpg")}
              />
              <h3 className="font-bold text-lg">{p.name}</h3>
              <p className="text-gray-600 mb-2">₹{p.price}</p>
              <button
                onClick={() => handleDelete(p.id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ManageProducts;