import React, { useState, useEffect } from "react";
import { TextField, Button, Stack, Grid } from "@mui/material";
const Countdown = () => {
  const [timer, setTimer] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [check, setCheck] = useState(false);
  const [finished, setfinshed] = useState(false);
  const [customTime, setCustomTime] = useState(0);

  const styles = {
    roundTimeBar: {
      height: "5px",
      background: "red",
      transitionDuration: timeLeft,
    },
  };

  const timeHandler = (time) => {
    const addedTime = time + timeLeft;
    if (!time) {
      console.log("need a time larger than 0");
      return;
    }
    setCheck(true);
    setTimeLeft(addedTime);
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();
    timeHandler(customTime);
  };

  useEffect(() => {
    // exit early when we reach 0
    if (!timeLeft && check === true) {
      setCheck(false);
      setfinshed(true);
      console.log(timeLeft, "finished");
      return;
    }

    const intervalId = setInterval(() => {
      if (timeLeft > 0) {
        setTimeLeft(timeLeft - 1);
      }
    }, 1000);

    // clear interval on re-render to avoid memory leaks
    return () => clearInterval(intervalId);
    // add timeLeft as a dependency to re-rerun the effect
    // when we update it
  }, [timeLeft]);

  return (
    <>
      <div>
        Rest Timer Seconds:{" "}
        {timeLeft < 1 ? (finished === true ? "finished" : "start") : timeLeft}
      </div>{" "}
      <div>
        {" "}
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={{ xs: 1, sm: 2, md: 4 }}
        >
          <Button variant="contained" onClick={() => timeHandler(5)}>
            60 Seconds
          </Button>
          <Button variant="contained" onClick={() => timeHandler(10)}>
            90 Seconds
          </Button>
          <Button variant="contained" onClick={() => timeHandler(15)}>
            120 Seconds
          </Button>
          <form onSubmit={formSubmitHandler}>
            <TextField
              required
              id="Weight_Input"
              variant="outlined"
              type="number"
              value={customTime}
              onChange={(e) => setCustomTime(e.target.value)}
            />
            <Button
              type="submit"
              value="Submit"
              variant="contained"
              color="success"
            >
              Submit
            </Button>
          </form>
        </Stack>
      </div>
    </>
  );
};

export default Countdown;
