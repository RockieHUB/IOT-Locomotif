import { useState, useEffect } from "react";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import Pie from "./components/PieChart";
import CssBaseline from "@mui/material/CssBaseline";
import Navbar from "./components/Navbar";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import axios from "axios";
import dayjs from "dayjs";
import "./App.css";

Chart.register(CategoryScale);

function App() {
  const [chartData, setChartData] = useState(null);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState(dayjs()); // State for selected date

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8081/summaries/getAll"
        ); // Note the full URL here
        const data = response.data;

        // Filter data by selectedDate (if a date is selected)
        const filteredData = selectedDate
          ? data.filter(
              (entry) => entry.tanggal === selectedDate.format("YYYY-MM-DD")
            )
          : data;

        // Group by date and calculate sums
        const groupedData = filteredData.reduce((acc, entry) => {
          const date = entry.tanggal;
          const status = entry.status.toLowerCase();

          if (!acc[date]) {
            acc[date] = { active: 0, inactive: 0 }; // Initialize if date not seen before
          }

          acc[date][status] = Math.max(acc[date][status], entry.jumlah); // Update max if larger value is found
          return acc;
        }, {});

        // Transform for pie chart
        const transformedData = Object.entries(groupedData).map(
          ([date, totals]) => ({
            label: date,
            active: totals.active,
            inactive: totals.inactive,
          })
        );

        setChartData({
          labels: ["Active", "Inactive"],
          datasets: [
            {
              data: [
                transformedData.reduce((sum, data) => sum + data.active, 0),
                transformedData.reduce((sum, data) => sum + data.inactive, 0),
              ],
              backgroundColor: ["#FF6384", "#36A2EB"],
            },
          ],
        });
      } catch (error) {
        setError(error.message);
      }
    };
    fetchData();
  }, [selectedDate]); // Fetch data whenever selectedDate changes

  const handleDateChange = (date) => {
    setSelectedDate(date); // Update selectedDate when the date picker changes
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!chartData) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <CssBaseline />
      <Navbar />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Filter by Date"
          value={selectedDate}
          onChange={handleDateChange}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
      <Pie chartData={chartData} />
    </>
  );
}

export default App;
