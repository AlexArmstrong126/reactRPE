import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import RpeCalculator from "./components/RpeCalculator";
import Countdown from "./components/Countdown";
import CompetitionCountDown from "./components/CompetitionCountDown";
import WeightChart from "./components/WeightChart";
import PlateCalculator from "./components/PlateCalculator";
import PrRecorder from "./components/PrRecorder";
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
} from "@mui/material";

function App() {
  return (
    <div className="App">
      <h1>Iron IQ Component Lists</h1>
      <RpeCalculator />
      {/* <button onClick={() => setCount((count) => count + 1)}>
          count is111 {count}
        </button> */}
      <br />
      <Card>
        <CardHeader title="PR Recorder" />
        <CardContent>
          <div>
            <li>Much like to do list?</li>
            <li>store in local storage for the time being?</li>
            <li>Ability to add video at some point to each pr?</li>
          </div>
          <br />
          <PrRecorder />
        </CardContent>
      </Card>
      <br />
      <Card>
        <CardHeader title="Exercise Index" />
        <CardContent>
          <div></div>
        </CardContent>
      </Card>
      <br />
      <Card>
        <CardHeader title="Rest Tracker Timer" />
        <CardContent>
          <Countdown />
        </CardContent>
      </Card>
      <br />
      <Card>
        <CardHeader title="Competition CountDown" />
        <CardContent>
          <div>Data and time to competition</div>
          <li>Countdown which adds certain dates by days</li>
          <li>form to add name of comp as well as date it is on</li>
          <li>allow the user to add a background image for each comp?</li>
          <br />
          <CompetitionCountDown />
        </CardContent>
      </Card>
      <br />
      <Card>
        <CardHeader title="Plate calculator" />
        <CardContent>
          <div>Shows how much to load on a bar</div>
          <PlateCalculator />
        </CardContent>
      </Card>
      <br />
      <Card>
        <CardHeader title="Weight Tracker" />
        <CardContent>
          <div>
            Input Weight and see how it has fluctuated over a certain length of
            time, set reminder for when to weigh yourself
          </div>
          <div>Add a newest low?</div>
          <br />
          <WeightChart />
        </CardContent>
      </Card>
      <br />
      <Card>
        <CardHeader title="Potential Velocity Tracker?????" />
        <CardContent>
          <div>
            Input Weight and see how it has fluctuated over a certain length of
            time, set reminder for when to weigh yourself
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
