import { useState } from "react";
import { useFirestore } from "../../hooks/useFireStore";
import Button from "../Button/Button";
import "./GroupTile.scss";

type GroupTileProps = {
  tribeName: string;
  numberOfMembers: number;
  totalPoints: number;
  dateGroupStarted: string;
  handleDeleteAttempt: () => void;
};

const GroupTile = ({
  tribeName,
  numberOfMembers,
  totalPoints,
  dateGroupStarted,
  handleDeleteAttempt,
}: GroupTileProps) => {
  const date = dateGroupStarted;
  const { removeTribeAdmin } = useFirestore();

  const [hasPressedDelete, setHasPressedDelete] = useState(false);
  const [countdown, setCountdown] = useState(3);

  const handleDelete = () => {
    setHasPressedDelete(true);

    if (countdown == 1) {
      removeTribeAdmin(tribeName);
      handleDeleteAttempt();
    } else {
      setCountdown(countdown - 1);
    }
  };

  return (
    <>
      <div className="group-tile">
        <div className="group-tile__contents">
          <h3 className="group-tile__name">{tribeName}</h3>
          <p className="group-tile__members">Members: {numberOfMembers}</p>
          <p className="group-tile__points">Total Points: {totalPoints}</p>
          <p className="group-tile__date">Date created: {date}</p>
        </div>
        <div className="group-tile__button-container">
          <button className="group-tile__editButton">EDIT</button>
          <button className="group-tile__editButton" onClick={handleDelete}>
            DELETE
          </button>
          {hasPressedDelete ? <p>Will delete in {countdown} presses</p> : <></>}
        </div>
      </div>
    </>
  );
};

export default GroupTile;
