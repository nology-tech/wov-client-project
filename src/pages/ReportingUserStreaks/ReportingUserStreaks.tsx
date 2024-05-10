import Header from "../../components/Header/Header";
import NavigationAdmin from "../../components/NavigationAdmin/NavigationAdmin";
import "./ReportingUserStreaks.scss";

const ReportingUserStreaks = () => {
  return (
    <div className="usersteaks">
      <Header subtitle="User Streaks" />
      <div className="userstreaks__info">Coming Soon!</div>
      <NavigationAdmin navActionIndex={2} />
    </div>
  );
};

export default ReportingUserStreaks;
