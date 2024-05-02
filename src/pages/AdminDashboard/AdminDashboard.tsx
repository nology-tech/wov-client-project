import Button from "../../components/Button/Button";
import { useAuth } from "../../hooks/useAuth";
import TaskTile from "../../components/TaskTile/TaskTile";

const AdminDashboard = () => {
  const { logoutUser } = useAuth();

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <p>This is the admin dashboard</p>
      <div>
        <Button label={"SIGN OUT"} variant={"secondary"} onClick={logoutUser} />
      </div>
    </div>
  );


};

export default AdminDashboard;
