import React from "react";
import { Link, useParams } from "react-router-dom";

const Product = () => {
  const { id } = useParams();

  return (
    <div>
      <h1>Product {id} </h1>
      <Link to="/">
        <button className="btn">Other Products</button>
      </Link>
    </div>
  );
};

export default Product;
