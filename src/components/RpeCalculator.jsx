import React, { useState } from "react";
import rpe_chart from "../data/rpeData";
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

// #TODO: Make Responsive

const RpeCalculator = () => {
  const [rpeData, setRpeData] = useState({
    weight: "",
    reps: "",
    rpe: "",
    erm: "",
    minIncrement: 2.5,
  });
  const [rpeBreakDown, setRpeBreakDown] = useState([]);
  const [expanded, setExpanded] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const submitHandler = (e) => {
    e.preventDefault();
    console.log(rpeData);
    let erm = (rpeData.weight / rpe_chart[rpeData.reps][rpeData.rpe]) * 100;

    // setErm(roundedErm);
    computeRPEChart(erm);
  };

  const computeRPEChart = (erm) => {
    setRpeBreakDown([]);
    let increment = rpeData.minIncrement;
    let finalErm = increment * Math.round(erm / increment);
    setRpeData((prevState) => ({
      ...prevState,
      erm: finalErm,
    }));

    for (let i = 6; i < 10.5; i += 0.5) {
      let breakDownErm = (rpeData.weight * rpe_chart[rpeData.reps][i]) / 100;

      let finalErmBreakdown = increment * Math.round(breakDownErm / increment);
      let rpeBreakdownObj = {
        rpe: i,
        rpePercentage: rpe_chart[rpeData.reps][i],
        load: finalErmBreakdown,
      };

      setRpeBreakDown((prevState) => [...prevState, rpeBreakdownObj]);
    }

    console.log(rpeBreakDown.sort((a, b) => b.rpe - a.rpe));
  };

  return (
    <>
      <Card>
        <CardHeader title="Small RPE Calculator" />
        <CardContent>
          <div>
            <form onSubmit={submitHandler}>
              <TextField
                required
                id="Weight_Input"
                label="Weight"
                variant="outlined"
                type="number"
                value={rpeData.weight}
                onChange={(e) =>
                  setRpeData((prevState) => ({
                    ...prevState,
                    weight: e.target.value,
                  }))
                }
              />
              <TextField
                required
                id="REPS_Input"
                label="Reps"
                variant="outlined"
                type="number"
                value={rpeData.reps}
                // onChange={(e) => setReps(e.target.value)}
                onChange={(e) =>
                  setRpeData((prevState) => ({
                    ...prevState,
                    reps: e.target.value,
                  }))
                }
              />
              <TextField
                required
                id="RPE_Input"
                label="RPE"
                variant="outlined"
                type="number"
                value={rpeData.rpe}
                //onChange={(e) => setRpe(e.target.value)}
                onChange={(e) =>
                  setRpeData((prevState) => ({
                    ...prevState,
                    rpe: e.target.value,
                  }))
                }
              />
              <TextField
                value={rpeData.minIncrement}
                onChange={(e) =>
                  setRpeData((prevState) => ({
                    ...prevState,
                    minIncrement: e.target.value,
                  }))
                }
                select // tell TextField to render select
              >
                <MenuItem key={1} value={0.5}>
                  0.5 KG
                </MenuItem>
                <MenuItem key={2} value={1}>
                  1 KG
                </MenuItem>
                <MenuItem key={3} value={2.5}>
                  2.5 KG
                </MenuItem>
                <MenuItem key={4} value={5}>
                  5 KG
                </MenuItem>
              </TextField>

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
            {rpeData.erm && <p>Your estimated 1rm is {rpeData.erm}kg</p>}
          </div>
        </CardContent>
        <CardActions disableSpacing>
          <Button
            onClick={() => setExpanded(!expanded)}
            variant="contained"
            color="success"
          >
            Expand for more detail
          </Button>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            {rpeData.erm !== "" ? (
              rpeBreakDown && (
                <>
                  <TableContainer>
                    <Table size="small" aria-label="a dense table">
                      <TableHead>
                        <TableRow>
                          <TableCell align="center">RPE</TableCell>
                          <TableCell align="center">%1RM</TableCell>
                          <TableCell align="center">Load</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {rpeBreakDown
                          .sort((a, b) => b.rpe - a.rpe)
                          .map((rpeBreakDown) => (
                            <TableRow key={rpeBreakDown.rpe}>
                              <TableCell align="center">
                                {rpeBreakDown.rpe}
                              </TableCell>
                              <TableCell
                                align="center"
                                component="th"
                                scope="row"
                              >
                                {rpeBreakDown.rpePercentage}
                              </TableCell>
                              <TableCell align="center">
                                {rpeBreakDown.load}
                              </TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </>
              )
            ) : (
              <h1>Enter a weight</h1>
            )}
          </CardContent>
        </Collapse>
      </Card>
    </>
  );
};

export default RpeCalculator;
