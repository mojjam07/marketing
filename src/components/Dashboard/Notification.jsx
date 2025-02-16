import React from "react";
import { Container, Typography, Snackbar, Button } from "@mui/material";
import { useState } from "react";

const Notification = () => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <Container>
      <Typography variant="h4">Notifications</Typography>
      <Button variant="contained" color="primary" onClick={handleClick}>
        Show Notification
      </Button>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message="This is a notification message!"
      />
    </Container>
  );
};

export default Notification;
