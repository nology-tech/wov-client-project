import { useState } from "react";

import { getDownloadURL, uploadBytesResumable, ref } from "firebase/storage";
import { storage, db } from "../../firebase";
import { doc, setDoc } from "firebase/firestore";

function Test() {
  const [file, setFile] = useState<File | undefined>();

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
    </div>
  );
}

export default Test;
