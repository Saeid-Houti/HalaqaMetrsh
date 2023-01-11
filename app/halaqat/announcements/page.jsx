"use client";
import styles from "./page.module.css";
import { useState, useEffect } from "react";
// import Button from "@mui/material/Button";
import { Button } from '@nextui-org/react';
import Box from "@mui/material/Box";
// import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/navigation";
import { FormControl, MenuItem, Select } from "@mui/material";
import { EditIcon } from "../EditIcon";
import { DeleteIcon } from "../DeleteIcon"
import { Input, Row, Container, Card, Spacer, Textarea, Text } from "@nextui-org/react";


export default function Home() {
  const [announcementsArray, setAnnouncementsArray] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [reqProcessing, setReqProcessing] = useState(false)

  const router = useRouter();
  const user =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("logged in user"))
      : null;
  async function getAnnouncementsData() {
    const res = await fetch("/api/announcements");
    const announcements = JSON.parse(await res.json());
    setAnnouncementsArray(announcements);
  }

  const deleteAnnouncement = (window) => {
    window.fetch(`/api/announcements?announcementId=${selectedId}`, { method: "DELETE" })
      .then(res => res.json())
      .then(data => console.log(data))
      .then(() => {
        setReqProcessing(false)
        setSelectedId(null)
        getAnnouncementsData()
      })
  }

  useEffect(() => {
    if (reqProcessing === true) {
      deleteAnnouncement(window)
    }
  }, [reqProcessing])
  useEffect(() => {
    getAnnouncementsData();
  }, []);
  return (
    <>
      <div className={styles.container}>
        {user.isCoordinator && (
          <div>
            <Button
              color="gradient"
              onClick={() => {
                router.push("/halaqat/announcements/addAnnouncement");
              }}
              variant="contained"
            >
              Add Announcement
            </Button>
          </div>
        )}
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <Select
            inputProps={{ 'aria-label': 'Without label' }}
          >
            <MenuItem value={30} selected>Last 30 Days</MenuItem>
            <MenuItem value={60}>Last 60 Days</MenuItem>
            <MenuItem value={90}>Last 90 Days</MenuItem>
          </Select>
        </FormControl>
        {
          announcementsArray &&
          announcementsArray.map((announcement) => {
            return (
              <div>


                <Container>
                  <Card css={{ $$cardColor: '$colors$gradient', marginTop: '3%' }}>

                    <Card.Body style={{ margin: '2% 0' }}>
                      <Text h1 size={17}>{announcement.title} </Text>
                      <Text h5 size={15}>{announcement.announcement} </Text>
                      <Text h6 size={12}>{announcement.date} </Text>
                      {user.isCoordinator &&
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
                      }
                    </Card.Body>

                  </Card>
                </Container>

              </div>
            );
          })}
      </div>
    </>
  );
}
