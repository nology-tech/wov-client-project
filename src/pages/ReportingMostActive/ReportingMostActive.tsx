import Header from "../../components/Header/Header";
import { useState, useEffect, useCallback } from "react";
import { UserProfile } from "../../types/User";
import {
  getCollectionFromFirestore,
  FirestoreCollections,
} from "../../utils/dbUtils";
import UserCard from "../../components/UserCard/UserCard";

const ReportingMostActive = () => {
  const [users, setUsers] = useState<UserProfile[]>([]);

  const fetchAllUsers = useCallback(async () => {
    const fetchedUsers = await getCollectionFromFirestore<UserProfile>(
      FirestoreCollections.TRIBE
    );

    if (fetchedUsers) {
      setUsers(fetchedUsers);
    } else {
      console.error("No users found in 'test-tribe' collection.");
    }
  }, []);

  useEffect(() => {
    fetchAllUsers();
  }, [fetchAllUsers]);

  const sortUsersByLoginCount = (users: UserProfile[]) => {
    return users.sort((a, b) => {
      const aLoginCount = a.loginCount ?? 0;
      const bLoginCount = b.loginCount ?? 0;

      if (bLoginCount !== aLoginCount) {
        return bLoginCount - aLoginCount;
      }
      return (a.name || "").localeCompare(b.name || "");
    });
  };
  const sortedUsers = sortUsersByLoginCount(users);

  return (
    <div>
      <Header subtitle="Most Active Users" />
      <div className="user-list">
        {sortedUsers.map((user, index) => (
          <UserCard
            key={user.id}
            name={user.name}
            img={user.img}
            loginCount={user.loginCount ?? 0}
            isFirstCard={index === 0}
            currentUserID={null}
            userID={user.id}
          />
        ))}
      </div>
    </div>
  );
};

export default ReportingMostActive;
