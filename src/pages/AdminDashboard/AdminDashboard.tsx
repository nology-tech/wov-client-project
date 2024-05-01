import Button from "../../components/Button/Button";
// import Navigation from "../../components/Navigation/Navigation";
import { useAuth } from "../../hooks/useAuth";

const AdminDashboard = () => {
  const { logoutUser } = useAuth();

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <p>This is the admin dashboard</p>
      <div>
        <Button label={"SIGN OUT"} variant={"secondary"} onClick={logoutUser} />
        <NavigationAdmin navActionIndex={0}/>
      </div>
      {/* <Navigation /> */}
    </div>
  );
};

export default AdminDashboard;