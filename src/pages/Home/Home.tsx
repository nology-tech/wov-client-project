import Layout from "../../components/Layout/Layout";
import CompletedTask from "../../components/CompletedTask/CompletedTask";

const Home = () => {
  return (
    <Layout>
      <h1>Page Heading</h1>
      <h2>Section Heading</h2>
      <h3>Panel Heading</h3>
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Non error
        dolor in nostrum minima odio a fuga saepe soluta adipisci perspiciatis
        maxime tempora, temporibus beatae voluptas repellat rerum. Dignissimos,
        necessitatibus.
      </p>
      <CompletedTask
        taskHeading={"Run 5k"}
        category={"Fitness"}
        points={0}
        description={"Run as fast as you can"}
        image={
          "https://img.freepik.com/premium-photo/running-man-silhouette-sunset-time-sport-active-life-concept_221513-1606.jpg"
        }
      />
    </Layout>
  );
};

export default Home;
