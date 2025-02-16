import React, { useEffect, useState } from "react";
import { Container, Typography, Button, List, ListItem, ListItemText } from "@mui/material";
import { firestore } from "../../firebase"; // Assuming Firestore is used for order management
import { collection, getDocs } from "firebase/firestore";

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const ordersCollection = collection(firestore, "orders");
      const orderSnapshot = await getDocs(ordersCollection);
      const orderList = orderSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setOrders(orderList);
    };
    fetchOrders();
  }, []);

  return (
    <Container>
      <Typography variant="h4">Order Management</Typography>
      <List>
        {orders.map((order) => (
          <ListItem key={order.id}>
            <ListItemText primary={`Order ID: ${order.id}`} secondary={`Total: $${order.total}`} />
            <Button variant="contained" color="primary">View Details</Button>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default OrderManagement;
