import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
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
import { Button } from "@mui/material";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
      text: "Chart.js Line Chart",
    },
  },
};

const WeightChart = () => {
  const [weightChart, setWeightChart] = useState(() => {
    return JSON.parse(localStorage.getItem("WeightData")) || [];
  });
  const [dateInput, setDate] = useState("");
  const [weightInput, setWeight] = useState(0);
  const dummyWeight = [
    { date: "22/02/23", weight: 25 },
    { date: "23/02/23", weight: 40 },
    { date: "24/02/23", weight: 28 },
    { date: "25/02/23", weight: 25 },
    { date: "26/02/23", weight: 40 },
    { date: "27/02/23", weight: 28 },
    { date: "28/02/23", weight: 25 },
    { date: "29/02/23", weight: 40 },
    { date: "23/02/23", weight: 28 },
  ];

  useEffect(() => {
    localStorage.setItem("WeightData", JSON.stringify(weightChart));
    //console.log(JSON.parse(localStorage.getItem("WeightData")));
  }, [weightChart]);

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(dateInput);
    setWeightChart((weightChart) => [
      ...weightChart,
      { date: dateInput.toString(), weight: weightInput },
    ]);
  };

  const data = {
    labels: weightChart.map((weightChart) => {
      return weightChart.date;
    }),
    datasets: [
      {
        data: weightChart.map((weightChart) => weightChart.weight),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };
  return (
    <div>
      <form onSubmit={submitHandler}>
        <input
          required
          type="date"
          id="start"
          name="trip-start"
          value={dateInput}
          min={Date.now()}
          onChange={(e) => setDate(e.target.value)}
        ></input>
        <br />
        <input
          required
          type="number"
          id="start"
          name="trip-start"
          value={weightInput}
          onChange={(e) => setWeight(e.target.value)}
        ></input>

        <div style={{ padding: "20px" }}>
          {" "}
          <Button
            type="submit"
            value="Submit"
            variant="contained"
            color="success"
          >
            Submit
          </Button>
        </div>
      </form>

      <Line options={options} data={data} />
    </div>
  );
};

export default WeightChart;
