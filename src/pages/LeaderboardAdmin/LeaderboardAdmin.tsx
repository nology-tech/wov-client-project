import { useState,  useEffect} from "react";
import DropdownMenu from "../../components/DropdownMenu/DropdownMenu";
import Header from "../../components/Header/Header";
import NavigationAdmin from "../../components/NavigationAdmin/NavigationAdmin";
import { SelectChangeEvent } from "@mui/material";
import { useFirestore } from "../../hooks/useFireStore";
import { useAuth } from "../../hooks/useAuth";
import { UserProfile } from "../../types/User";
import LeaderboardCard from "../../components/LeaderboardCard/LeaderboardCard";
import { GroupData } from "../../types/Groups";


const LeaderboardAdmin = () => {
  const {getUser} = useAuth()
  const user = getUser();
  const {getTribes} = useFirestore()
  const { getLeaderboard } = useFirestore();
  const [tribe, setTribe] = useState<GroupData[]>([]);
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [chosenTribe, setChosenTribe] = useState<string>("")

  const handleChange = (event: SelectChangeEvent) => {
    setChosenTribe(event.target.value)
  };

  useEffect(() => {
    const getTribeData = async () => {
      const result = await getTribes();
      setTribe(result);
    };
    getTribeData();
  }, [getTribes]);

  useEffect(() => {
    const getLeaderboardData = async () => {
      const result = await getLeaderboard(chosenTribe);
      setUsers(result);

    };
    getLeaderboardData();  
  }, [getLeaderboard, user, chosenTribe]);


  const sortUserByScore = () => {
    const sortedUsers = [...users.map((user) => ({ ...user }))].sort((a, b) => {
      if (b.totalScore !== a.totalScore) {
        return b.totalScore - a.totalScore;
      }

      return (a.name || "").localeCompare(b.name || "");
    });
    return sortedUsers;
  };
  

  return (
    <div className="leaderboard-admin">
      {/* header */}
      <Header subtitle="Leaderboard" profileImage="user's img" />

      {/* drop down of tribes */}
      
      <DropdownMenu arrayOfGroups={tribe} chosenTribe={chosenTribe} handleChange={handleChange} />

      {/* list of people and scores from selected tribe */}
      {sortUserByScore().map((sortedUser, index) => (

        <LeaderboardCard
          key={sortedUser.id + sortedUser.name}
          name={sortedUser.name}
          profileImage={
            sortedUser.img ?? "./assets/images/default-profile-image.png"
          }
          totalScore={sortedUser.totalScore}
          isFirstCard={index === 0}
          userID={sortedUser.id}
          currentUserID={user.id}
        />
        ))}
      <div>
        <NavigationAdmin navActionIndex={4} />
      </div>
    </div>
  );
};

export default LeaderboardAdmin;
