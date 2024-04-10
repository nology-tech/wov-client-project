import Layout from "../../components/Layout/Layout";
import Account from "../../components/Account/Account";
import Register from "../../components/Register/Register";
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
      <Account />
      <Register />
    </Layout>
  );
};

export default Home;
