import { Link } from "react-router-dom";
import "./ReportingTile.scss";

const ReportingTile = () => {
  return (
    <div className="reporting-tiles">
      <div className="reporting-tile">
        <Link to="/most-active-users"  className="reporting-tile__link">
          <h2 className="reporting-tile__heading">Most Active Users</h2>
          <h4 className="reporting-tile__sub-heading">Sub Heading</h4>
        </Link>
      </div>
      <div className="reporting-tile">
        <Link to="/inactive-users" className="reporting-tile__link">
          <h2 className="reporting-tile__heading">Inactive Users</h2>
          <h4 className="reporting-tile__sub-heading">Sub Heading</h4>
        </Link>
      </div>
      <div className="reporting-tile" >
        <Link to="user-streaks" className="reporting-tile__link">
          <h2 className="reporting-tile__heading">User Streaks</h2>
          <h4 className="reporting-tile__sub-heading">Sub Heading</h4>
        </Link>
      </div>
    </div>
  );
};

export default ReportingTile;
