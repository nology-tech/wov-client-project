import Header from "../../components/Header/Header";
import HeaderHome from "../../components/HeaderHome/HeaderHome";
import Button from "../../components/Button/Button";
import { Link } from "react-router-dom";
import "./Home.scss";
import Navigation from "../../components/Navigation/Navigation";

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
    <div>
      <Header subtitle="Home" />
      <HeaderHome
        date={date}
        location="Malvern Hills"
        image="https://s3-alpha-sig.figma.com/img/9003/31aa/6dd32f49cc5bf6f29932b0481a2af856?Expires=1713744000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=FrjVJj2XFAnoifxYaGoHI0CfbBKprDFMJqDeV1ur21HRwi~j1ZYNRCW-3LPZchYU-brnUydqEOyJ8eUfwA9nB6ATjPomas0~pIPizR9gu2Je79kN9EP1pmgZjI3K6aKUXz7IoMgEErOcHxjXyt42pBlu1Ym8~HfjFPcrLW1igtrvA6JO9y997SJDeldC1ENK0Y8myy9wViW54XoUX1ripSdMlgX9NG2pa--C1P1eafFfIzyQyWrB-Uz8e9eWq0va0JvsDInxsaRT1wOvxHVAxGc~nyK5VJwcSVlplUeTEEL~fMMPrn31K8dbJHlxd0bGEGobas-1vWFzvzv~01QwUw__"
      />

      <section className="daily-tasks" data-testid="container">
        <div className="daily-tasks__button">
          <Link to="/daily-tasks">
            <Button label="VIEW TODAY's TASKS" variant="primary"></Button>
          </Link>
        </div>
        <h2 className="daily-tasks__header">
          Welcome to the Way of the Viking, where strength isn't measured in
          muscle mass, but in mentality and commitment.
        </h2>
        <p className="daily-tasks__paragraph">
          Step into a community forged by resilience and determination, where
          every journey begins with a single step towards empowerment. Discover
          a realm where mental fortitude meets physical prowess, as we embark on
          a transformative quest together. Our comprehensive program is tailored
          to unleash your inner warrior, guiding you through exercises designed
          to sharpen both body and mind.
        </p>
        <blockquote className="daily-tasks__quote">
          <strong>
            This is an indented quote. It provides a way to visually set apart a
            piece of text from the rest of the content, typically used for
            quotations or excerpts.
          </strong>
        </blockquote>
        <p className="daily-tasks__paragraph">
          Join us in embracing the challenge, where every triumph is celebrated
          and every setback is an opportunity for growth. Together as Vikings,
          we'll conquer obstacles, break barriers, and emerge victorious on the
          battlefield of self-improvement. Are you ready to rewrite your story,
          to forge a path towards unparalleled strength and vitality? Unleash
          your potential, ignite your passion, and let’s begin your journey into
          the Way of the Viking today. Your destiny awaits. Could you become the
          next Most Valuable Viking?
        </p>
      </section>
      <Navigation navActionIndex={0} />
    </div>
  );
};

export default Home;
