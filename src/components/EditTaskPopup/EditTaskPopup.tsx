import { TextField } from '@mui/material';
import './EditTaskPopup.scss';


const EditTaskPopup = () => {
  return (
    <div>
        <form action="" className="task-edit">
            <label htmlFor="">Name</label>
            <TextField
            id="name"/>
            <label htmlFor="">Category</label>
            <TextField
            id="category"/>
            <label htmlFor="">Frequency</label>
            <TextField
            id="frequency"/>
            <label htmlFor="">Points</label>
            <TextField
            id="points"/>

        </form>
        
    </div>
  )
}

export default EditTaskPopup