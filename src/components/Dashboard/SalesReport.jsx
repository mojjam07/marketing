import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography, Select, MenuItem } from "@mui/material";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { collection, query, where, getDocs } from "firebase/firestore";
import { firestore } from "../../firebase";
import { useAuth } from "../../components/context/AuthContext";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function SalesReport() {
  const { currentUser } = useAuth();
  const [reportType, setReportType] = useState("daily");
  const [salesData, setSalesData] = useState({
    labels: [],
    datasets: [
      {
        label: "Sales",
        data: [],
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  });

  useEffect(() => {
    const fetchSalesData = async () => {
      if (!currentUser) return;

      const salesRef = collection(firestore, "sales");
      const q = query(salesRef, where("userId", "==", currentUser.uid));

      const querySnapshot = await getDocs(q);
      const sales = querySnapshot.docs.map((doc) => doc.data());

      // Process sales data based on report type
      let processedData = processSalesData(sales, reportType);

      setSalesData({
        labels: processedData.labels,
        datasets: [
          {
            label: "Sales",
            data: processedData.data,
            borderColor: "rgb(75, 192, 192)",
            tension: 0.1,
          },
        ],
      });
    };

    fetchSalesData();
  }, [currentUser, reportType]);

  const processSalesData = (sales, type) => {
    // Simple implementation - would need more robust date handling in real app
    const data = {};
    sales.forEach((sale) => {
      const date = new Date(sale.date.seconds * 1000);
      let key;
      switch (type) {
        case "daily":
          key = date.toLocaleDateString();
          break;
        case "weekly":
          key = `Week ${Math.floor(date.getDate() / 7)}`;
          break;
        case "monthly":
          key = date.toLocaleString("default", { month: "short" });
          break;
        case "yearly":
          key = date.getFullYear();
          break;
      }
      data[key] = (data[key] || 0) + sale.amount;
    });

    return {
      labels: Object.keys(data),
      data: Object.values(data),
    };
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6">Sales Report</Typography>
        <Select
          value={reportType}
          onChange={(e) => setReportType(e.target.value)}
        >
          <MenuItem value="daily">Daily</MenuItem>
          <MenuItem value="weekly">Weekly</MenuItem>
          <MenuItem value="monthly">Monthly</MenuItem>
          <MenuItem value="yearly">Yearly</MenuItem>
        </Select>
        <Line
          data={salesData}
          options={{
            responsive: true,
            plugins: {
              legend: { position: "top" },
              title: {
                display: true,
                text: `${
                  reportType.charAt(0).toUpperCase() + reportType.slice(1)
                } Sales Report`,
              },
            },
          }}
        />
      </CardContent>
    </Card>
  );
}

export default SalesReport;
