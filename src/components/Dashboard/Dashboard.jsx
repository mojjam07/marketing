import React, { useState, useEffect } from "react";
import { useProducts } from "../context/ProductsContext";


import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import { useAuth } from "../../../src/components/context/AuthContext";
import ProductList from "./ProductList";
import SalesReport from "./SalesReport";
import AddProductModal from "./AddProductModal";
import ReceiptGenerator from "./ReceiptGenerator";
import { collection, query, where, getDocs } from "firebase/firestore";
import { firestore } from "../../firebase";

function Dashboard() {
  const { currentUser } = useAuth();
  const [businessInfo, setBusinessInfo] = useState(null);
  const { products, refreshProducts } = useProducts();
  const [openAddProduct, setOpenAddProduct] = useState(false);


  useEffect(() => {
    const fetchBusinessInfo = async () => {
      if (currentUser) {
        const q = query(
          collection(firestore, "businesses"),
          where("email", "==", currentUser.email)
        );
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          setBusinessInfo(doc.data());
        });
      }
    };
    
    fetchBusinessInfo();
    refreshProducts();
  }, [currentUser, refreshProducts]);


  return (
    <Container maxWidth="lg">
      <Grid container spacing={3}>
        {/* Business Overview Card */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h5">Business Overview</Typography>
              <Typography>
                Name: {businessInfo?.businessName || "Loading..."}
              </Typography>
              <Typography>Total Products: {products.length}</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Sales Report Card */}
        <Grid item xs={12} md={8}>
          <SalesReport />
        </Grid>

        {/* Product Management Section */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6">Product Management</Typography>
              <Button
                variant="contained"
                onClick={() => setOpenAddProduct(true)}
              >
                Add New Product
              </Button>
              <ProductList products={products} />

            </CardContent>
          </Card>
        </Grid>

        {/* Receipt Generator */}
        <Grid item xs={12}>
          <ReceiptGenerator />
        </Grid>
      </Grid>

      {/* Add Product Modal */}
      <AddProductModal
        open={openAddProduct}
        handleClose={() => setOpenAddProduct(false)}
      />

    </Container>
  );
}

export default Dashboard;
