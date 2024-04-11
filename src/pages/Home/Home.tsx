import Layout from "../../components/Layout/Layout";
import Header from "../../components/Header/Header";
import HeaderHome from "../../components/HeaderHome/HeaderHome";
import Button from "../../components/Button/Button";
import { Link } from "react-router-dom";
import "./Home.scss";

const Home = () => {
  // "today" shows current day, only used in the Home page.
  const today = new Date(),
    date =
      today.getDate() +
      " " +
      today.toLocaleString("default", { month: "long" }) +
      " " +
      today.getFullYear();

  return (
    <Layout>
      <Header subtitle="Home" />
      <HeaderHome
        date={date}
        location="Malvern Hills"
        image="https://s3-alpha-sig.figma.com/img/9003/31aa/6dd32f49cc5bf6f29932b0481a2af856?Expires=1713744000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=FrjVJj2XFAnoifxYaGoHI0CfbBKprDFMJqDeV1ur21HRwi~j1ZYNRCW-3LPZchYU-brnUydqEOyJ8eUfwA9nB6ATjPomas0~pIPizR9gu2Je79kN9EP1pmgZjI3K6aKUXz7IoMgEErOcHxjXyt42pBlu1Ym8~HfjFPcrLW1igtrvA6JO9y997SJDeldC1ENK0Y8myy9wViW54XoUX1ripSdMlgX9NG2pa--C1P1eafFfIzyQyWrB-Uz8e9eWq0va0JvsDInxsaRT1wOvxHVAxGc~nyK5VJwcSVlplUeTEEL~fMMPrn31K8dbJHlxd0bGEGobas-1vWFzvzv~01QwUw__"
      />
      <div className="daily-tasks">
        <div className="daily-tasks__button">
          <Link to="/daily-tasks">
            <Button label="VIEW TODAY's TASKS" variant="primary"></Button>
          </Link>
        </div>
        <h2 className="daily-tasks__header">
          Welcome to the home page for your 10 week Way of the Viking adventure
        </h2>
        <p className="daily-tasks__paragraph">
          Made by the people for the people. A local studio tour of local makers
          around the area of bristol. Come see the workshops where the magic
          happ Stop for a quick sketch and pot of tea and pastry from the
          pottery studio. Make something from the local craft shop. Explore the
          amazing works of art from a number of craft artists. Make it yourself
          from ceramics and other hand made materials. Sign up for an excursion
          to the city where you will learn how pottery is made at the Bristol
          Pottery Workshop. All activities are free and all the pottery is for
          sale. The tour is organized and presented by Chelsea Handmade & Local.
        </p>
        <blockquote className="daily-tasks__quote">
          This is an indented quote. It provides a way to visually set apart a
          piece of text from the rest of the content, typically used for
          quotations or excerpts.
        </blockquote>
        <p className="daily-tasks__paragraph">
          Local producer of bath and beauty products. Check out the bath and
          beauty products line from this maker. Located in oak barrels. Make
          yourself some bath salts and use the handmade containers for a nice
          relaxing bath at home. Make some small pots with creative molding
          techniques. Tryens. making some pieces with the pottery tools. Visit a
          local art store and get some handmade brushes. You can paint your own
          wall at the studio where you’ll get a tour of the studio and you can
          choose a souvenir tile to make yourself a unique decorative piece in
          your house. Learn more about the history of pottery and how ceramics
          can be used as a building material for small clay bricks. Using the
          tools you learned from the workshop you will make a few pieces
        </p>
      </div>
    </Layout>
  );
};

export default Home;
