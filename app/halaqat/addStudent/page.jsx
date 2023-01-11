"use client";
import styles from "./page.module.css";
import { useState, useEffect } from "react";
import FormLabel from "@mui/material/FormLabel";
import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import FormControlLabel from "@mui/material/FormControlLabel";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
// import { v4 as uuidv4 } from "uuid";
import { uid } from 'uid';
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const date = new Date();
  date.setFullYear(date.getFullYear() - 6);
  const [parentStatus, setParentStatus] = useState("NEW");
  const [parentQatariId, setParentQatariId] = useState("");
  const [parentId, setParentId] = useState("");
  const [parentFirstName, setParentFirstName] = useState("");
  const [parentLastName, setParentLastName] = useState("");
  const [parentMobile, setParentMobile] = useState("");
  const [parentEmail, setParentEmail] = useState("");
  const [parentUserName, setParentUserName] = useState("");
  const [parentPassword, setParentPassword] = useState("");
  const [parent, setParent] = useState(null);
  const [addingNewParent, setAddingNewParent] = useState(false);
  const [addingExistedParent, setAddingExistedParent] = useState(false);
  const [parentsArray, setParentsArray] = useState([]);
  const [teachersArray, setTeachersArray] = useState([]);
  const [studentFirstName, setStudentFirstName] = useState("");
  const [studentLastName, setStudentLastName] = useState("");
  const [dob, setDob] = useState(date.toLocaleDateString());
  const [gender, setGender] = useState("");
  const [schoolGrade, setSchoolGrade] = useState("");
  const [teacherId, setTeacherId] = useState("");
  async function getParentsData() {
    const res = await fetch("/api/parents");
    const parents = JSON.parse(await res.json());
    setParentsArray(parents);
  }

  async function getTeachersData() {
    const res = await fetch("/api/teachers");
    const teachers = JSON.parse(await res.json());
    setTeachersArray(teachers);
  }

  const addStudentWithNewParent = (window) => {
    window
      .fetch("/api/parents", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          qatariId: parentQatariId,
          firstName: parentFirstName,
          lastName: parentLastName,
          mobile: parentMobile,
          email: parentEmail,
          password: parentPassword,
          students: [
            {
              studentId: uid(8),
              firstName: studentFirstName,
              lastName: studentLastName,
              dob,
              gender,
              schoolGrade,
              teacherId,
            },
          ],
        }),
      })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .then(() => {
        setAddingNewParent(false);
        router.back();
      });
  };

  const addStudentWithExistedParent = (window, parentId) => {
    window
      .fetch("/api/parents", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          status: "existed",
          parentId,
          studentId: uid(8),
          firstName: studentFirstName,
          lastName: studentLastName,
          dob,
          gender,
          schoolGrade,
          teacherId,
        }),
      })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .then(() => {
        setAddingExistedParent(false);
        router.back();
      });
  };

  useEffect(() => {
    if (addingNewParent === true) {
      addStudentWithNewParent(window);
    }
    if (addingExistedParent === true) {
      addStudentWithExistedParent(window, parentId);
    }
  }, [addingNewParent, addingExistedParent]);

  useEffect(() => {
    getParentsData();
    getTeachersData();
  }, []);

  const handleParentStatusChange = (event) => {
    setParentStatus(event.target.value);
  };

  const handleParentIdChange = (event) => {
    console.log(event.target.value);
    setParentId(event.target.value);
  };

  const handleFirstNameChange = (event) => {
    setStudentFirstName(event.target.value);
  };
  const handleLastNameChange = (event) => {
    setStudentLastName(event.target.value);
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

  //----------------------

  const handleQatariIdChange = (event) => {
    setParentQatariId(event.target.value);
  };

  function handleNewParentSubmit() {
    if (
      parentQatariId == "" ||
      parentEmail == "" ||
      parentUserName == "" ||
      parentPassword == "" ||
      parentMobile == "" ||
      parentFirstName == "" ||
      parentLastName == ""
    ) {
      return;
    } else {
      setParent({
        qatariId: parentQatariId,
        firstName: parentFirstName,
        lastName: parentLastName,
        mobile: parentMobile,
        email: parentEmail,
        username: parentUserName,
        password: parentPassword,
        students: [],
      });
    }
  }

  const handleParentFirstNameChange = (event) => {
    setParentFirstName(event.target.targetvalue);
  };

  const handleParentLastNameChange = (event) => {
    setParentLastName(event.target.value);
  };
  const handleParentMobileChange = (event) => {
    setParentMobile(event.target.value);
  };
  const handleParentEmailChange = (event) => {
    setParentEmail(event.target.value);
  };
  const handleParentUserNameChange = (event) => {
    setParentUserName(event.target.value);
  };
  const handleParentPasswordChange = (event) => {
    setParentPassword(event.target.value);
  };

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
            <FormControl style={{ margin: "5px", padding: "5px" }}>
              <FormLabel id="demo-row-radio-buttons-group-label">
                Parent Selection
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                value={parentStatus}
                onChange={handleParentStatusChange}
              >
                <FormControlLabel
                  value="EXISTED"
                  control={<Radio />}
                  label="Existed parent"
                />
                <FormControlLabel
                  value="NEW"
                  control={<Radio />}
                  label="New parent"
                />
              </RadioGroup>
            </FormControl>
          </div>
          {parentStatus == "EXISTED" && (
            <div>
              <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-helper-label">
                  Parent Name
                </InputLabel>
                <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  value={parentId}
                  label="Parent Name"
                  onChange={handleParentIdChange}
                >
                  {parentsArray &&
                    parentsArray.map((parent) => {
                      return (
                        <MenuItem value={parent.qatariId}>
                          {parent.firstName} {parent.lastName}
                        </MenuItem>
                      );
                    })}
                </Select>
              </FormControl>
              {parentId != "" && (
                <div>
                  <div>
                    <TextField
                      style={{ margin: "5px", padding: "5px" }}
                      id="StudenFirstName"
                      label="Student First Name"
                      value={studentFirstName}
                      onChange={handleFirstNameChange}
                    />
                    <TextField
                      style={{ margin: "5px", padding: "5px" }}
                      id="StudentlastName"
                      label="Student Last Name"
                      value={studentLastName}
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
                        <FormControlLabel
                          value="M"
                          control={<Radio />}
                          label="Male"
                        />
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
                    <Button
                      variant="contained"
                      onClick={() => setAddingExistedParent(true)}
                    >
                      Submit
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}
          {parentStatus == "NEW" && (
            <div>
              <div>
                <TextField
                  style={{ margin: "5px", padding: "5px" }}
                  id="qatariId"
                  label="Qatari ID"
                  value={parentQatariId}
                  onChange={handleQatariIdChange}
                />
                <TextField
                  style={{ margin: "5px", padding: "5px" }}
                  id="parentFirstName"
                  label="Parent First Name"
                  value={parentFirstName}
                  onChange={handleParentFirstNameChange}
                />
              </div>
              <div>
                <TextField
                  style={{ margin: "5px", padding: "5px" }}
                  id="parentlastName"
                  label="Parent Last Name"
                  value={parentLastName}
                  onChange={handleParentLastNameChange}
                />
                <TextField
                  style={{ margin: "5px", padding: "5px" }}
                  id="parentMobile"
                  label="Mobile"
                  value={parentMobile}
                  onChange={handleParentMobileChange}
                />
              </div>
              <div>
                <TextField
                  style={{ margin: "5px", padding: "5px" }}
                  id="parentEmail"
                  label="Email"
                  value={parentEmail}
                  onChange={handleParentEmailChange}
                />
                <TextField
                  style={{ margin: "5px", padding: "5px" }}
                  id="parentUserName"
                  label="User Name"
                  value={parentUserName}
                  onChange={handleParentUserNameChange}
                />
              </div>
              <div>
                <TextField
                  style={{ margin: "5px", padding: "5px" }}
                  type="password"
                  id="parentPassword"
                  label="Password"
                  value={parentPassword}
                  onChange={handleParentPasswordChange}
                />
                <Button variant="contained" onClick={handleNewParentSubmit}>
                  Add Parent
                </Button>
                {parent != null && (
                  <div>
                    <div>
                      <TextField
                        style={{ margin: "5px", padding: "5px" }}
                        id="StudenFirstName"
                        label="Student First Name"
                        value={studentFirstName}
                        onChange={handleFirstNameChange}
                      />
                      <TextField
                        style={{ margin: "5px", padding: "5px" }}
                        id="StudentlastName"
                        label="Student Last Name"
                        value={studentLastName}
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
                          <FormControlLabel
                            value="M"
                            control={<Radio />}
                            label="Male"
                          />
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
                      <Button
                        onClick={() => setAddingNewParent(true)}
                        variant="contained"
                      >
                        Submit
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </Box>
      </div>
    </>
  );
}
