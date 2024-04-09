import Layout from "../../components/Layout/Layout";
import Navigation from "../../components/Navigation/Navigation";

const Home = () => {
  return (
    <Layout>
      <h1>Page Heading</h1>
      <h2>Section Heading</h2>
      <h3>Panel Heading</h3>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis
        ducimus maiores vitae enim sequi dignissimos, suscipit temporibus
        voluptatum eius recusandae molestias cum quod quam necessitatibus quidem
        quibusdam dolorem? Porro, dolore!{" "}
      </p>
      <Navigation />
    </Layout>
  );
};

export default Home;
