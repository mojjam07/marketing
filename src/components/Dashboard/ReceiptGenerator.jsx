import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { addDoc, collection } from "firebase/firestore";
import { firestore } from "../../firebase";
import { useAuth } from "../../components/context/AuthContext";

function ReceiptGenerator() {
  const { currentUser } = useAuth();
  const [customerName, setCustomerName] = useState("");
  const [items, setItems] = useState([{ name: "", quantity: 1, price: 0 }]);
  const [receiptGenerated, setReceiptGenerated] = useState(null);

  const addItemRow = () => {
    setItems([...items, { name: "", quantity: 1, price: 0 }]);
  };

  const updateItem = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  };

  const calculateTotal = () => {
    return items.reduce((total, item) => total + item.quantity * item.price, 0);
  };

  const generateReceipt = async () => {
    try {
      const receiptData = {
        customerName,
        items,
        total: calculateTotal(),
        userId: currentUser.uid,
        date: new Date(),
      };

      const docRef = await addDoc(collection(firestore, "sales"), receiptData);

      setReceiptGenerated({
        ...receiptData,
        id: docRef.id,
      });

      // Reset form
      setCustomerName("");
      setItems([{ name: "", quantity: 1, price: 0 }]);
    } catch (error) {
      console.error("Error generating receipt:", error);
    }
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6">Generate Receipt</Typography>
        <TextField
          fullWidth
          label="Customer Name"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          margin="normal"
        />

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Product Name</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Subtotal</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <TextField
                      value={item.name}
                      onChange={(e) =>
                        updateItem(index, "name", e.target.value)
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      type="number"
                      value={item.quantity}
                      onChange={(e) =>
                        updateItem(index, "quantity", Number(e.target.value))
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      type="number"
                      value={item.price}
                      onChange={(e) =>
                        updateItem(index, "price", Number(e.target.value))
                      }
                    />
                  </TableCell>
                  <TableCell>${item.quantity * item.price}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Button onClick={addItemRow} variant="outlined" sx={{ mt: 2 }}>
          Add Item
        </Button>

        <Typography variant="h6" sx={{ mt: 2 }}>
          Total: ${calculateTotal()}
        </Typography>

        <Button
          onClick={generateReceipt}
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
        >
          Generate Receipt
        </Button>

        {receiptGenerated && (
          <Card sx={{ mt: 2 }}>
            <CardContent>
              <Typography variant="h6">Receipt Generated</Typography>
              <Typography>Receipt ID: {receiptGenerated.id}</Typography>
              <Typography>Customer: {receiptGenerated.customerName}</Typography>
              <Typography>Total: ${receiptGenerated.total}</Typography>
            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  );
}

export default ReceiptGenerator;
