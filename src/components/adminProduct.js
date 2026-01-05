import React from "react";
import { useParams } from "react-router-dom";

const AdminProdcut = () => {
  const { id } = useParams();

  return (
    <div>
      <p>Product {id}</p>
      <input name="title" id="title" />

      <button>Delete</button>
      <button>Save</button>
    </div>
  );
};

export default AdminProdcut;
