"use client";
import styles from "./page.module.css";
import { useState, useEffect } from "react";
import * as React from "react";
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
import { useRouter } from "next/navigation";

export default function Home() {
  let Ddate = new Date();
  Ddate.setDate(Ddate.getDate() + 1);
  const router = useRouter();

  const [teachersArray, setTeachersArray] = useState([]);
  const [parentsArray, setParentsArray] = useState([]);
  const [surahsArray, setSurahsArray] = useState([]);
  const [surahName, setSurahtName] = useState("");
  const [surahId, setSurahId] = useState("");
  const [studentName, setStudentName] = useState("");
  const [limitValues, setLimitValues] = useState([1, 286]);
  const [reqProcessing, setReqProcessing] = useState(false);
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

  const user =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("logged in user"))
      : null;

  const [fromAya, setFromAya] = useState(1);
  const [toAya, ToFromAya] = useState(() => fromAya - 1);
  const [dueDate, setDueDate] = useState(Ddate.toLocaleDateString());
  const [taskType, setTaskType] = useState("Memorization");

  useEffect(() => {
    getParentsData();
    getTeachersData();
    getSurahssData();
  }, []);

  useEffect(() => {
    surahsArray.map((surah) => {
      if (surah.englishName.includes(surahName)) {
        setSurahId(surah.id);
      }
    });
  }, [surahName]);

  const addTask = (window) => {
    window
      .fetch("/api/tasks", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          studentId: studentName,
          surahId,
          surahName,
          fromAya: limitValues[0],
          toAya: limitValues[1],
          type: taskType,
          dueDate,
          completedDate: "pending",
          masteryLevel: "pending",
          comment: "pending",
        }),
      })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .then(() => {
        setReqProcessing(false);
        router.back();
      });
  };

  const handleTaskTypeChange = (event) => {
    setTaskType(event.target.value);
  };

  const handleSurahChange = (event) => {
    setSurahtName(event.target.value);
  };

  useEffect(() => {
    if (reqProcessing === true) {
      addTask(window);
    }
  }, [reqProcessing]);

  const handleStudentChange = (event) => {
    setStudentName(event.target.value);
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

        <FormControl sx={{ m: 1, minWidth: 170 }}>
          <InputLabel id="demo-simple-select-helper-label">
            Student Name
          </InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={studentName}
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
