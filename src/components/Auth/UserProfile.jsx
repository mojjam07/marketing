import React, { useState, useEffect } from "react";
import { TextField, Button, Container, Typography } from "@mui/material";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { firestore } from "../../firebase";

const UserProfile = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    businessInfo: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      const userDoc = await getDoc(doc(firestore, "users", "currentUserId")); // Replace with actual user ID
      if (userDoc.exists()) {
        setUserData(userDoc.data());
      }
    };
    fetchUserData();
  }, []);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await setDoc(doc(firestore, "users", "currentUserId"), userData); // Replace with actual user ID
    alert("Profile updated successfully!");
  };

  return (
    <Container>
      <Typography variant="h4">User Profile</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          name="name"
          value={userData.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Email"
          name="email"
          value={userData.email}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Business Info"
          name="businessInfo"
          value={userData.businessInfo}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary">
          Save
        </Button>
      </form>
    </Container>
  );
};

export default UserProfile;
