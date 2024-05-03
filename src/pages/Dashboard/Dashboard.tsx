import Header from "../../components/Header/Header"
import NavigationAdmin from "../../components/NavigationAdmin/NavigationAdmin"
import ButtonContainer from "../../containers/ButtonContainer/ButtonContainer"
import Groups from "../../containers/Groups/Groups"
import groups from "../../mockData/groups"


const Dashboard = () => {
  return (
    <div>
        <Header subtitle={"Dashboard"}/>
        <ButtonContainer/>
        <Groups groups={groups}/>
        <NavigationAdmin navActionIndex={0}/>
      
    </div>
  )
}

export default Dashboard
