import Layout from "../../components/Layout/Layout";
import Profile from "../Profile/Profile";
import { randomUserProfiles } from "../Profile/mockData";

const Home = () => {
  return (
    <Layout>
      {/* <h1>Page Heading</h1>
      <h2>Section Heading</h2>
      <h3>Panel Heading</h3> */}
      <Profile user={randomUserProfiles[0]} />
    </Layout>
  );
};

export default Home;
