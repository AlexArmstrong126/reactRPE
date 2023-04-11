import React, { useState, useEffect } from "react";
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

// TODO: Validation for forms
// TODO: Nicer looking forms
// TODO: Ability to edit prs
// TODO: Ability to delete PRS
// TODO: Ability to Override an exisiting pr if entered and get a congrats alert/modal/toast
// TODO: This is done by comparing exercise and seeing if the weight or reps are greater
// TODO: Filter by Exercise

const PrRecorder = () => {
  const [input, setInput] = useState({
    Exercise: "Squat",
    Weight: 0,
    Reps: 0,
    Video: "No video",
    Date: "",
  });
  const [records, setRecords] = useState(() => {
    return JSON.parse(localStorage.getItem("PR_Data")) || [];
  });

  useEffect(() => {
    localStorage.setItem("PR_Data", JSON.stringify(records));
  }, [records]);

  const submitHandler = (e) => {
    e.preventDefault();
    setRecords((prevState) => [...prevState, input]);
  };

  return (
    <>
      <form onSubmit={submitHandler}>
        <TextField
          required
          id="Weight_Input"
          label="Exercse"
          variant="outlined"
          select
          value={input.Exercise}
          onChange={(e) =>
            setInput((prevState) => ({
              ...prevState,
              Exercise: e.target.value,
            }))
          }
        >
          <MenuItem key={1} value={"Squat"}>
            Squat
          </MenuItem>
          <MenuItem key={2} value={"Bench"}>
            Bench
          </MenuItem>
          <MenuItem key={3} value={"Deadlift"}>
            Deadlift
          </MenuItem>
          <MenuItem key={4} value={"OHP"}>
            Overhead press
          </MenuItem>
        </TextField>
        <TextField
          required
          id="Weight"
          label="Weight"
          variant="outlined"
          type="number"
          value={input.Weight}
          onChange={(e) =>
            setInput((prevState) => ({
              ...prevState,
              Weight: e.target.value,
            }))
          }
        />
        <TextField
          required
          id="RPE_Input"
          label="Reps"
          variant="outlined"
          type="number"
          value={input.Reps}
          onChange={(e) =>
            setInput((prevState) => ({
              ...prevState,
              Reps: e.target.value,
            }))
          }
        />
        {/* Need to make sure PRs cant be logged in future dates */}
        <input
          required
          type="date"
          id="start"
          name="trip-start"
          value={input.Date}
          max={Date.now()}
          onChange={(e) =>
            setInput((prevState) => ({
              ...prevState,
              Date: e.target.value,
            }))
          }
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
      <div>
        <table>
          <thead>
            <tr>
              <th>Exercise</th>
              <th>Weight</th>
              <th>Reps</th>
              <th>Video</th>
              <th>Date acheived</th>
            </tr>
          </thead>
          <tbody>
            {records.map((records, index) => {
              return (
                <tr key={index}>
                  <td>{records.Exercise}</td>
                  <td>{records.Weight}</td>
                  <td>{records.Reps}</td>
                  <td>{records.Video}</td>
                  <td>{records.Date}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default PrRecorder;
