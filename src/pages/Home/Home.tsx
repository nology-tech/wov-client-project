import Layout from "../../components/Layout/Layout";
import ActiveTasks from "../ActiveTasks/ActiveTasks";

const Home = () => {
  return (
    <Layout>
      {/* <h1>Page Heading</h1>
      <h2>Section Heading</h2>
      <h3>Panel Heading</h3> */}
      <ActiveTasks />
    </Layout>
  );
};

export default Home;
