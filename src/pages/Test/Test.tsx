import { useState } from "react";

import {
  getDownloadURL,
  uploadBytesResumable,
  ref,
  getStorage,
} from "firebase/storage";

import { db } from "../../firebase";
import { doc, setDoc } from "firebase/firestore";
import { useEffect } from "react";

function Test() {
  const [file, setFile] = useState<File | undefined>();

  const storage = getStorage();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = await getDownloadURL(
          ref(storage, "videos/file_example_MP4_480_1_5MG.mp4")
        );

        const video = document.querySelector<HTMLVideoElement>("video");

        if (!video) {
          console.log("error with query selector");
          return;
        }

        video.setAttribute("src", url);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const uploadToDatabase = async (url: string) => {
    let docData = {
      mostRecentUploadURL: url,
      username: "users",
    };
    const userRef = doc(db, "users", docData.username);

    try {
      await setDoc(userRef, docData, { merge: true });
      console.log("successfully updated DB");
    } catch (error) {
      console.log(`${error} error`);
    }
  };

  const handleClick = async () => {
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
      async () => {
        console.log("success!!");
        try {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          console.log(downloadURL);
          await uploadToDatabase(downloadURL);
        } catch (error) {
          console.error(error);
        }
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
      <video src="" width="800" height="400" controls />
    </div>
  );
}

export default Test;
