import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  DialogActions,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { storage, firestore } from "../../firebase";
import { useAuth } from "../../components/context/AuthContext";
import productCategories from "./ProductCategories";

function AddProductModal({ open, handleClose, setProducts }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState("");
  const { currentUser } = useAuth();

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    try {
      let imageUrl = "";
      if (image) {
        const imageRef = ref(
          storage,
          `products/${currentUser.uid}/${image.name}`
        );
        await uploadBytes(imageRef, image);
        imageUrl = await getDownloadURL(imageRef);
      }

      const newProduct = {
        name,
        price: parseFloat(price),
        description,
        imageUrl,
        userId: currentUser.uid,
        category,
      };

      const docRef = await addDoc(
        collection(firestore, "products"),
        newProduct
      );
      setProducts((prev) => [...prev, { id: docRef.id, ...newProduct }]);

      // Reset form
      setName("");
      setPrice("");
      setDescription("");
      setImage(null);
      setCategory("");

      handleClose();
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="add-product-title"
      aria-describedby="add-product-description"
    >
      <DialogTitle id="add-product-title">Add New Product</DialogTitle>
      <DialogContent id="add-product-description">
        <TextField
          margin="dense"
          label="Product Name"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Price"
          type="number"
          fullWidth
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Description"
          multiline
          rows={4}
          fullWidth
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <FormControl fullWidth margin="dense">
          <InputLabel>Select Category</InputLabel>
          <Select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <MenuItem value="">Select Category</MenuItem>
            {productCategories.map((cat) => (
              <MenuItem key={cat} value={cat}>
                <span>{cat}</span>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <input type="file" accept="image/*" onChange={handleImageChange} />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained">
          Add Product
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddProductModal;
