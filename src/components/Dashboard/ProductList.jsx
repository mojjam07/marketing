import React, { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import { deleteDoc, doc } from "firebase/firestore";
import { firestore } from "../../firebase";
import { useAuth } from "../../components/context/AuthContext";
import Review from "./Review";
import { useCart } from "../../components/context/CartContext";

const dummyProducts = [
  {
    id: "1",
    name: "Sample Product 1",
    price: "19.99",
    description: "This is a sample product description.",
    imageUrl: "https://via.placeholder.com/150",
    category: "Electronics",
  },
  {
    id: "2",
    name: "Sample Product 2",
    price: "29.99",
    description: "Another sample product description.",
    imageUrl: "https://via.placeholder.com/150",
    category: "Clothing",
  },
];

function ProductList({ products, selectedCategory }) {
  const { currentUser } = useAuth();
  const { addToCart } = useCart();

  useEffect(() => {
    if (!currentUser) {
      // If no user, set dummy products
      // Note: This requires the parent component to handle setProducts
    }
  }, [currentUser]);

  const handleDeleteProduct = async (productId) => {
    try {
      await deleteDoc(doc(firestore, "products", productId));
      // Note: This requires the parent component to handle setProducts
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
    : products;

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Image</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Actions</TableCell>
            <TableCell>Reviews</TableCell>
            <TableCell>Purchase</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredProducts.map((product) => (
            <TableRow key={product.id}>
              <TableCell>
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  style={{ width: "50px", height: "50px", objectFit: "cover" }}
                />
              </TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell>${product.price}</TableCell>
              <TableCell>{product.description}</TableCell>
              <TableCell>
                <Button
                  color="error"
                  onClick={() => handleDeleteProduct(product.id)}
                >
                  Delete
                </Button>
              </TableCell>
              <TableCell>
                <Review productId={product.id} />
              </TableCell>
              <TableCell>
                <Button color="primary" onClick={() => addToCart(product)}>
                  Add to Cart
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ProductList;
