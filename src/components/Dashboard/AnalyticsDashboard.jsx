import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../../firebase";
import { Typography, Box, Card, CardContent } from "@mui/material";

const AnalyticsDashboard = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const dataCollection = collection(firestore, "analytics");
      const dataSnapshot = await getDocs(dataCollection);
      const dataList = dataSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setData(dataList);
    };
    fetchData();
  }, []);

  return (
    <Box>
      <Typography variant="h4">Analytics Dashboard</Typography>
      {data.map((item) => (
        <Card key={item.id}>
          <CardContent>
            <Typography variant="h6">{item.title}</Typography>
            <Typography variant="body2">Value: {item.value}</Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default AnalyticsDashboard;
