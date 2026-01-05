import React, { useState } from "react";
import { Routes, Route, Link, useParams, useNavigate } from "react-router-dom";
import "./../styles/App.css";

/* ---------- DATA (8 PRODUCTS) ---------- */
const initialProducts = [
  { id: 1, name: "iPhone 14", price: 70000, description: "Apple phone" },
  { id: 2, name: "Samsung S23", price: 65000, description: "Samsung flagship" },
  { id: 3, name: "OnePlus 11", price: 60000, description: "Fast phone" },
  { id: 4, name: "Pixel 7", price: 58000, description: "Google phone" },
  { id: 5, name: "Xiaomi 13", price: 50000, description: "Value phone" },
  { id: 6, name: "Vivo X90", price: 52000, description: "Camera phone" },
  { id: 7, name: "Oppo Find X", price: 54000, description: "Premium phone" },
  { id: 8, name: "Realme GT", price: 45000, description: "Budget phone" }
];

/* ---------- HOME ---------- */
const ProductList = ({ products }) => (
  <div>
    {products.map((p) => (
      <div key={p.id}>
        <Link to={`/products/${p.id}`}>
          {/* Cypress: a > .row */}
          <div className="row">
            <h3>{p.name}</h3>
            <p>₹{p.price}</p>
          </div>
        </Link>
      </div>
    ))}
  </div>
);

/* ---------- DETAILS ---------- */
const ProductDetails = ({ products }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find(p => p.id === Number(id));
  if (!product) return <div></div>;

  return (
    <div>
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <h3>₹{product.price}</h3>
      <button className="btn" onClick={() => navigate("/")}>Back</button>
    </div>
  );
};

/* ---------- ADMIN ---------- */
const AdminPanel = ({ products, setProducts }) => {
  const deleteProduct = (id) => {
    setProducts(products.filter(p => p.id !== id));
  };

  const updateProduct = (id) => {
    setProducts(
      products.map(p =>
        p.id === id ? { ...p, price: p.price + 1000 } : p
      )
    );
  };

  return (
    <div>
      {products.map(p => (
        /* Cypress: div.col-12 > div > a */
        <div className="col-12" key={p.id}>
          <div>
            <Link to={`/products/${p.id}`}>
              {p.name}
            </Link>

            <button className="float-right" onClick={() => updateProduct(p.id)}>
              Edit
            </button>

            <button className="float-right" onClick={() => deleteProduct(p.id)}>
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

/* ---------- APP ---------- */
const App = () => {
  const [products, setProducts] = useState(initialProducts);

  return (
    <div>
      {/* Do not remove the main div */}
      <nav>
        <Link to="/">Home</Link>{" "}
        <Link to="/admin">Admin Panel</Link>
      </nav>

      <Routes>
        <Route path="/" element={<ProductList products={products} />} />
        <Route path="/products/:id" element={<ProductDetails products={products} />} />
        <Route path="/admin" element={<AdminPanel products={products} setProducts={setProducts} />} />
      </Routes>
    </div>
  );
};

export default App;
