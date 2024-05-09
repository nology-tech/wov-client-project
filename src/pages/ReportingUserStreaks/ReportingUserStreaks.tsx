import { UserProfile } from "../../types/User";
import { useState, useCallback, useEffect } from "react";
import Header from "../../components/Header/Header";
import NavigationAdmin from "../../components/NavigationAdmin/NavigationAdmin";
import { getCollectionFromFirestore, FirestoreCollections } from "../../utils/dbUtils";

const ReportingUserStreaks = () => {
  // new database:
  // users now have an array of 'active tasks' and array of 'completed tasks' 

  const [users, setUsers] = useState<UserProfile[]>([]);

  const fetchAllUsers = useCallback(async () => {
    const fetchedUsers = await getCollectionFromFirestore<UserProfile>(
      FirestoreCollections.USERS
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

  const sortUsersByStreakCount = (users: UserProfile[]) => {

    return 
  }


  return (
    <div>
      <Header subtitle="User Streaks" />
      <div>
        {/* card with user's: id, name, img, task name, task streak count */}
      </div>
      <NavigationAdmin navActionIndex={2} />
    </div>
  );
};

export default ReportingUserStreaks;
