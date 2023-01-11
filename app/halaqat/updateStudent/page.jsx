"use client";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import styles from "./page.module.css";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

export default function Home() {
  const router = useRouter();
  const [reqProcessing, setReqProcessing] = useState(false);
  const searchParams = useSearchParams();
  const [studentId, setStudentId] = useState(searchParams.get("studentId"));
  const [firstName, setFirstName] = useState(searchParams.get("firstName"));
  const [lastName, setLastName] = useState(searchParams.get("lastName"));
  const [dob, setDob] = useState(searchParams.get("dob"));
  const [gender, setGender] = useState(searchParams.get("gender"));
  const [teachersArray, setTeachersArray] = useState([]);

  const [schoolGrade, setSchoolGrade] = useState(
    searchParams.get("schoolGrade")
  );
  const [teacherId, setTeacherId] = useState(searchParams.get("teacherId"));

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };
  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };
  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };
  const handleSchoolGradeChange = (event) => {
    setSchoolGrade(event.target.value);
  };
  const handleTeacherIdChange = (event) => {
    setTeacherId(event.target.value);
  };

  async function getTeachersData() {
    const res = await fetch("/api/teachers");
    const teachers = JSON.parse(await res.json());
    setTeachersArray(teachers);
  }

  useEffect(() => {
    if (reqProcessing === true) {
      updateStudent(window, studentId);
    }
  }, [reqProcessing]);

  const updateStudent = (window, studentId) => {
    window
      .fetch("/api/parents", {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          studentId,
          firstName,
          lastName,
          dob,
          gender,
          schoolGrade,
          teacherId,
        }),
      })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .then(() => {
        setReqProcessing(false);
        router.back();
      });
  };

  useEffect(() => {
    getTeachersData();
  }, []);
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
        <Box component="form">
          <div>
            <TextField
              style={{ margin: "5px", padding: "5px" }}
              id="firstName"
              label="First Name"
              value={searchParams.get("firstName")}
              onChange={handleFirstNameChange}
            />
            <TextField
              style={{ margin: "5px", padding: "5px" }}
              id="lastName"
              label="Last Name"
              value={lastName}
              onChange={handleLastNameChange}
            />
          </div>
          <div style={{ margin: "10px", padding: "5px" }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="DOB"
                value={dob}
                onChange={(newValue) => {
                  setDob(newValue);
                }}
                renderInput={(params) => (
                  <TextField
                    style={{ margin: "5px", padding: "5px" }}
                    {...params}
                  />
                )}
              />
            </LocalizationProvider>
            <FormControl style={{ margin: "5px", padding: "5px" }}>
              <FormLabel id="demo-row-radio-buttons-group-label">
                Gender
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                value={gender}
                onChange={handleGenderChange}
              >
                <FormControlLabel value="M" control={<Radio />} label="Male" />
                <FormControlLabel
                  value="F"
                  control={<Radio />}
                  label="Female"
                />
              </RadioGroup>
            </FormControl>
          </div>
          <div>
            <TextField
              style={{ margin: "5px", padding: "5px" }}
              id="schoolGrade"
              label="School Grade"
              value={schoolGrade}
              onChange={handleSchoolGradeChange}
            />
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-simple-select-helper-label">
                Teacher ID
              </InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={teacherId}
                label="Teacher ID"
                onChange={handleTeacherIdChange}
              >
                {teachersArray &&
                  teachersArray.map((teacher) => {
                    return (
                      <MenuItem value={teacher.staffNo}>
                        {teacher.staffNo}
                      </MenuItem>
                    );
                  })}
              </Select>
            </FormControl>
          </div>
          <div style={{ margin: "5px", padding: "5px" }}>
            <Button onClick={() => setReqProcessing(true)} variant="contained">
              Submit
            </Button>
          </div>
        </Box>
      </div>
    </>
  );
}
