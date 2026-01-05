import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <Link to="/">Home</Link>
      <Link to="/admin">Admin</Link>
    </header>
  );
};

export default Header;
