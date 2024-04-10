import Layout from "../../components/Layout/Layout";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { app } from "../../firebase";
import { FormEvent, useState } from "react";

const storage = getStorage(app);

const Home = () => {
  // Create a root reference
  const [imgPath, setImg] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const input = form[0] as HTMLInputElement;
    const fileRef = ref(storage, "Test");

    if (input.files == null) {
      return;
    }
    uploadBytes(fileRef, input.files[0]).then((upload) => {
      getDownloadURL(upload.ref).then((url) => {
        setImg(url);
      });
    });
  };

  return (
    <Layout>
      {imgPath && <img src={imgPath} />}
      <form action="" onSubmit={handleSubmit}>
        <input type="file" name="" id="" />
        <button type="submit">submit</button>
      </form>
    </Layout>
  );
};

export default Home;
