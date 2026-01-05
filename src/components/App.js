import React, { useState } from "react";
import { Routes, Route, Link, useParams, useNavigate } from "react-router-dom";
import './../styles/App.css';

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

const ProductDetails = ({ products }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find(p => p.id === Number(id));

  if (!product) return null;

  return (
    <div className="post">
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <h3>₹{product.price}</h3>
      <button className="btn" onClick={() => navigate("/")}>Back</button>
    </div>
  );
};

const AdminPanel = ({ products, setProducts }) => {
  const [form, setForm] = useState({ name: "", description: "", image: "", price: "" });

  const addProduct = () => {
    setProducts([...products, { ...form, id: Date.now(), price: Number(form.price) }]);
    setForm({ name: "", description: "", image: "", price: "" });
  };

  return (
    <div>
      <input className="form-control" placeholder="Name" value={form.name}
        onChange={e => setForm({ ...form, name: e.target.value })} />
      <input className="form-control" placeholder="Description" value={form.description}
        onChange={e => setForm({ ...form, description: e.target.value })} />
      <input className="form-control" placeholder="Image URL" value={form.image}
        onChange={e => setForm({ ...form, image: e.target.value })} />
      <input className="form-control" placeholder="Price" value={form.price}
        onChange={e => setForm({ ...form, price: e.target.value })} />

      <button onClick={addProduct}>Add</button>

      {products.map(p => (
        <div key={p.id} className="post">
          <Link to={`/products/${p.id}`}>{p.name}</Link>
          <button className="float-right" onClick={() =>
            setProducts(products.map(x => x.id === p.id ? { ...x, price: x.price + 1000 } : x))
          }>Edit</button>
          <button className="float-right" onClick={() =>
            setProducts(products.filter(x => x.id !== p.id))
          }>Delete</button>
        </div>
      ))}
    </div>
  );
};

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
