import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Typography,
  MenuItem,
  Box,
  Modal,
} from "@mui/material";
import ReactPlayer from "react-player";

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
    Video: "",
    Date: "",
  });
  const [records, setRecords] = useState(() => {
    return JSON.parse(localStorage.getItem("PR_Data")) || [];
  });
  const [selectedModalIndex, setSelectedModalIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleOpen = (index) => {
    setSelectedModalIndex(index);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    borderRadius: "30px",
  };

  useEffect(() => {
    localStorage.setItem("PR_Data", JSON.stringify(records));
    // fetch(`https://api.api-ninjas.com/v1/exercises?type=powerlifting`, {
    //   method: "GET",
    //   headers: { "X-Api-Key": "8ZPIrfKzXqBsopZbvfO3zA==YHG7tyL9oNaj03wO" },
    //   contentType: "application/json",
    // })
    //   .then((response) => {
    //     if (!response.ok) {
    //       throw new Error(
    //         `This is an HTTP error: The status is ${response.status}`
    //       );
    //     }
    //     return response.json();
    //   })
    //   .then((actualData) => console.log(actualData))
    //   .catch((err) => {
    //     console.log(err.message);
    //   });
  }, [records]);

  const shouldAdd = () => {
    for (let i = 0; i < records.length; i++) {
      if (input.Exercise === records[i].Exercise) {
        if (
          input.Weight === records[i].Weight &&
          input.Reps === records[i].Reps
        ) {
          return false;
        }
        if (
          input.Weight < records[i].Weight &&
          input.Reps === records[i].Reps
        ) {
          return false;
        }
        if (
          input.Weight === records[i].Weight &&
          input.Reps > records[i].Reps
        ) {
          return false;
        }
      }
      if (JSON.stringify(input) === JSON.stringify(records[i])) {
        return false;
      }
    }
    return true;
  };

  const updateRecord = () => {
    console.clear();
    let uniquecheck = shouldAdd();
    const prData = records.map((record) => {
      // Check if exercise is already there
      if (input.Exercise === record.Exercise) {
        // console.log("same exercise");
        if (input.Weight > record.Weight && input.Reps === record.Reps) {
          //console.log("KG PR");
          return {
            ...record,
            Weight: input.Weight,
          };
        } else if (input.Weight === record.Weight && input.Reps > record.Reps) {
          // console.log("Rep pr");
          return {
            ...record,
            Reps: input.Reps,
          };
        } else {
          return {
            ...record,
          };
        }
      } else {
        return {
          ...record,
        };
      }
    });
    console.log(uniquecheck);

    if (JSON.stringify(prData) !== JSON.stringify(records)) {
      console.log("Updated a PR");
      let newRecords = prData.filter(
        (value, index, self) =>
          index ===
          self.findIndex(
            (t) =>
              t.Exercise === value.Exercise &&
              t.Weight === value.Weight &&
              t.Reps === value.Reps
          )
      );
      setRecords(newRecords);
    } else if (uniquecheck) {
      console.log("added unique");
      setRecords((prevState) => [...prevState, input]);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    updateRecord();
    //setRecords((prevState) => [...prevState, input]);
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
        <input
          type="file"
          id="myfile"
          name="myfile"
          value={input.Video}
          onChange={(e) =>
            setInput((prevState) => ({
              ...prevState,
              Video: e.target.value,
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
                  <td>
                    <Button onClick={() => handleOpen(index)}>
                      {" "}
                      {records.Video}
                    </Button>
                  </td>
                  <td>{records.Date}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h1>{records[selectedModalIndex].Exercise}</h1>
          <p>{records[selectedModalIndex].Date}</p>
          <ReactPlayer
            url="https://www.youtube.com/watch?v=5t3q7y3-vXE"
            // url={records[selectedModalIndex].Video}
            width={400}
            controls={true}
          />
          <Button> Replace</Button>
        </Box>
      </Modal>
    </>
  );
};

export default PrRecorder;
