import { useState } from "react";

import {
  getDownloadURL,
  uploadBytesResumable,
  ref,
  getStorage,
} from "firebase/storage";

import { db } from "../../firebase";
import { doc, setDoc } from "firebase/firestore";

import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

function Test() {
  const [file, setFile] = useState<File | undefined>();

  const storage = getStorage();
  let videoSrc = "";
  getDownloadURL(ref(storage, "videos/rabbit320.webm"))
    .then((url) => {
      // `url` is the download URL for 'videos/rabbit320.webm'

      //   // This can be downloaded directly:
      //   const xhr = new XMLHttpRequest();
      //   xhr.responseType = "blob";
      //   xhr.onload = (event) => {
      //     const blob = xhr.response;
      //   };
      //   xhr.open("GET", url);
      //   xhr.send();

      // Or inserted into an <img> element
      //const img = document.getElementById("video");
      //video.setAttribute("src", url);

      // save to videoSrc
      videoSrc = url;
    })
    .catch((error) => {
      // Handle any errors
      console.log(error);
    });

  const uploadToDatabase = (url: string) => {
    let docData = {
      mostRecentUploadURL: url,
      username: "jasondubon",
    };
    const userRef = doc(db, "users", docData.username);
    setDoc(userRef, docData, { merge: true })
      .then(() => {
        console.log("successfully updated DB");
      })
      .catch((error) => {
        console.log(`${error} error`);
      });
  };

  const handleClick = () => {
    if (typeof file === "undefined") return;
    const fileRef = ref(storage, `videos/${file.name}`);
    const uploadTask = uploadBytesResumable(fileRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(progress);
      },
      (error) => {
        console.log(`${error} error`);
      },
      () => {
        console.log("success!!");
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          uploadToDatabase(downloadURL);
          console.log(downloadURL);
        });
      }
    );
  };

  const handleOnChange = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement & {
      files: FileList;
    };
    console.log("target", target.files);
    setFile(target.files[0]);
  };

  return (
    <div>
      <input type="file" name="video" onChange={handleOnChange} />
      <button onClick={() => handleClick()}>Upload Button</button>
      <video src={videoSrc} width="800" height="400" controls />
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          sx={{ height: 140 }}
          image="/static/images/cards/contemplative-reptile.jpg"
          title="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Lizard
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Share</Button>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>
    </div>
  );
}

export default Test;
