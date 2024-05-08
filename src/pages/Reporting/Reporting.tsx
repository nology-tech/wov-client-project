import Header from "../../components/Header/Header";
import NavigationAdmin from "../../components/NavigationAdmin/NavigationAdmin";
import ReportingTile from "../../components/ReportingTile/ReportingTile";

const Reporting = () => {
  const reportingOptions = [
    {
      heading: "Most Active Users",
      subHeading: "View the most active users",
      linkTo: "/most-active-users",
    },
    {
      heading: "Inactive Users",
      subHeading: "Find users who haven't been active lately",
      linkTo: "/inactive-users",
    },
    {
      heading: "User Streaks",
      subHeading: "Check users with the longest streaks",
      linkTo: "/user-streaks",
    },
  ];

  return (
    <div>
      <Header subtitle="Reporting" />
      <div className="reporting-tiles">
        {reportingOptions.map((option) => (
          <ReportingTile
            heading={option.heading}
            subHeading={option.subHeading}
            linkTo={option.linkTo}
          />
        ))}
      </div>
      <NavigationAdmin navActionIndex={2} />
    </div>
  );
};

export default Reporting;
