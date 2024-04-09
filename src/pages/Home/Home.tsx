import Layout from "../../components/Layout/Layout";
import Header from "../../components/Header/Header";
import HeaderHome from "../../components/HeaderHome/HeaderHome";

const Home = () => {
  return (
    <Layout>
      <Header title="WAY OF THE VIKING" subtitle="test2" image="https://www.freeiconspng.com/thumbs/profile-icon-png/profile-icon-9.png" />
      <HeaderHome/>
      <h2>Section Heading</h2>
      <h3>Panel Heading</h3>
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Non error
        dolor in nostrum minima odio a fuga saepe soluta adipisci perspiciatis
        maxime tempora, temporibus beatae voluptas repellat rerum. Dignissimos,
        necessitatibus.
      </p>
    </Layout>
  );
};

export default Home;
