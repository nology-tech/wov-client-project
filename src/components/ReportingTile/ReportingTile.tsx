import { Link } from "react-router-dom";
import "./ReportingTile.scss";

export type ReportingTileProps = {
  heading: string;
  subHeading: string;
  linkTo: string;
};

const ReportingTile = ({ heading, subHeading, linkTo }: ReportingTileProps) => {
  return (
    <div className="reporting-tile">
      <Link to={linkTo} className="reporting-tile__link">
        <h2 className="reporting-tile__heading">{heading}</h2>
        <h4 className="reporting-tile__sub-heading">{subHeading}</h4>
      </Link>
    </div>
  );
};

export default ReportingTile;
