"use client";
import styles from "./page.module.css";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [reqProcessing, setReqProcessing] = useState(false)
  const [title, setTitle] = useState(searchParams.get("title"));
  const [announcement, setAnnouncement] = useState(
    searchParams.get("announcement")
  );

  const updateAnnouncement = (window) => {
    window.fetch('/api/announcements', {
      method: "PUT",
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        announcementId: searchParams.get('announcementId'),
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
      updateAnnouncement(window)
    }
  }, [reqProcessing])

  return (
    <>
      <div style={styles.form}>
        <div>
          <TextField
            id="outlined-basic"
            label="Update Title"
            variant="outlined"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
        </div>
        <div>
          <TextField
            value={announcement}
            onChange={e => setAnnouncement(e.target.value)}
            fullWidth
            id="outlined-multiline-static"
            label="Update announcement..."
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
