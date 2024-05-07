import Header from "../../components/Header/Header"
import NavigationAdmin from "../../components/NavigationAdmin/NavigationAdmin"
import ButtonContainer from "../../containers/ButtonContainer/ButtonContainer"
import Groups from "../../containers/Groups/Groups"
import Tasks from "../../containers/Tasks/Tasks"
import groups from "../../mockData/groups"
import "./DashBoard.scss"



const Dashboard = () => {
  return (
    <div className="dashboard">
        <Header subtitle={"Dashboard"}/>
        <ButtonContainer/>
        <Groups groups={groups}/>
        <Tasks/>
        <NavigationAdmin navActionIndex={0}/>
      
    </div>
  )
}

export default Dashboard
