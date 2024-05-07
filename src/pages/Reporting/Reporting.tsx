import React from "react";
import Header from "../../components/Header/Header";
import NavigationAdmin from "../../components/NavigationAdmin/NavigationAdmin";
import ReportingTile from "../../components/ReportingTile/ReportingTile";

const Reporting = () => {
  return (
    <div>
      <Header subtitle="Reporting" />
      {/* tiles that will contain what the information will be and the box will link to  */}
      {/* tiles: most active user, users that haven't signed in, users with streaks of certain activities (eg completing task x amount of times) */}
      {/* tile component and will be reused and will map over the data from the db*/}
      <ReportingTile />
      <NavigationAdmin navActionIndex={2} />
    </div>
  );
};

export default Reporting;
