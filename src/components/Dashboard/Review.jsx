import React, { useState } from "react";
import { Container, Typography, TextField, Button } from "@mui/material";
import { firestore } from "../../firebase"; // Assuming Firestore is used for storing reviews
import { doc, setDoc } from "firebase/firestore";

const Review = () => {
  const [review, setReview] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const reviewData = {
      review,
      createdAt: new Date(),
    };
    await setDoc(doc(firestore, "reviews", "newReviewId"), reviewData); // Replace with actual logic for generating IDs
    alert("Review submitted successfully!");
    setReview("");
  };

  return (
    <Container>
      <Typography variant="h4">Leave a Review</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Your Review"
          multiline
          rows={4}
          fullWidth
          value={review}
          onChange={(e) => setReview(e.target.value)}
        />
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>
    </Container>
  );
};

export default Review;
