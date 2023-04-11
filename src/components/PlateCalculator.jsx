import React, { useState } from "react";
import {
  TextField,
  Button,
  Stack,
  CardHeader,
  Card,
  CardContent,
  CardActions,
  Collapse,
  Typography,
  MenuItem,
  Box,
  Tab,
  Tabs,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  Paper,
} from "@mui/material";

const PlateCalculator = () => {
  const [barWeight, setBarWeight] = useState(0);
  const [plateData, setPlateData] = useState({
    red: 0,
    blue: 0,
    yellow: 0,
    green: 0,
    white: 0,
    black: 0,
    silver1: 0,
    silver2: 0,
    silver3: 0,
  });

  const submitHandler = (e) => {
    e.preventDefault();
    calculateWeights(barWeight);
  };

  const calculateWeights = (bw) => {
    const plateWeight = (bw - 25) / 2;
    const weights = [
      { weight: 25, key: "redCount" },
      { weight: 20, key: "blueCount" },
      { weight: 15, key: "yellowCount" },
      { weight: 10, key: "greenCount" },
      { weight: 5, key: "whiteCount" },
      { weight: 2.5, key: "blackCount" },
      { weight: 1.25, key: "silver1Count" },
      { weight: 0.5, key: "silver2Count" },
      { weight: 0.25, key: "silver3Count" },
    ];

    const counts = {};

    for (let i = plateWeight; i > 0; ) {
      for (const { weight, key } of weights) {
        if (i >= weight) {
          const number = Math.floor(i / weight);
          counts[key] = number;
          i -= number * weight;
          break;
        }
      }
    }

    setPlateData((plateData) => ({
      ...plateData,
      red: counts.redCount ? counts.redCount : 0,
      blue: counts.blueCount ? counts.blueCount : 0,
      yellow: counts.yellowCount ? counts.yellowCount : 0,
      green: counts.greenCount ? counts.greenCount : 0,
      white: counts.whiteCount ? counts.whiteCount : 0,
      black: counts.blackCount ? counts.blackCount : 0,
      silver1: counts.silver1Count ? counts.silver1Count : 0,
      silver2: counts.silver2Count ? counts.silver2Count : 0,
      silver3: counts.silver3Count ? counts.silver3Count : 0,
    }));

    return plateData;
  };

  return (
    <>
      {" "}
      <br />
      <div>
        <form onSubmit={submitHandler}>
          <TextField
            required
            id="Weight_Input"
            label="Bar Weight"
            variant="outlined"
            type="number"
            value={barWeight}
            onChange={(e) => setBarWeight(e.target.value)}
          />
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
      </div>
      <div>
        {Object.values(plateData).reduce((c, v) => c + v, 0) == 0 ? null : (
          <>
            <p>{`Plates Per Side`}</p>
            <p>{`Number of 25kg plates is ${plateData.red}`}</p>
            <p>{`Number of 20kg plates is ${plateData.blue}`}</p>
            <p>{`Number of 15kg plates is ${plateData.yellow}`}</p>
            <p>{`Number of 10kg plates is ${plateData.green}`}</p>
            <p>{`Number of 5kg plates is ${plateData.white}`}</p>
            <p>{`Number of 2.5kg plates is ${plateData.black}`}</p>
            <p>{`Number of 1.25kg plates is ${plateData.silver1}`}</p>
            <p>{`Number of 0.5kg plates is ${plateData.silver2}`}</p>
            <p>{`Number of 0.25kg plates is ${plateData.silver3}`}</p>
            <p>{`2.5kg clips`}</p>
          </>
        )}
      </div>
    </>
  );
};

export default PlateCalculator;
