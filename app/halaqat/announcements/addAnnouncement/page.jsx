"use client";
import styles from "./page.module.css";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();


  const [title, setTitle] = useState("");
  const [announcement, setAnnouncement] = useState("");
  const [reqProcessing, setReqProcessing] = useState(false);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleAnnouncementChange = (event) => {
    setAnnouncement(event.target.value);
  };

  const addAnnouncement = (window) => {
    window.fetch('/api/announcements', {
      method: "POST",
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        title,
        announcement
      })
    })
    .then(res => res.json())
    .then(data => console.log(data))
    .then(() => {
      setReqProcessing(false)
      router.back()
    })
  }

  useEffect(() => {
    if (reqProcessing === true) {
      addAnnouncement(window)
    }
  }, [reqProcessing])


  return (
    <>
      <div style={styles.form}>
        <div>
          <TextField
            id="outlined-basic"
            label="Title"
            variant="outlined"
            value={title}
            onChange={handleTitleChange}
          />
        </div>
        <div>
          <TextField
            value={announcement}
            onChange={handleAnnouncementChange}
            fullWidth
            id="outlined-multiline-static"
            label="write an announcement..."
            multiline
            rows={10}
          />
        </div>
        <div>
          <Button variant="contained" onClick={() => setReqProcessing(true)}>Submit</Button>
        </div>
      </div>
    </>
  );
}
