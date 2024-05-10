import { useEffect, useState } from "react";
import { useFirestore } from "../../hooks/useFireStore";
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
  totalPoints,
  dateGroupStarted,
  numberOfMembers,
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
  const { getAllMembers } = useFirestore();
  const [members, setMembers] = useState<string[]>([]);

  useEffect(() => {
    const getAllMembersData = async () => {
      const userIds = await getAllMembers(tribeName); // Fetch user IDs associated with the tribe
      setMembers(userIds);
    };
    getAllMembersData();
  }, [tribeName, getAllMembers]);

  numberOfMembers = members.length;

  // You can fetch user profiles based on the IDs if necessary
  // For example:
  // const [userProfiles, setUserProfiles] = useState<UserProfile[]>([]);
  // useEffect(() => {
  //   const fetchUserProfiles = async () => {
  //     const profiles = await Promise.all(
  //       members.map(async (userId) => {
  //         const userProfile = await getUserProfile(userId); // Implement this function to fetch user profile
  //         return userProfile;
  //       })
  //     );
  //     setUserProfiles(profiles);
  // };
  // fetchUserProfiles();
  // }, [members]);

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
