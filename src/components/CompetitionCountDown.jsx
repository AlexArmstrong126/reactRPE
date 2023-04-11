import React, { useState } from "react";
import CountdownTimer from "./CountdownTimer";

const CompetitionCountDown = () => {
  const [competitions, setCompetitions] = useState([]);
  return (
    <>
      <div>Mapped Out comp</div>
      <div>Form</div>
      <div>
        {/* {" "}
       // <CountdownTimer targetDate={dateTimeAfterThreeDays} /> */}
      </div>
    </>
  );
};

export default CompetitionCountDown;
