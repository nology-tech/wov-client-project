import Layout from "../../components/Layout/Layout";
import Profile from "../Profile/Profile";
import { randomUserProfiles } from "../Profile/mockData";

const Home = () => {
  return (
    <Layout>
      <Profile user={randomUserProfiles[0]} />
    </Layout>
  );
};

export default Home;
