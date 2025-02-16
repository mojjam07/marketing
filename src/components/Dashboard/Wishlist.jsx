import React, { useEffect, useState } from "react";
import { Container, Typography, List, ListItem, ListItemText, Button } from "@mui/material";
import { firestore } from "../../firebase"; // Assuming Firestore is used for wishlist
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([]);

  useEffect(() => {
    const fetchWishlist = async () => {
      const wishlistCollection = collection(firestore, "wishlist");
      const wishlistSnapshot = await getDocs(wishlistCollection);
      const wishlistList = wishlistSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setWishlistItems(wishlistList);
    };
    fetchWishlist();
  }, []);

  const handleRemove = async (id) => {
    await deleteDoc(doc(firestore, "wishlist", id));
    setWishlistItems(wishlistItems.filter(item => item.id !== id));
  };

  return (
    <Container>
      <Typography variant="h4">Wishlist</Typography>
      <List>
        {wishlistItems.map((item) => (
          <ListItem key={item.id}>
            <ListItemText primary={item.name} />
            <Button variant="contained" color="secondary" onClick={() => handleRemove(item.id)}>Remove</Button>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default Wishlist;
