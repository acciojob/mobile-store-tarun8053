
import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Link, useParams, useNavigate } from "react-router-dom";
import './../styles/App.css';

/* ---------- Initial Products (8) ---------- */
const initialProducts = [
  { id: 1, name: "iPhone 14", price: 70000, description: "Apple phone", image: "https://via.placeholder.com/150" },
  { id: 2, name: "Samsung S23", price: 65000, description: "Samsung flagship", image: "https://via.placeholder.com/150" },
  { id: 3, name: "OnePlus 11", price: 60000, description: "Fast phone", image: "https://via.placeholder.com/150" },
  { id: 4, name: "Pixel 7", price: 58000, description: "Google phone", image: "https://via.placeholder.com/150" },
  { id: 5, name: "Xiaomi 13", price: 50000, description: "Value phone", image: "https://via.placeholder.com/150" },
  { id: 6, name: "Vivo X90", price: 52000, description: "Camera phone", image: "https://via.placeholder.com/150" },
  { id: 7, name: "Oppo Find X", price: 54000, description: "Premium phone", image: "https://via.placeholder.com/150" },
  { id: 8, name: "Realme GT", price: 45000, description: "Budget phone", image: "https://via.placeholder.com/150" }
];

/* ---------- Product List ---------- */
const ProductList = ({ products }) => (
  <div className="products-list">
    {products.map(p => (
      <div key={p.id}>
        <Link to={`/products/${p.id}`}>
          <h3>{p.name}</h3>
        </Link>
        <p>₹{p.price}</p>
      </div>
    ))}
  </div>
);

/* ---------- Product Details ---------- */
const ProductDetails = ({ products }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const product = products.find(p => p.id === Number(id));
  if (!product) return <h2>Product not found</h2>;

  return (
    <div className="post">
      <img src={product.image} alt={product.name} />
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <h3>₹{product.price}</h3>

      <button className="btn" onClick={() => navigate("/")}>
        Back
      </button>
    </div>
  );
};

/* ---------- Admin Panel ---------- */
const AdminPanel = ({ products, setProducts }) => {
  const [form, setForm] = useState({
    name: "",
    description: "",
    image: "",
    price: ""
  });

  const addProduct = () => {
    const newProduct = {
      id: Date.now(),
      ...form,
      price: Number(form.price)
    };
    setProducts([...products, newProduct]);
    setForm({ name: "", description: "", image: "", price: "" });
  };

  const editProduct = id => {
    const newPrice = prompt("Enter new price");
    if (newPrice) {
      setProducts(
        products.map(p =>
          p.id === id ? { ...p, price: Number(newPrice) } : p
        )
      );
    }
  };

  const deleteProduct = id => {
    setProducts(products.filter(p => p.id !== id));
  };

  return (
    <div>
      <h2>Admin Panel</h2>

      <input className="form-control" placeholder="Name"
        value={form.name}
        onChange={e => setForm({ ...form, name: e.target.value })}
      />
      <input className="form-control" placeholder="Description"
        value={form.description}
        onChange={e => setForm({ ...form, description: e.target.value })}
      />
      <input className="form-control" placeholder="Image URL"
        value={form.image}
        onChange={e => setForm({ ...form, image: e.target.value })}
      />
      <input className="form-control" placeholder="Price"
        value={form.price}
        onChange={e => setForm({ ...form, price: e.target.value })}
      />

      <button onClick={addProduct}>Add</button>

      {products.map(p => (
        <div key={p.id} className="post">
          <Link to={`/products/${p.id}`}>{p.name}</Link>

          <button className="float-right" onClick={() => editProduct(p.id)}>
            Edit
          </button>

          <button className="float-right" onClick={() => deleteProduct(p.id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

/* ---------- MAIN APP ---------- */
const App = () => {
  const [products, setProducts] = useState(initialProducts);

  return (
    <div>
      {/* Do not remove the main div */}
      <BrowserRouter>
        <nav>
          <Link to="/">Home</Link>{" "}
          <Link to="/admin">Admin Panel</Link>
        </nav>

        <Routes>
          <Route path="/" element={<ProductList products={products} />} />
          <Route path="/products/:id" element={<ProductDetails products={products} />} />
          <Route path="/admin" element={<AdminPanel products={products} setProducts={setProducts} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;

