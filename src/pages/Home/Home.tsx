import Header from "../../components/Header/Header";
import HeaderHome from "../../components/HeaderHome/HeaderHome";
import Button from "../../components/Button/Button";
import { Link } from "react-router-dom";
import "./Home.scss";
import Navigation from "../../components/Navigation/Navigation";
import { useAuth } from "../../hooks/useAuth";


const Home = () => {
  const { getUser } = useAuth();
  const user = getUser();
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
      <Header subtitle="Home" profileImage={user.img} />
      <HeaderHome
        date={date}
        location="Malvern Hills"
        image="./assets/images/hills.png"
      />

      <section className="home" data-testid="container">
        <div className="home__daily-tasks-button">
          <Link to="/tasks">
            <Button label="VIEW TODAY's TASKS" variant="primary"></Button>
          </Link>
        </div>
        <h2 className="home__header">
          Welcome to the Way of the Viking, where strength isn't measured in
          muscle mass, but in mentality and commitment.
        </h2>
        <p className="home__paragraph">
          Step into a community forged by resilience and determination, where
          every journey begins with a single step towards empowerment. Discover
          a realm where mental fortitude meets physical prowess, as we embark on
          a transformative quest together. Our comprehensive program is tailored
          to unleash your inner warrior, guiding you through exercises designed
          to sharpen both body and mind.
        </p>
        <blockquote className="home__quote">
          <strong>
            Together as Vikings, we'll conquer obstacles, break barriers, and
            emerge victorious on the battlefield of self-improvement.
          </strong>
        </blockquote>
        <p className="home__paragraph">
          Join us in embracing the challenge, where every triumph is celebrated
          and every setback is an opportunity for growth. Are you ready to
          rewrite your story, to forge a path towards unparalleled strength and
          vitality? Unleash your potential, ignite your passion, and let’s begin
          your journey into the Way of the Viking today. Your destiny awaits.
          Could you become the next Most Valuable Viking?
        </p>
      </section>
      <Navigation navActionIndex={0} />
    </div>
  );
};

export default Home;
