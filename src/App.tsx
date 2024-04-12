import "./styles/main.scss";
import { ref, uploadBytes, getDownloadURL, listAll } from "firebase/storage";
import { storage } from "./firebase";
import { FormEvent, useState } from "react";

import {
  Input,
  Button,
  Box,
  TextField,
  Card,
  CardMedia,
  CardContent,
  Typography,
} from "@mui/material";

const App = () => {
  const [recentUploadImg, setRecentUploadImg] = useState("");
  const [folderContents, setFolderContents] = useState<string[]>([]);

  const handleUploadSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const location = form.location;

    const input = form["image-upload"] as HTMLInputElement;

    if (!input.files) {
      alert("No files found :S");
      return;
    }

    const file = input.files[0];
    const fileRef = ref(storage, `${location.value}/${file.name}`);
    const fileUpload = await uploadBytes(fileRef, file);
    const fileDownloadURL = await getDownloadURL(fileUpload.ref);
    setRecentUploadImg(fileDownloadURL);
  };

  const handleLoadImages = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const location = form.location;
    const folderRef = ref(storage, `${location.value}`);
    try {
      const listResult = await listAll(folderRef);

      if (listResult.items.length == 0) {
        alert("No folder found");
        return;
      }

      const files = [];

      for (const item of listResult.items) {
        const downloadURL = await getDownloadURL(item);
        files.push(downloadURL);
      }

      setFolderContents(files);
    } catch (error) {
      console.error("Error listing files:", error);
    }
  };

  return (
    <Box maxWidth={600} mx="auto" p={5}>
      {recentUploadImg && (
        <Box mb={2}>
          <Card>
            <CardContent>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                color="primary"
              >
                Recently uploaded
              </Typography>
            </CardContent>
            <CardMedia
              component="img"
              height="140"
              image={recentUploadImg}
              alt="Uploaded Image"
            />
          </Card>
        </Box>
      )}

      <Card
        component="form"
        onSubmit={handleUploadSubmit}
        sx={{
          padding: 2,
          marginBottom: 2,
          "& .MuiTextField-root": {
            marginBottom: 2,
            width: "100%",
          },
          "& .MuiInputBase-input[type='file']": { display: "none" },
        }}
      >
        <TextField
          required={true}
          id="location"
          label="Storage Location"
          defaultValue="images"
          fullWidth
        />
        <label htmlFor="image-upload">
          <Input
            id="image-upload"
            name="image-upload"
            type="file"
            required={true}
            inputProps={{ accept: "image/png, image/jpeg" }}
          />
          <Button variant="contained" component="span" color="primary">
            Upload Image
          </Button>
        </label>
        <Box mt={2}>
          <Button type="submit" variant="contained" color="primary">
            Upload
          </Button>
        </Box>
      </Card>

      <Card
        component="form"
        onSubmit={handleLoadImages}
        sx={{
          padding: 2,
          "& .MuiTextField-root": {
            marginBottom: 2,
            width: "100%",
          },
          "& .MuiInputBase-input[type='file']": { display: "none" },
        }}
      >
        <TextField
          required={true}
          id="location"
          label="Storage Location"
          defaultValue="images"
          fullWidth
        />

        <Box mt={2}>
          <Button type="submit" variant="contained" color="primary">
            Load images
          </Button>
          {folderContents.length > 0 &&
            folderContents.map((url) => (
              <Box m={2} key={url}>
                <Card>
                  <CardMedia
                    component="img"
                    height="140"
                    image={url}
                    alt="Uploaded Image"
                  />
                </Card>
              </Box>
            ))}
        </Box>
      </Card>
    </Box>
  );
};

export default App;
