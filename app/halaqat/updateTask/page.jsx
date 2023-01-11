"use client";
import styles from "./page.module.css";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Button from "@mui/material/Button";

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [teachersArray, setTeachersArray] = useState([]);
  const [parentsArray, setParentsArray] = useState([]);
  const [surahsArray, setSurahsArray] = useState([]);
  const [surahId, setSurahId] = useState(searchParams.get("surahId"));
  const [taskId, setTaskId] = useState(searchParams.get("taskId"));
  const [surahName, setSurahtName] = useState(searchParams.get("surahName"));
  const [studentId, setStudentId] = useState(searchParams.get("studentId"));
  const today = new Date();
  const [reqProcessing, setReqProcessing] = useState(false);
  const user =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("logged in user"))
      : null;

  const [fromAya, setFromAya] = useState(searchParams.get("fromAya"));
  const [toAya, ToFromAya] = useState(searchParams.get("toAya"));
  const [dueDate, setDueDate] = useState(searchParams.get("dueDate"));
  const Cdate = new Date();
  const tempDate = new Date();
  const [completedDate, setCompleteDate] = useState(Cdate.toLocaleDateString());

  const [taskStatus, setTaskStatus] = useState(() => {
    const status = searchParams.get("completedDate");
    if (status == "pending") {
      return "Pending";
    } else {
      return "Completed";
    }
  });

  const updateTask = (window) => {
    if (taskStatus == "Completed") {
      window
        .fetch("/api/tasks", {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            taskId,
            surahName,
            surahId,
            fromAya: limitValues[0],
            toAya: limitValues[1],
            dueDate,
            completedDate,
            masteryLevel,
            comment,
            studentId,
            type: taskType,
          }),
        })
        .then((res) => res.json())
        .then((data) => console.log(data))
        .then(() => {
          setReqProcessing(false);
          router.back();
        });
    } else {
      window
        .fetch("/api/tasks", {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            taskId,
            surahName,
            surahId,
            fromAya: limitValues[0],
            toAya: limitValues[1],
            dueDate,
            completedDate: "pending",
            masteryLevel: "pending",
            comment: "pending",
            studentId,
            type: taskType,
          }),
        })
        .then((res) => res.json())
        .then((data) => console.log(data))
        .then(() => {
          setReqProcessing(false);
          router.back();
        });
    }
  };

  useEffect(() => {
    if (reqProcessing === true) {
      updateTask(window);
    }
  }, [reqProcessing]);

  const [taskType, setTaskType] = useState(searchParams.get("type"));
  const [masteryLevel, setMasteryLevel] = useState(
    searchParams.get("masteryLevel")
  );
  const [comment, setComment] = useState(searchParams.get("comment"));
  const [limitValues, setLimitValues] = useState([1, 286]);

  useEffect(() => {
    getParentsData();
    getTeachersData();
    getSurahssData();
  }, []);

  const minDistance = 0;

  const handleSliderChange = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setLimitValues([
        Math.min(newValue[0], limitValues[1] - minDistance),
        limitValues[1],
      ]);
    } else {
      setLimitValues([
        limitValues[0],
        Math.max(newValue[1], limitValues[0] + minDistance),
      ]);
    }
  };

  const handleTaskTypeChange = (event) => {
    setTaskType(event.target.value);
  };

  const handleSurahChange = (event) => {
    setSurahtName(event.target.value);
  };

  const handleStudentChange = (event) => {
    setStudentId(event.target.value);
  };

  const handleTaskStatusChange = (event) => {
    setTaskStatus(event.target.value);
  };

  const handlemasteryLevelChange = (event) => {
    setMasteryLevel(event.target.value);
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  async function getParentsData() {
    const res = await fetch("/api/parents");
    const parents = JSON.parse(await res.json());
    setParentsArray(parents);
  }
  async function getSurahssData() {
    const res = await fetch("/api/surahs");
    const surahs = JSON.parse(await res.json());
    setSurahsArray(surahs);
  }
  async function getTeachersData() {
    const res = await fetch("/api/teachers");
    const teachers = JSON.parse(await res.json());
    setTeachersArray(teachers);
  }

  useEffect(() => {
    getTeachersData();
  }, []);

  function handleSliderLimit() {
    const index = surahsArray.findIndex(
      (surah) => surah.englishName == surahName
    );
    if (index == -1) {
      return 1;
    } else {
      const surah = surahsArray[index];
      return surah.ayaCount;
    }
  }

  return (
    <>
      <div
        className={styles.form}
        style={{
          padding: "10px",
          margin: "10px",
          border: "1px solid black",
          borderRadius: "5px",
        }}
      >
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-helper-label">Sura</InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={surahName}
            label="Sura"
            onChange={handleSurahChange}
          >
            {surahsArray &&
              surahsArray.map((surah) => {
                return (
                  <MenuItem value={surah.englishName}>
                    {surah.id}. {surah.englishName} ({surah.ayaCount} Aya)
                  </MenuItem>
                );
              })}
          </Select>
        </FormControl>
        <div>
          <Box width={300}>
            <Slider
              sx={{ padding: "10px", margin: "10px" }}
              getAriaLabel={() => "Minimum distance"}
              value={limitValues}
              onChange={handleSliderChange}
              valueLabelDisplay="auto"
              disableSwap
              min={1}
              max={handleSliderLimit()}
            />
          </Box>
        </div>

        <div style={{ margin: "10px", padding: "5px" }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            {/* dates are populated but cannot be changed! */}
            <DatePicker
              label="Due Date"
              value={dueDate}
              minDate={today.setDate(today.getDate() + 1)}
              onChange={(newValue) => {
                setDueDate(newValue);
              }}
              renderInput={(params) => (
                <TextField
                  style={{ margin: "5px", padding: "5px" }}
                  {...params}
                />
              )}
            />
          </LocalizationProvider>
        </div>
        <div>
          <FormControl style={{ margin: "5px", padding: "5px" }}>
            <FormLabel id="demo-row-radio-buttons-group-label">
              Task Type
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              value={taskType}
              onChange={handleTaskTypeChange}
            >
              <FormControlLabel
                value="Memorization"
                control={<Radio />}
                label="Memorization"
              />
              <FormControlLabel
                value="Revision"
                control={<Radio />}
                label="Revision"
              />
            </RadioGroup>
          </FormControl>
        </div>
        <div>
          <FormControl style={{ margin: "5px", padding: "5px" }}>
            <FormLabel id="demo-row-radio-buttons-group-label">
              Status :
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              value={taskStatus}
              onChange={handleTaskStatusChange}
            >
              <FormControlLabel
                value="Completed"
                control={<Radio />}
                label="Completed"
              />
              <FormControlLabel
                value="Pending"
                control={<Radio />}
                label="Pending"
              />
            </RadioGroup>
          </FormControl>
        </div>
        {taskStatus == "Completed" && (
          <div>
            <div style={{ margin: "10px", padding: "5px" }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                {/* dates are populated but cannot be changed! */}
                <DatePicker
                  label="Completed Date"
                  value={completedDate}
                  minDate={tempDate.setDate(tempDate.getDate())}
                  onChange={(newValue) => {
                    setCompleteDate(newValue);
                  }}
                  renderInput={(params) => (
                    <TextField
                      style={{ margin: "5px", padding: "5px" }}
                      {...params}
                    />
                  )}
                />
              </LocalizationProvider>
            </div>
            <div>
              <FormControl style={{ margin: "5px", padding: "5px" }}>
                <FormLabel id="demo-row-radio-buttons-group-label">
                  Mastery Level :
                </FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  value={masteryLevel}
                  onChange={handlemasteryLevelChange}
                >
                  <FormControlLabel
                    value="Excellent"
                    control={<Radio />}
                    label="Excellent"
                  />
                  <FormControlLabel value="Ok" control={<Radio />} label="Ok" />
                  <FormControlLabel
                    value="Poor"
                    control={<Radio />}
                    label="Poor"
                  />
                </RadioGroup>
              </FormControl>
            </div>
            <div>
              <TextField
                value={comment}
                onChange={handleCommentChange}
                fullWidth
                id="outlined-multiline-static"
                label="write a message..."
                multiline
                rows={10}
              />
            </div>
          </div>
        )}

        <FormControl sx={{ m: 1, minWidth: 170 }}>
          <InputLabel id="demo-simple-select-helper-label">
            Student Name
          </InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={studentId}
            label="Student Name"
            onChange={handleStudentChange}
          >
            {parentsArray &&
              parentsArray.map((parent) => {
                return parent.students.map((student) => {
                  if (student.teacherId == user.staffNo) {
                    return (
                      <MenuItem value={student.studentId}>
                        {student.studentId}. {student.firstName}
                        {student.lastName}
                      </MenuItem>
                    );
                  }
                });
              })}
          </Select>
        </FormControl>
        <div>
          <Button onClick={() => setReqProcessing(true)} variant="contained">
            Submit
          </Button>
        </div>
      </div>
    </>
  );
}
