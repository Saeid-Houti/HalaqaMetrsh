"use client";
import styles from "./page.module.css";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [title, setTitle] = useState(searchParams.get("title"));
  const [message, setMessage] = useState(searchParams.get("message"));
  const [reqProcessing, setReqProcessing] = useState(false);

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  useEffect(() => {
    if (reqProcessing === true) {
      updateAnnouncement(window);
    }
  }, [reqProcessing]);

  const updateAnnouncement = (window) => {
    window
      .fetch("/api/messages", {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          messageId: searchParams.get("messageId"),
          title,
          message,
        }),
      })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .then(() => {
        setReqProcessing(false);
        router.back();
      });
  };
  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };
  return (
    <>
      <div>
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
            value={message}
            onChange={handleMessageChange}
            fullWidth
            id="outlined-multiline-static"
            label="write a message..."
            multiline
            rows={10}
          />
        </div>
        <div>
          <Button onClick={() => setReqProcessing(true)} variant="contained">
            Submit
          </Button>
        </div>
      </div>
    </>
  );
}
