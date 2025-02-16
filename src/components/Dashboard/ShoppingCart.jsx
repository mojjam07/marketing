import React from "react";
import { Button, List, ListItem, ListItemText } from "@mui/material";
import { useCart } from "../context/CartContext"; // Assuming a CartContext is created

const ShoppingCart = () => {
  const { cartItems, removeFromCart } = useCart(); // Using context to get cart items

  return (
    <div>
      <h2>Shopping Cart</h2>
      <List>
        {cartItems.map((item) => (
          <ListItem key={item.id}>
            <ListItemText
              primary={item.name}
              secondary={`Price: $${item.price}`}
            />
            <Button
              variant="contained"
              color="secondary"
              onClick={() => removeFromCart(item.id)}
            >
              Remove
            </Button>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default ShoppingCart;
