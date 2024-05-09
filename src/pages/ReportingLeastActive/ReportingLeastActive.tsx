// import { UserProfile } from "firebase/auth";
// import { useState, useCallback, useEffect } from "react";
// import Header from "../../components/Header/Header";
// import NavigationAdmin from "../../components/NavigationAdmin/NavigationAdmin";
// import UserCard from "../../components/UserCard/UserCard";
// import {
//   getCollectionFromFirestore,
//   FirestoreCollections,
// } from "../../utils/dbUtils";

// const ReportingLeastActive = () => {
//   const [users, setUsers] = useState<UserProfile[]>([]);

//   const fetchAllUsers = useCallback(async () => {
//     const fetchedUsers = await getCollectionFromFirestore<UserProfile>(
//       FirestoreCollections.TRIBE
//     );

//     if (fetchedUsers) {
//       setUsers(fetchedUsers);
//     } else {
//       console.error("No users found in 'test-tribe' collection.");
//     }
//   }, []);

//   useEffect(() => {
//     fetchAllUsers();
//   }, [fetchAllUsers]);

//   const sortUsersByLoginCount = (users: UserProfile[]) => {
//     return users.sort((a, b) => {
//       const aLoginCount = a.loginCount ?? 0;
//       const bLoginCount = b.loginCount ?? 0;

//       if (bLoginCount !== aLoginCount) {
//         return bLoginCount - aLoginCount;
//       }
//       return (a.name || "").localeCompare(b.name || "");
//     });
//   };
//   const sortedUsers = sortUsersByLoginCount(users);

//   return (
//     <div>
//       <Header subtitle="Least Active Users" />
//       <div className="user-list">
//         <UserCard />
//       </div>
//       <NavigationAdmin navActionIndex={2} />
//     </div>
//   );
// };

// export default ReportingLeastActive;
