"use client";
import { useEffect, useState, useMemo } from "react";
import { styled } from "@mui/material/styles";
import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
// import Button from "@mui/material/Button";
import { useRouter } from "next/navigation";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/DeleteForever";
import { Table, Tooltip, Button } from '@nextui-org/react';
import { EditIcon } from "../EditIcon";
import { DeleteIcon } from "../DeleteIcon"

export default function Home() {
  const router = useRouter();

  const [parentsArray, setParentsArray] = useState([]);
  const [teachersArray, setTeachersArray] = useState([]);
  const [tasksArray, setTasksArray] = useState([]);
  const [reqDeleteProcessing, setReqDeleteProcessing] = useState(false);

  const [selectedId, setSelectedId] = useState(null);
  const user =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("logged in user"))
      : null;
  const [status, setStatus] = useState("All");

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  // const Table.Cell = styled(TableCell)(({ theme }) => ({
  //   [`&.${tableCellClasses.head}`]: {
  //     backgroundColor: theme.palette.common.black,
  //     color: theme.palette.common.white,
  //   },
  //   [`&.${tableCellClasses.body}`]: {
  //     fontSize: 14,
  //   },
  // }));

  const deleteTask = (window) => {
    window
      .fetch(`/api/tasks?taskId=${selectedId}`, {
        method: "DELETE",
      })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .then(() => {
        setReqDeleteProcessing(false);
        setSelectedId(null);
        getTasksData();
      });
  };

  useEffect(() => {
    if (reqDeleteProcessing === true) {
      deleteTask(window);
    }
  }, [reqDeleteProcessing]);


  async function getTeachersData() {
    const res = await fetch("/api/teachers");
    const teachers = JSON.parse(await res.json());
    setTeachersArray(teachers);
  }

  async function getTasksData() {
    const res = await fetch("/api/tasks");
    const Tasks = JSON.parse(await res.json());
    setTasksArray(Tasks);
  }

  async function getParentsData() {
    const res = await fetch("/api/parents");
    const parents = JSON.parse(await res.json());
    setParentsArray(parents);
  }

  useEffect(() => {
    getTeachersData();
    getTasksData();
    getParentsData();
  }, []);

  if (user && user.staffNo) {
    if (user.isCoordinator) {
      return (
        <>
          <div>
            <FormControl
              sx={{ m: 1, minWidth: 120 }}
              focused={true}
              color={
                status == "All"
                  ? "primary"
                  : status == "Pending"
                    ? "warning"
                    : "success"
              }
            >
              <InputLabel id="demo-simple-select-error-label">
                STATUS
              </InputLabel>
              <Select
                labelId="demo-simple-select-error-label"
                id="demo-simple-select-error"
                value={status}
                label="Status"
                onChange={handleStatusChange}
              // renderValue={(value) => value}
              >
                <MenuItem value={"All"}>All</MenuItem>
                <MenuItem value={"Pending"}>Pending</MenuItem>
                <MenuItem value={"Completed"}>Completed</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div>
            {/* <TableContainer component={Paper}> */}
            <Table css={{
              height: "auto",
              minWidth: "100%",
            }} >
              <Table.Header >
                <Table.Column >TASKID</Table.Column>
                <Table.Column >STUDENTID</Table.Column>
                <Table.Column >SURAHID</Table.Column>
                <Table.Column >SURAHNAME</Table.Column>
                <Table.Column >FROMAYA</Table.Column>
                <Table.Column >TOAYA</Table.Column>
                <Table.Column >TYPE</Table.Column>
                <Table.Column >DUE</Table.Column>
                <Table.Column >COMPLETED</Table.Column>
                <Table.Column >LEVEL</Table.Column>
                <Table.Column >COMMENT</Table.Column>
              </Table.Header>
              <Table.Body>
                {tasksArray &&
                  tasksArray.map((task) => {
                    if (status == "All") {
                      if (task.hasOwnProperty("completedDate")) {
                        return (
                          <Table.Row key={task.taskId}>
                            <Table.Cell component="th" scope="row">
                              {task.taskId}
                            </Table.Cell>
                            <Table.Cell align="left">
                              {task.studentId}
                            </Table.Cell>
                            <Table.Cell align="left">
                              {task.surahId}
                            </Table.Cell>
                            <Table.Cell align="left">
                              {task.surahName}
                            </Table.Cell>
                            <Table.Cell align="left">
                              {task.fromAya}
                            </Table.Cell>
                            <Table.Cell align="left">
                              {task.toAya}
                            </Table.Cell>
                            <Table.Cell align="left">
                              {task.type}
                            </Table.Cell>
                            <Table.Cell align="left">
                              {task.dueDate}
                            </Table.Cell>
                            <Table.Cell align="left">
                              {task.completedDate}
                            </Table.Cell>
                            <Table.Cell align="left">
                              {task.masteryLevel}
                            </Table.Cell>
                            <Table.Cell align="left">
                              {task.comment}
                            </Table.Cell>
                          </Table.Row>
                        );
                      } else {
                        return (
                          <Table.Row key={task.taskId}>
                            <Table.Cell component="th" scope="row">
                              {task.taskId}
                            </Table.Cell>
                            <Table.Cell align="left">
                              {task.studentId}
                            </Table.Cell>
                            <Table.Cell align="left">
                              {task.surahId}
                            </Table.Cell>
                            <Table.Cell align="left">
                              {task.surahName}
                            </Table.Cell>
                            <Table.Cell align="left">
                              {task.fromAya}
                            </Table.Cell>
                            <Table.Cell align="left">
                              {task.toAya}
                            </Table.Cell>
                            <Table.Cell align="left">
                              {task.type}
                            </Table.Cell>
                            <Table.Cell align="left">
                              {task.dueDate}
                            </Table.Cell>
                            <Table.Cell align="left">
                              pending
                            </Table.Cell>
                            <Table.Cell align="left">
                              pending
                            </Table.Cell>
                            <Table.Cell align="left">
                              pending
                            </Table.Cell>
                          </Table.Row>
                        );
                      }
                    } else if (status == "Pending") {
                      if (!task.hasOwnProperty("completedDate")) {
                        return (
                          <Table.Row key={task.taskId}>
                            <Table.Cell component="th" scope="row">
                              {task.taskId}
                            </Table.Cell>
                            <Table.Cell align="left">
                              {task.studentId}
                            </Table.Cell>
                            <Table.Cell align="left">
                              {task.surahId}
                            </Table.Cell>
                            <Table.Cell align="left">
                              {task.surahName}
                            </Table.Cell>
                            <Table.Cell align="left">
                              {task.fromAya}
                            </Table.Cell>
                            <Table.Cell align="left">
                              {task.toAya}
                            </Table.Cell>
                            <Table.Cell align="left">
                              {task.type}
                            </Table.Cell>
                            <Table.Cell align="left">
                              {task.dueDate}
                            </Table.Cell>
                            <Table.Cell align="left">
                              pending
                            </Table.Cell>
                            <Table.Cell align="left">
                              pending
                            </Table.Cell>
                            <Table.Cell align="left">
                              pending
                            </Table.Cell>
                          </Table.Row>
                        );
                      }
                    } else {
                      if (task.hasOwnProperty("completedDate")) {
                        return (
                          <Table.Row key={task.taskId}>
                            <Table.Cell component="th" scope="row">
                              {task.taskId}
                            </Table.Cell>
                            <Table.Cell align="left">
                              {task.studentId}
                            </Table.Cell>
                            <Table.Cell align="left">
                              {task.surahId}
                            </Table.Cell>
                            <Table.Cell align="left">
                              {task.surahName}
                            </Table.Cell>
                            <Table.Cell align="left">
                              {task.fromAya}
                            </Table.Cell>
                            <Table.Cell align="left">
                              {task.toAya}
                            </Table.Cell>
                            <Table.Cell align="left">
                              {task.type}
                            </Table.Cell>
                            <Table.Cell align="left">
                              {task.dueDate}
                            </Table.Cell>
                            <Table.Cell align="left">
                              {task.completedDate}
                            </Table.Cell>
                            <Table.Cell align="left">
                              {task.masteryLevel}
                            </Table.Cell>
                            <Table.Cell align="left">
                              {task.comment}
                            </Table.Cell>
                          </Table.Row>
                        );
                      }
                    }
                  })}
              </Table.Body>
            </Table >
            {/* </TableContainer> */}
          </div>
        </>
      );
    } else {
      //teacher
      return (
        <>
          <div>
            <Button
              style={{ marginLeft: '10px', marginTop: '1%' }}
              onClick={() => {
                router.push("halaqat/addTask");
              }}
              // variant="contained"
              color="success"
            >
              Add Task
            </Button>
          </div>
          <div>
            <FormControl
              sx={{ m: 1, minWidth: 120 }}
              focused={true}
              color={
                status == "All"
                  ? "primary"
                  : status == "Pending"
                    ? "warning"
                    : "success"
              }
            >
              <InputLabel id="demo-simple-select-error-label">
                status
              </InputLabel>
              <Select
                labelId="demo-simple-select-error-label"
                id="demo-simple-select-error"
                value={status}
                label="Status"
                onChange={handleStatusChange}
                renderValue={(value) => value}
              >
                <MenuItem value={"All"}>All</MenuItem>
                <MenuItem value={"Pending"}>Pending</MenuItem>
                <MenuItem value={"Completed"}>Completed</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div>
            {/* <TableContainer component={Paper}> */}
            <Table css={{
              height: "auto",
              minWidth: "100%",
            }}>
              <Table.Header >
                <Table.Column >TASKID</Table.Column>
                <Table.Column >STUDENTID</Table.Column>
                <Table.Column >SURAHID</Table.Column>
                <Table.Column >SURAHNAME</Table.Column>
                <Table.Column >FROMAYA</Table.Column>
                <Table.Column >TOAYA</Table.Column>
                <Table.Column >TYPE</Table.Column>
                <Table.Column >DUE</Table.Column>
                <Table.Column >COMPLETED</Table.Column>
                <Table.Column >LEVEL</Table.Column>
                <Table.Column >COMMENT</Table.Column>
                <Table.Column >ACTION</Table.Column>
              </Table.Header>
              <Table.Body>
                {parentsArray &&
                  parentsArray.map((parent) => {
                    if (status == "All") {
                      if (parent.hasOwnProperty("students")) {
                        return parent.students.map((student) => {
                          if (student.teacherId == user.staffNo) {
                            return (
                              tasksArray &&
                              tasksArray.map((task) => {
                                if (task.studentId == student.studentId) {
                                  if (task.hasOwnProperty("completedDate")) {
                                    return (
                                      <Table.Row key={task.taskId}>
                                        <Table.Cell
                                          component="th"
                                          scope="row"
                                        >
                                          {task.taskId}
                                        </Table.Cell>
                                        <Table.Cell align="left">
                                          {task.studentId}
                                        </Table.Cell>
                                        <Table.Cell align="left">
                                          {task.surahId}
                                        </Table.Cell>
                                        <Table.Cell align="left">
                                          {task.surahName}
                                        </Table.Cell>
                                        <Table.Cell align="left">
                                          {task.fromAya}
                                        </Table.Cell>
                                        <Table.Cell align="left">
                                          {task.toAya}
                                        </Table.Cell>
                                        <Table.Cell align="left">
                                          {task.type}
                                        </Table.Cell>
                                        <Table.Cell align="left">
                                          {task.dueDate}
                                        </Table.Cell>
                                        <Table.Cell align="left">
                                          {task.completedDate}
                                        </Table.Cell>
                                        <Table.Cell align="left">
                                          {task.masteryLevel}
                                        </Table.Cell>
                                        <Table.Cell align="left">
                                          {task.comment}
                                        </Table.Cell>
                                        <Table.Cell align="left">
                                          <EditIcon
                                            style={{ cursor: 'pointer' }}
                                            size={20} fill="#979797"
                                            onClick={() => {
                                              router.push(
                                                `halaqat/updateTask?taskId=${task.taskId
                                                }&studentId=${task.studentId
                                                }&surahId=${task.surahId
                                                }&surahName=${task.surahName
                                                }&fromAya=${task.fromAya
                                                }&toAya=${task.toAya}&type=${task.type
                                                }&dueDate=${task.dueDate
                                                }&completedDate=${task.completedDate
                                                  ? task.completedDate
                                                  : "pending"
                                                }&masteryLevel=${task.masteryLevel
                                                  ? task.masteryLevel
                                                  : "pending"
                                                }&comment=${task.comment
                                                  ? task.comment
                                                  : "pending"
                                                }&type=${task.type}`
                                              );
                                            }}
                                          />
                                          <DeleteIcon
                                            style={{ cursor: 'pointer' }}

                                            size={20} fill="#FF0080"
                                            onClick={() => {
                                              setSelectedId(task.taskId);
                                              setReqDeleteProcessing(true);
                                            }}
                                          />
                                        </Table.Cell>
                                      </Table.Row>
                                    );
                                  } else {
                                    return (
                                      <Table.Row key={task.taskId}>
                                        <Table.Cell
                                          component="th"
                                          scope="row"
                                        >
                                          {task.taskId}
                                        </Table.Cell>
                                        <Table.Cell align="left">
                                          {task.studentId}
                                        </Table.Cell>
                                        <Table.Cell align="left">
                                          {task.surahId}
                                        </Table.Cell>
                                        <Table.Cell align="left">
                                          {task.surahName}
                                        </Table.Cell>
                                        <Table.Cell align="left">
                                          {task.fromAya}
                                        </Table.Cell>
                                        <Table.Cell align="left">
                                          {task.toAya}
                                        </Table.Cell>
                                        <Table.Cell align="left">
                                          {task.type}
                                        </Table.Cell>
                                        <Table.Cell align="left">
                                          {task.dueDate}
                                        </Table.Cell>
                                        <Table.Cell align="left">
                                          pending
                                        </Table.Cell>
                                        <Table.Cell align="left">
                                          pending
                                        </Table.Cell>
                                        <Table.Cell align="left">
                                          pending
                                        </Table.Cell>
                                        <Table.Cell align="left">
                                          <EditIcon
                                            style={{ cursor: 'pointer' }}
                                            size={20} fill="#979797"
                                            onClick={() => {
                                              router.push(
                                                `halaqat/updateTask?taskId=${task.taskId
                                                }&studentId=${task.studentId
                                                }&surahId=${task.surahId
                                                }&surahName=${task.surahName
                                                }&fromAya=${task.fromAya
                                                }&toAya=${task.toAya}&type=${task.type
                                                }&dueDate=${task.dueDate
                                                }&completedDate=${task.completedDate
                                                  ? task.completedDate
                                                  : "pending"
                                                }&masteryLevel=${task.masteryLevel
                                                  ? task.masteryLevel
                                                  : "pending"
                                                }&comment=${task.comment
                                                  ? task.comment
                                                  : "pending"
                                                }&type=${task.type}`
                                              );
                                            }}
                                          />
                                          <DeleteIcon
                                            style={{ cursor: 'pointer' }}
                                            size={20} fill="#FF0080"
                                            onClick={() => {
                                              setReqDeleteProcessing(true);
                                            }}
                                          />
                                        </Table.Cell>
                                      </Table.Row>
                                    );
                                  }
                                }
                              })
                            );
                          }
                        });
                      }
                    } else if (status == "Pending") {
                      if (parent.hasOwnProperty("students")) {
                        return parent.students.map((student) => {
                          if (student.teacherId == user.staffNo) {
                            return (
                              tasksArray &&
                              tasksArray.map((task) => {
                                if (task.studentId == student.studentId) {
                                  if (!task.hasOwnProperty("completedDate")) {
                                    return (
                                      <Table.Row key={task.taskId}>
                                        <Table.Cell
                                          component="th"
                                          scope="row"
                                        >
                                          {task.taskId}
                                        </Table.Cell>
                                        <Table.Cell align="left">
                                          {task.studentId}
                                        </Table.Cell>
                                        <Table.Cell align="left">
                                          {task.surahId}
                                        </Table.Cell>
                                        <Table.Cell align="left">
                                          {task.surahName}
                                        </Table.Cell>
                                        <Table.Cell align="left">
                                          {task.fromAya}
                                        </Table.Cell>
                                        <Table.Cell align="left">
                                          {task.toAya}
                                        </Table.Cell>
                                        <Table.Cell align="left">
                                          {task.type}
                                        </Table.Cell>
                                        <Table.Cell align="left">
                                          {task.dueDate}
                                        </Table.Cell>
                                        <Table.Cell align="left">
                                          pending
                                        </Table.Cell>
                                        <Table.Cell align="left">
                                          pending
                                        </Table.Cell>
                                        <Table.Cell align="left">
                                          pending
                                        </Table.Cell>
                                        <Table.Cell align="left">
                                          <EditIcon
                                            style={{ cursor: 'pointer' }}
                                            size={20} fill="#979797"
                                            onClick={() => {
                                              router.push(
                                                `halaqat/updateTask?taskId=${task.taskId
                                                }&studentId=${task.studentId
                                                }&surahId=${task.surahId
                                                }&surahName=${task.surahName
                                                }&fromAya=${task.fromAya
                                                }&toAya=${task.toAya}&type=${task.type
                                                }&dueDate=${task.dueDate
                                                }&completedDate=${task.completedDate
                                                  ? task.completedDate
                                                  : "pending"
                                                }&masteryLevel=${task.masteryLevel
                                                  ? task.masteryLevel
                                                  : "pending"
                                                }&comment=${task.comment
                                                  ? task.comment
                                                  : "pending"
                                                }&type=${task.type}`
                                              );
                                            }}
                                          />
                                          <DeleteIcon
                                            style={{ cursor: 'pointer' }}
                                            size={20} fill="#FF0080"
                                            onClick={() => {
                                              setReqDeleteProcessing(true);
                                            }}
                                          />
                                        </Table.Cell>
                                      </Table.Row>
                                    );
                                  }
                                }
                              })
                            );
                          }
                        });
                      }
                    } else {
                      if (parent.hasOwnProperty("students")) {
                        return parent.students.map((student) => {
                          if (student.teacherId == user.staffNo) {
                            return (
                              tasksArray &&
                              tasksArray.map((task) => {
                                if (task.studentId == student.studentId) {
                                  if (task.hasOwnProperty("completedDate")) {
                                    return (
                                      <Table.Row key={task.taskId}>
                                        <Table.Cell
                                          component="th"
                                          scope="row"
                                        >
                                          {task.taskId}
                                        </Table.Cell>
                                        <Table.Cell align="left">
                                          {task.studentId}
                                        </Table.Cell>
                                        <Table.Cell align="left">
                                          {task.surahId}
                                        </Table.Cell>
                                        <Table.Cell align="left">
                                          {task.surahName}
                                        </Table.Cell>
                                        <Table.Cell align="left">
                                          {task.fromAya}
                                        </Table.Cell>
                                        <Table.Cell align="left">
                                          {task.toAya}
                                        </Table.Cell>
                                        <Table.Cell align="left">
                                          {task.type}
                                        </Table.Cell>
                                        <Table.Cell align="left">
                                          {task.dueDate}
                                        </Table.Cell>
                                        <Table.Cell align="left">
                                          {task.completedDate}
                                        </Table.Cell>
                                        <Table.Cell align="left">
                                          {task.masteryLevel}
                                        </Table.Cell>
                                        <Table.Cell align="left">
                                          {task.comment}
                                        </Table.Cell>
                                        <Table.Cell align="left">
                                          <EditIcon
                                            style={{ cursor: 'pointer' }}
                                            size={20} fill="#979797"
                                            onClick={() => {
                                              router.push(
                                                `halaqat/updateTask?taskId=${task.taskId
                                                }&studentId=${task.studentId
                                                }&surahId=${task.surahId
                                                }&surahName=${task.surahName
                                                }&fromAya=${task.fromAya
                                                }&toAya=${task.toAya}&type=${task.type
                                                }&dueDate=${task.dueDate
                                                }&completedDate=${task.completedDate
                                                  ? task.completedDate
                                                  : "pending"
                                                }&masteryLevel=${task.masteryLevel
                                                  ? task.masteryLevel
                                                  : "pending"
                                                }&comment=${task.comment
                                                  ? task.comment
                                                  : "pending"
                                                }&type=${task.type}`
                                              );
                                            }}
                                          />
                                          <DeleteIcon
                                            style={{ cursor: 'pointer' }}
                                            size={20} fill="#FF0080"
                                            onClick={() => {
                                              setReqDeleteProcessing(true);
                                            }}
                                          />
                                        </Table.Cell>
                                      </Table.Row>
                                    );
                                  }
                                }
                              })
                            );
                          }
                        });
                      }
                    }
                  })}
              </Table.Body>
            </Table>
            {/* </TableContainer> */}
          </div>
        </>
      );
    }
  } else {
    //parent
    return (
      <>
        <div>
          <FormControl
            sx={{ m: 1, minWidth: 120 }}
            focused={true}
            color={
              status == "All"
                ? "primary"
                : status == "Pending"
                  ? "warning"
                  : "success"
            }
          >
            <InputLabel id="demo-simple-select-error-label">status</InputLabel>
            <Select
              labelId="demo-simple-select-error-label"
              id="demo-simple-select-error"
              value={status}
              label="Status"
              onChange={handleStatusChange}
              renderValue={(value) => value}
            >
              <MenuItem value={"All"}>All</MenuItem>
              <MenuItem value={"Pending"}>Pending</MenuItem>
              <MenuItem value={"Completed"}>Completed</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div>
          {/* <TableContainer component={Paper}> */}
          <Table css={{
            height: "auto",
            minWidth: "100%",
          }} >
            <Table.Header >
              <Table.Column >TASKID</Table.Column>
              <Table.Column >STUDENTID</Table.Column>
              <Table.Column >SURAHID</Table.Column>
              <Table.Column >SURAHNAME</Table.Column>
              <Table.Column >FROMAYA</Table.Column>
              <Table.Column >TOAYA</Table.Column>
              <Table.Column >TYPE</Table.Column>
              <Table.Column >DUE</Table.Column>
              <Table.Column >COMPLETED</Table.Column>
              <Table.Column >LEVEL</Table.Column>
              <Table.Column >COMMENT</Table.Column>
            </Table.Header>
            <Table.Body>
              {parentsArray &&
                parentsArray.map((parent) => {
                  if (status == "All") {
                    if (parent.username == user.username) {
                      if (parent.hasOwnProperty("students")) {
                        return parent.students.map((student) => {
                          return (
                            tasksArray &&
                            tasksArray.map((task) => {
                              if (task.studentId == student.studentId) {
                                if (task.hasOwnProperty("completedDate")) {
                                  return (
                                    <Table.Row key={task.taskId}>
                                      <Table.Cell
                                        component="th"
                                        scope="row"
                                      >
                                        {task.taskId}
                                      </Table.Cell>
                                      <Table.Cell align="left">
                                        {task.studentId}
                                      </Table.Cell>
                                      <Table.Cell align="left">
                                        {task.surahId}
                                      </Table.Cell>
                                      <Table.Cell align="left">
                                        {task.surahName}
                                      </Table.Cell>
                                      <Table.Cell align="left">
                                        {task.fromAya}
                                      </Table.Cell>
                                      <Table.Cell align="left">
                                        {task.toAya}
                                      </Table.Cell>
                                      <Table.Cell align="left">
                                        {task.type}
                                      </Table.Cell>
                                      <Table.Cell align="left">
                                        {task.dueDate}
                                      </Table.Cell>
                                      <Table.Cell align="left">
                                        {task.completedDate}
                                      </Table.Cell>
                                      <Table.Cell align="left">
                                        {task.masteryLevel}
                                      </Table.Cell>
                                      <Table.Cell align="left">
                                        {task.comment}
                                      </Table.Cell>
                                    </Table.Row>
                                  );
                                } else {
                                  return (
                                    <Table.Row key={task.taskId}>
                                      <Table.Cell
                                        component="th"
                                        scope="row"
                                      >
                                        {task.taskId}
                                      </Table.Cell>
                                      <Table.Cell align="left">
                                        {task.studentId}
                                      </Table.Cell>
                                      <Table.Cell align="left">
                                        {task.surahId}
                                      </Table.Cell>
                                      <Table.Cell align="left">
                                        {task.surahName}
                                      </Table.Cell>
                                      <Table.Cell align="left">
                                        {task.fromAya}
                                      </Table.Cell>
                                      <Table.Cell align="left">
                                        {task.toAya}
                                      </Table.Cell>
                                      <Table.Cell align="left">
                                        {task.type}
                                      </Table.Cell>
                                      <Table.Cell align="left">
                                        {task.dueDate}
                                      </Table.Cell>
                                      <Table.Cell align="left">
                                        pending
                                      </Table.Cell>
                                      <Table.Cell align="left">
                                        pending
                                      </Table.Cell>
                                      <Table.Cell align="left">
                                        pending
                                      </Table.Cell>
                                    </Table.Row>
                                  );
                                }
                              }
                            })
                          );
                        });
                      }
                    }
                  } else if (status == "Pending") {
                    if (parent.username == user.username) {
                      if (parent.hasOwnProperty("students")) {
                        return parent.students.map((student) => {
                          return (
                            tasksArray &&
                            tasksArray.map((task) => {
                              if (task.studentId == student.studentId) {
                                if (!task.hasOwnProperty("completedDate")) {
                                  return (
                                    <Table.Row key={task.taskId}>
                                      <Table.Cell
                                      >
                                        {task.taskId}
                                      </Table.Cell>
                                      <Table.Cell align="left">
                                        {task.studentId}
                                      </Table.Cell>
                                      <Table.Cell align="left">
                                        {task.surahId}
                                      </Table.Cell>
                                      <Table.Cell align="left">
                                        {task.surahName}
                                      </Table.Cell>
                                      <Table.Cell align="left">
                                        {task.fromAya}
                                      </Table.Cell>
                                      <Table.Cell align="left">
                                        {task.toAya}
                                      </Table.Cell>
                                      <Table.Cell align="left">
                                        {task.type}
                                      </Table.Cell>
                                      <Table.Cell align="left">
                                        {task.dueDate}
                                      </Table.Cell>
                                      <Table.Cell align="left">
                                        pending
                                      </Table.Cell>
                                      <Table.Cell align="left">
                                        pending
                                      </Table.Cell>
                                      <Table.Cell align="left">
                                        pending
                                      </Table.Cell>
                                    </Table.Row>
                                  );
                                }
                              }
                            })
                          );
                        });
                      }
                    }
                  } else {
                    if (parent.username == user.username) {
                      if (parent.hasOwnProperty("students")) {
                        return parent.students.map((student) => {
                          return (
                            tasksArray &&
                            tasksArray.map((task) => {
                              if (task.studentId == student.studentId) {
                                if (task.hasOwnProperty("completedDate")) {
                                  return (
                                    <Table.Row key={task.taskId}>
                                      <Table.Cell
                                        component="th"
                                        scope="row"
                                      >
                                        {task.taskId}
                                      </Table.Cell>
                                      <Table.Cell align="left">
                                        {task.studentId}
                                      </Table.Cell>
                                      <Table.Cell align="left">
                                        {task.surahId}
                                      </Table.Cell>
                                      <Table.Cell align="left">
                                        {task.surahName}
                                      </Table.Cell>
                                      <Table.Cell align="left">
                                        {task.fromAya}
                                      </Table.Cell>
                                      <Table.Cell align="left">
                                        {task.toAya}
                                      </Table.Cell>
                                      <Table.Cell align="left">
                                        {task.type}
                                      </Table.Cell>
                                      <Table.Cell align="left">
                                        {task.dueDate}
                                      </Table.Cell>
                                      <Table.Cell align="left">
                                        {task.completedDate}
                                      </Table.Cell>
                                      <Table.Cell align="left">
                                        {task.masteryLevel}
                                      </Table.Cell>
                                      <Table.Cell align="left">
                                        {task.comment}
                                      </Table.Cell>
                                    </Table.Row>
                                  );
                                }
                              }
                            })
                          );
                        });
                      }
                    }
                  }
                })}
            </Table.Body>
          </Table>
          {/* </TableContainer> */}
        </div>
      </>
    );
  }
}
