import React, { useEffect, useState } from "react";
import ProductList from "./ProductList";
import { useProducts } from "../context/ProductsContext";

import ShoppingCart from "./ShoppingCart"; // Importing ShoppingCart
import Wishlist from "./Wishlist";
import { TextField, Button, Typography } from "@mui/material"; // Importing Button for Register and Sign In

const PublicDashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { products } = useProducts();

  // Products are now managed by ProductsContext

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredProducts = products
    .filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => a.name.localeCompare(b.name)); // Sort products by name

  return (
    <div style={{ margin: "20px" }}>
      <Typography variant="h4" className="mb-5" gutterBottom>
        Public Dashboard
      </Typography>
      <Button variant="contained" color="primary" href="/login">
        Sign In
      </Button>{" "}
      {/* Adding Sign In button */}
      <Button variant="contained" color="secondary" href="/register">
        Register
      </Button>{" "}
      {/* Adding Register button */}
      <TextField
        label="Search Products"
        variant="outlined"
        value={searchTerm}
        style={{ marginTop: "5px", marginBottom: "20px" }}
        onChange={handleSearchChange}
        fullWidth
      />
      <ProductList products={filteredProducts} />
      <ShoppingCart />
      <Wishlist />
      <footer>
        <Typography variant="body2" color="textSecondary" align="center">
          © {new Date().getFullYear()} Your Company Name. All rights reserved.
        </Typography>{" "}
        {/* Adding footer */}
      </footer>
    </div>
  );
};

export default PublicDashboard;
