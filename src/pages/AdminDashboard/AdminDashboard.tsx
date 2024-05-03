import Button from "../../components/Button/Button";
import NavigationAdmin from "../../components/NavigationAdmin/NavigationAdmin";
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
    </div>
  );
}

export default AdminDashboard;