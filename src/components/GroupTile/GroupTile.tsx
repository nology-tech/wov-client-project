import { useEffect, useState } from "react";
import { useFirestore } from "../../hooks/useFireStore";
import "./GroupTile.scss";

type GroupTileProps = {
  tribeName: string;
  numberOfMembers: number;
  totalPoints: number;
  dateGroupStarted: string;
};

const GroupTile = ({
  tribeName,
  totalPoints,
  dateGroupStarted,
}: GroupTileProps) => {
  const date = dateGroupStarted;
  const { getAllMembers } = useFirestore();
  const [members, setMembers] = useState<string[]>([]);

  useEffect(() => {
    const getAllMembersData = async () => {
      const userIds = await getAllMembers(tribeName); // Fetch user IDs associated with the tribe
      setMembers(userIds);
    };
    getAllMembersData();
  }, [tribeName, getAllMembers]);

  const noOfMembers = members.length;

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
    <div className="group-tile__container">
      <div className="group-tile">
        <h3 className="group-tile__name">{tribeName}</h3>
        <p className="group-tile__members">Members: {noOfMembers}</p>
        <h4 className="group-tile__points">Total Points: {totalPoints}</h4>
        <p className="group-tile__date">Date created: {date}</p>
      </div>
    </div>
  );
};

export default GroupTile;
