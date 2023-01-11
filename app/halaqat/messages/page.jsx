"use client";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import styles from "./page.module.css";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
// import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useRouter, useSearchParams } from "next/navigation";
import { Input, Row, Container, Card, Spacer, Textarea, Text } from "@nextui-org/react";
import { EditIcon } from "../EditIcon";
import { DeleteIcon } from "../DeleteIcon";
export default function Home() {
  const [reqProcessing, setReqProcessing] = useState(false);
  const [reqDeleteProcessing, setReqDeleteProcessing] = useState(false);

  const [selectedId, setSelectedId] = useState("");

  const user =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("logged in user"))
      : null;
  const [parentsArray, setParentsArray] = useState([]);
  const [teachersArray, setTeachersArray] = useState([]);
  const [studentId, setStudentId] = useState(null);
  const [studentName, setStudentName] = useState("All");
  const [message, setMessage] = useState("");
  const [title, setTitle] = useState("");
  const [messagesArray, setMessagesArray] = useState([]);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    getParentsData();
    getTeachersData();
    getMessagesData();
  }, []);

  useEffect(() => {
    if (reqProcessing === true) {
      addMessage(window);
    }
  }, [reqProcessing]);

  const deleteMessage = (messageId) => {
    console.log(messageId);
    console.log(typeof messageId);

    fetch(`/api/messages`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        id: messageId,
      }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .then(() => {
        getMessagesData();
      });
  };

  const addMessage = (window) => {
    window
      .fetch("/api/messages", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          teacherId: user.staffNo,
          studentId: studentId,
          title,
          message,
        }),
      })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .then(() => {
        setReqProcessing(false);
        getMessagesData();
      });
  };

  async function getMessagesData() {
    const res = await fetch("/api/messages");
    const messages = JSON.parse(await res.json());
    setMessagesArray(messages);
  }

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
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const handleStudentFromMenuNameChange = (event) => {
    const {
      target: { value },
    } = event;
    setStudentId(typeof value === "string" ? value.split(",") : value);
  };

  const handleStudentNameChange = (event) => {
    setStudentName(event.target.value);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  return (
    //teacher
    <>
      <div className={styles.form}>
        {!user.isCoordinator && user.staffNo && (
          <div>
            <div>
              <h2>Post new Message:</h2>
            </div>
            <div>
              <FormControl sx={{ m: 1, width: 150 }}>
                <InputLabel id="demo-multiple-name-label">
                  Student Name:
                </InputLabel>
                <Select
                  labelId="demo-multiple-name-label"
                  id="demo-multiple-name"
                  fullWidth
                  value={studentId}
                  onChange={handleStudentFromMenuNameChange}
                  input={<OutlinedInput label="Student Name:" />}
                  MenuProps={MenuProps}
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
            </div>
            <div>
              <Box
                component="form"
                sx={{
                  "& > :not(style)": { m: 1, width: "100ch" },
                }}
                noValidate
                autoComplete="off"
              >
                <div>
                  <TextField
                    id="outlined-multiline-static"
                    label="Title"
                    value={title}
                    onChange={handleTitleChange}
                  />
                </div>

                <TextField
                  fullWidth
                  id="outlined-multiline-static"
                  label="write a message..."
                  multiline
                  rows={10}
                  value={message}
                  onChange={handleMessageChange}
                />
              </Box>
            </div>
            <Button
              onClick={() => setReqProcessing(true)}
              variant="contained"
              endIcon={<SendIcon />}
            >
              Send
            </Button>
          </div>
        )}
      </div>
      {!user.isCoordinator &&
        user.staffNo && ( //get messages for teacher with update/delete
          <div>
            <div>
              <h2>Messages:</h2>
            </div>
            <div>
              <FormControl sx={{ m: 1, width: 150 }}>
                <InputLabel id="demo-multiple-name-label">
                  Student Name:
                </InputLabel>
                <Select
                  labelId="demo-multiple-name-label"
                  id="demo-multiple-name"
                  fullWidth
                  value={studentName}
                  onChange={handleStudentNameChange}
                  input={<OutlinedInput label="Student Name:" />}
                >
                  <MenuItem value="All">All</MenuItem>
                  {parentsArray &&
                    parentsArray.map((parent) => {
                      return parent.students.map((student) => {
                        if (student.teacherId == user.staffNo) {
                          return (
                            <MenuItem value={student.studentId}>
                              {student.firstName}
                              {student.lastName}
                            </MenuItem>
                          );
                        }
                      });
                    })}
                </Select>
              </FormControl>
            </div>
            {studentName == "All" &&
              messagesArray &&
              messagesArray.map((message) => {
                return (
                  <div>
                    <Container>
                      <Card css={{ $$cardColor: '$colors$gradient', marginTop: '3%' }}>

                        <Card.Body style={{ margin: '2% 0' }}>
                          <Text h1 size={17}>{message.title} </Text>
                          <Text h5 size={15}>{message.message} </Text>
                          <Text h6 size={12}>{message.date} </Text>
                          <Row justify="space-evenly" align="start">

                            <EditIcon
                              style={{ cursor: 'pointer' }}
                              size={40} fill="#979797"
                              onClick={() => {
                                router.push(
                                  `/halaqat/updateMessage?messageId=${message.messageId}&title=${message.title}&message=${message.message}`
                                );
                              }}

                            />
                            <DeleteIcon
                              style={{ cursor: 'pointer' }}
                              size={40} fill="#FF0080"
                              onClick={() => {
                                deleteMessage(message.messageId);

                              }}
                            />
                          </Row>

                        </Card.Body>

                      </Card>
                    </Container>
                    {/* <Card sx={{ minWidth: 275 }}>
                      <CardContent>
                        <Typography
                          sx={{ fontSize: 14 }}
                          color="text.secondary"
                          gutterBottom
                        >
                          {message.title}
                        </Typography>
                        <Typography variant="body2">{message.date}</Typography>
                        <Typography variant="body2">
                          {message.message}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button
                          onClick={() => {
                            router.push(
                              `/halaqat/updateMessage?messageId=${message.messageId}&title=${message.title}&message=${message.message}`
                            );
                          }}
                          size="small"
                        >
                          Update
                        </Button>
                        <Button
                          onClick={() => {
                            deleteMessage(message.messageId);
                          }}
                          size="small"
                        >
                          Delete
                        </Button>
                      </CardActions>
                    </Card> */}
                  </div>
                );
              })}
            {studentName != "All" &&
              studentName != null &&
              messagesArray &&
              messagesArray.map((message) => {
                if (message.studentId == studentName) {
                  return (
                    <div>
                      <Container>
                        <Card css={{ $$cardColor: '$colors$gradient', marginTop: '3%' }}>

                          <Card.Body style={{ margin: '2% 0' }}>
                            <Text h1 size={17}>{message.title} </Text>
                            <Text h5 size={15}>{message.message} </Text>
                            <Text h6 size={12}>{message.date} </Text>
                            <Row justify="space-evenly" align="start">

                              <EditIcon
                                style={{ cursor: 'pointer' }}
                                size={40} fill="#979797"
                                onClick={() => {
                                  router.push(
                                    `/halaqat/announcements/updateAnnouncement?announcementId=${announcement.announcementId}&title=${announcement.title}&announcement=${announcement.announcement}`
                                  );
                                }}

                              />
                              <DeleteIcon
                                style={{ cursor: 'pointer' }}
                                size={40} fill="#FF0080"
                                onClick={() => {
                                  setSelectedId(announcement.announcementId);
                                  setReqProcessing(true)
                                }}
                              />
                            </Row>

                          </Card.Body>

                        </Card>
                      </Container>
                      {/* <Card sx={{ minWidth: 275 }}>
                        <CardContent>
                          <Typography
                            sx={{ fontSize: 14 }}
                            color="text.secondary"
                            gutterBottom
                          >
                            {message.title}
                          </Typography>
                          <Typography variant="body2">
                            {message.date}
                          </Typography>
                          <Typography variant="body2">
                            {message.message}
                          </Typography>
                        </CardContent>
                        <CardActions>
                          <Button
                            onClick={() => {
                              router.push(
                                `/halaqat/updateMessage?title=${message.title}&message=${message.message}`
                              );
                            }}
                            size="small"
                          >
                            Update
                          </Button>
                          <Button
                            onClick={() => {
                              deleteMessage(message.messageId);
                            }}
                            size="small"
                          >
                            Delete
                          </Button>
                        </CardActions>
                      </Card> */}
                    </div>
                  );
                }
              })}
          </div>
        )}
      {user.isCoordinator && (
        //get messages for coordinator for all students
        <div>
          <div>
            <FormControl sx={{ m: 1, width: 150 }}>
              <InputLabel id="demo-multiple-name-label">
                Student Name:
              </InputLabel>
              <Select
                labelId="demo-multiple-name-label"
                id="demo-multiple-name"
                fullWidth
                value={studentName}
                onChange={handleStudentNameChange}
                input={<OutlinedInput label="Student Name:" />}
              >
                <MenuItem value="All">All</MenuItem>
                {parentsArray &&
                  parentsArray.map((parent) => {
                    return parent.students.map((student) => {
                      return (
                        <MenuItem value={student.studentId}>
                          {student.firstName}
                          {student.lastName}
                        </MenuItem>
                      );
                    });
                  })}
              </Select>
            </FormControl>
          </div>
          {studentName == "All" &&
            messagesArray &&
            messagesArray.map((message) => {
              return (
                <div>

                  <Container>
                    <Card css={{ $$cardColor: '$colors$gradient', marginTop: '3%' }}>

                      <Card.Body style={{ margin: '2% 0' }}>
                        <Text h1 size={17}>{message.title} </Text>
                        <Text h5 size={15}>{message.message} </Text>
                        <Text h6 size={12}>{message.date} </Text>

                      </Card.Body>

                    </Card>
                  </Container>
                  {/* <Card sx={{ minWidth: 275 }}>
                    <CardContent>
                      <Typography
                        sx={{ fontSize: 14 }}
                        color="text.secondary"
                        gutterBottom
                      >
                        {message.title}
                      </Typography>
                      <Typography variant="body2">{message.date}</Typography>
                      <Typography variant="body2">{message.message}</Typography>
                    </CardContent>
                  </Card> */}
                </div>
              );
            })}
          {studentName != "All" &&
            studentName != null &&
            messagesArray &&
            messagesArray.map((message) => {
              if (message.studentId == studentName) {
                return (
                  <div>

                    <Container>
                      <Card css={{ $$cardColor: '$colors$gradient', marginTop: '3%' }}>

                        <Card.Body style={{ margin: '2% 0' }}>
                          <Text h1 size={17}>{message.title} </Text>
                          <Text h5 size={15}>{message.message} </Text>
                          <Text h6 size={12}>{message.date} </Text>

                        </Card.Body>

                      </Card>
                    </Container>
                  </div>
                );
              }
            })}
        </div>
      )}
      {user.qatariId && (
        //get messages for parent of their students
        <div>
          <div>
            <FormControl sx={{ m: 1, width: 150 }}>
              <InputLabel id="demo-multiple-name-label">
                Student Name:
              </InputLabel>
              <Select
                labelId="demo-multiple-name-label"
                id="demo-multiple-name"
                fullWidth
                value={studentName}
                onChange={handleStudentNameChange}
                input={<OutlinedInput label="Student Name:" />}
              >
                <MenuItem value="All">All</MenuItem>
                {parentsArray &&
                  parentsArray.map((parent) => {
                    if (user.qatariId == parent.qatariId) {
                      return parent.students.map((student) => {
                        return (
                          <MenuItem value={student.studentId}>
                            {student.firstName}
                            {student.lastName}
                          </MenuItem>
                        );
                      });
                    }
                  })}
              </Select>
            </FormControl>
          </div>
          {studentName == "All" &&
            messagesArray &&
            messagesArray.map((message) => {
              return (
                <div>
                  <Card sx={{ minWidth: 275 }}>
                    <CardContent>
                      <Typography
                        sx={{ fontSize: 14 }}
                        color="text.secondary"
                        gutterBottom
                      >
                        {message.title}
                      </Typography>
                      <Typography variant="body2">{message.date}</Typography>
                      <Typography variant="body2">{message.message}</Typography>
                    </CardContent>
                  </Card>
                </div>
              );
            })}
          {studentName != "All" &&
            studentName != null &&
            messagesArray &&
            messagesArray.map((message) => {
              if (message.studentId == studentName) {
                return (
                  <div>
                    <Card sx={{ minWidth: 275 }}>
                      <CardContent>
                        <Typography
                          sx={{ fontSize: 14 }}
                          color="text.secondary"
                          gutterBottom
                        >
                          {message.title}
                        </Typography>
                        <Typography variant="body2">{message.date}</Typography>
                        <Typography variant="body2">
                          {message.message}
                        </Typography>
                      </CardContent>
                    </Card>
                  </div>
                );
              }
            })}
        </div>
      )}
    </>
  );
}
