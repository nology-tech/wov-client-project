import Layout from "../../components/Layout/Layout";
import Navigation from "../../components/Navigation/Navigation";
import Profile from "../Profile/Profile";

const Home = () => {
  return (
    <Layout>
      <Profile />
      <Navigation navActionIndex={0} />
    </Layout>
  );
};

export default Home;
