"use client";
import { useState, useEffect } from "react";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell, { tableCellClasses } from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
// import Paper from "@mui/material/Paper";
// import { styled } from "@mui/material/styles";
import BorderColorIcon from "@mui/icons-material/BorderColor";
// import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { useRouter } from "next/navigation";
import { Loading, Grid } from "@nextui-org/react";
import { Table, Tooltip, Button } from '@nextui-org/react';
// import { IconButton } from "./components/IconButton";
import { DeleteIcon } from "./components/IconButton";
import { EditIcon } from "./EditIcon"
export default function Home() {
  const router = useRouter();


  const user =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("logged in user"))
      : null;
  const [parentsArray, setParentsArray] = useState([]);

  useEffect(() => {
    if (!user.isCoordinator)
      router.push("halaqat/tasks");

  }, [])

  // const StyledTableCell = styled(TableCell)(({ theme }) => ({
  //   [`&.${tableCellClasses.head}`]: {
  //     backgroundColor: theme.palette.common.black,
  //     color: theme.palette.common.white,
  //   },
  //   [`&.${tableCellClasses.body}`]: {
  //     fontSize: 14,
  //   },
  // }));

  // const StyledTableRow = styled(TableRow)(({ theme }) => ({
  //   "&:nth-of-type(odd)": {
  //     backgroundColor: theme.palette.action.hover,
  //   },
  //   // hide last border
  //   "&:last-child td, &:last-child th": {
  //     border: 0,
  //   },
  // }));

  async function getParentsData() {
    const res = await fetch("/api/parents");
    const parents = JSON.parse(await res.json());
    setParentsArray(parents);
  }

  useEffect(() => {
    getParentsData();
  }, []);

  if (user && user.isCoordinator) {
    return (
      <>

        <div>
          <Button style={{ marginLeft: '10px', marginTop: '1%' }} onClick={() => {
            router.push("halaqat/addStudent");
          }} color="success">
            Add Students
          </Button>
          <Table
            css={{
              height: "auto",
              minWidth: "100%",
            }}
          >
            <Table.Header >
              <Table.Column >STUDENTID</Table.Column>
              <Table.Column >FIRSTNAME</Table.Column>
              <Table.Column >LASTNAME</Table.Column>
              <Table.Column >DOB</Table.Column>
              <Table.Column >GENDER</Table.Column>
              <Table.Column >SCHOOLGRADE</Table.Column>
              <Table.Column >TEACHERID</Table.Column>
              <Table.Column >ACTION</Table.Column>
            </Table.Header>
            <Table.Body >
              {parentsArray &&
                parentsArray.map((parent) => {
                  if (parent.hasOwnProperty("students")) {
                    return parent.students.map((student) => {

                      return (
                        <Table.Row key={student.studentId}>
                          <Table.Cell>{student.studentId}</Table.Cell>
                          <Table.Cell>{student.firstName}</Table.Cell>
                          <Table.Cell>{student.lastName}</Table.Cell>
                          <Table.Cell>{student.dob}</Table.Cell>
                          <Table.Cell>{student.gender}</Table.Cell>
                          <Table.Cell>{student.schoolGrade}</Table.Cell>
                          <Table.Cell> {student.teacherId}</Table.Cell>
                          <Table.Cell>

                            <Tooltip
                              content="Edit"
                              color="error"
                              onClick={() => {
                                router.push(
                                  `halaqat/updateStudent?studentId=${student.studentId}&&firstName=${student.firstName}&&lastName=${student.lastName}&&dob=${student.dob}&&gender=${student.gender}&&schoolGrade=${student.schoolGrade}&&teacherId=${student.teacherId}`
                                );
                              }}
                            >
                              <IconButton>
                                <EditIcon size={20} fill="#FF0080" />
                              </IconButton>
                            </Tooltip>
                          </Table.Cell>
                        </Table.Row>
                      );
                    });
                  }
                })}
            </Table.Body>
          </Table>

        </div>

        {/* <div>
          <h2>Students List</h2>
          <div>
            <Button
              onClick={() => {
                router.push("halaqat/addStudent");
              }}
              variant="contained"
              color="success"
            >
              + Add Student
            </Button>
          </div>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="left">studentId</StyledTableCell>
                  <StyledTableCell align="left">firstName</StyledTableCell>
                  <StyledTableCell align="left">lastName</StyledTableCell>
                  <StyledTableCell align="left">dob</StyledTableCell>
                  <StyledTableCell align="left">gender</StyledTableCell>
                  <StyledTableCell align="left">schoolGrade</StyledTableCell>
                  <StyledTableCell align="left">teacherId</StyledTableCell>
                  <StyledTableCell align="left">Actions</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {parentsArray &&
                  parentsArray.map((parent) => {
                    if (parent.hasOwnProperty("students")) {
                      return parent.students.map((student) => {

                        return (

                          <StyledTableRow key={student.studentId}>
                            <StyledTableCell component="th" scope="row">
                              {student.studentId}
                            </StyledTableCell>
                            <StyledTableCell align="left">
                              {student.firstName}
                            </StyledTableCell>
                            <StyledTableCell align="left">
                              {student.lastName}
                            </StyledTableCell>
                            <StyledTableCell align="left">
                              {student.dob}
                            </StyledTableCell>
                            <StyledTableCell align="left">
                              {student.gender}
                            </StyledTableCell>
                            <StyledTableCell align="left">
                              {student.schoolGrade}
                            </StyledTableCell>
                            <StyledTableCell align="left">
                              {student.teacherId}
                            </StyledTableCell>
                            <StyledTableCell align="left">
                              <IconButton
                                onClick={() => {
                                  router.push(
                                    `halaqat/updateStudent?studentId=${student.studentId}&&firstName=${student.firstName}&&lastName=${student.lastName}&&dob=${student.dob}&&gender=${student.gender}&&schoolGrade=${student.schoolGrade}&&teacherId=${student.teacherId}`
                                  );
                                }}
                                aria-label="edit"
                              >
                                <BorderColorIcon />
                              </IconButton>
                            </StyledTableCell>
                          </StyledTableRow>
                        );
                      });
                    }
                  })}
              </TableBody>
            </Table>
          </TableContainer>
        </div> */}

      </>
    );
  }
}
