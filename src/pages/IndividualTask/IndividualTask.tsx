import React, { FormEvent, useEffect, useState, ChangeEvent } from 'react'
import "./IndividualTask.scss"
import { db } from "../../firebase";
import { collection, query, where, getDocs, writeBatch, doc } from 'firebase/firestore'
import { useParams } from 'react-router-dom'
import Header from '../../components/Header/Header';
import NavigationAdmin from '../../components/NavigationAdmin/NavigationAdmin';
import Button from "../../components/Button/Button";
import { GroupData } from '../../types/Groups';
import { useFirestore } from '../../hooks/useFireStore';
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs, { Dayjs } from "dayjs";
import { FirestoreCollections } from '../../utils/dbUtils';
import { v4 as uuidv4 } from 'uuid';


type Task = {
  id: string,
  name: string,
  points: string,
  desciption: string,
  category: string,
}

const IndividualTask = () => {

const {taskID} = useParams()
const [task, setTask] = useState<Task>();
const [ tribes, setTribes] = useState<GroupData[]>([])
const [ formType, setFormType] = useState({ edit: true, add: false})
const [ date, setDate] = useState<Dayjs| null >(null)
const [selectedTribeName, setSelectedTribeName] = useState<string>("")
const [selectedTribeID, setSelectedTribeID] = useState<string>("")
const [ formMessage, setFormMessage] = useState<string>("")
const {getAllGroupsAdmin} = useFirestore();

const getTaskInfo = async () => {
  const taskQuery = query(collection(db, "tasks"), where("id", "==", taskID))
  const taskInfo = await getDocs(taskQuery);
  if(taskInfo.docs.length <= 0){   
    return 
  }

  let task;
  taskInfo.forEach((doc) => {
    task = doc.data();    
  });

  setTask(task)
}

useEffect(()=> {
getTaskInfo()
getAllGroupsAdmin().then((tribes) => {
  setTribes(tribes);
});
}, [])


const handleSelectTribe = (event: FormEvent<HTMLSelectElement>) => {
  const selectedTribe = tribes.filter(tribe => tribe.name === event.currentTarget.value)
  setSelectedTribeName(selectedTribe[0].name)
  setSelectedTribeID(selectedTribe[0].id)
}



// ADDING THE TASK TO A GROUP OF USERS

const handleTaskEdit = async (event: FormEvent) => {
  event.preventDefault();
}

const handleTaskAdd = async (event: FormEvent) => {
  event.preventDefault()
  // get date selected  
  const dateSelected = date?.toDate()
   //get the selected tribe
  const tribeID = selectedTribeID
  
  //get users in that tribe(user id), fetch all users
  const userIds = tribes.filter(tribe => tribe.id === tribeID ).map(tribeInfo => tribeInfo.users)
  const userRef = collection(db, "users")
  const queryUsers = query(userRef, where("id", "in", userIds[0] ))
  const querySnapshot = await getDocs(queryUsers)   
  const allUsers:any = []
  querySnapshot.forEach((doc) => {
    allUsers.push(doc.data());
  });

  if(allUsers.length <= 0){
    setFormMessage("Update was unsuccesful, no users in this tribe")
    return 
  }

  // const activeTaskQuery = query(collection(db, FirestoreCollections.ACTIVE_TASKS))
  //   const activeTaskQuerySnap = await getDocs(activeTaskQuery)
    
  //   let activeTaskIds: string[] = []
  //   activeTaskQuerySnap.forEach((doc) => {
  //     // allUsers.push(doc.data());
  //     console.log(doc.id);
  //     activeTaskIds.push(doc.id)
  //   });

  
  //add the selected task to users
  const batch = writeBatch(db)

  allUsers.forEach((user: any) => {
    //to be added - check that the user doesn't already have this task assigned on the same day   
    // const userRef = doc(db, FirestoreCollections.ACTIVE_TASKS, )
    // this makes sure it doesn't overwrite the taks and adds a new one each time
    // batch.update(userRef, {"task": firebase.firestore.FieldValue.arrayUnion({...task, "dateAssigned": dateSelected})})
      batch.set(doc(collection(db, FirestoreCollections.ACTIVE_TASKS)), {...task, "dateAssigned": dateSelected, userId: user.id, "taskId": uuidv4()})
  
    
  })
  try{
    await batch.commit()
  } catch(e) {
    console.log("error", e);
    
    setFormMessage("Issue updating the users with tasks")
    throw new Error("Issue with updating the users")
    
  }
  setFormMessage(`Succesfully added task to all users in tribe ${selectedTribeName}`)
  
}

const handleBtnClick = (event: any) => {
  if(event.target.textContent === "Add"){
    setFormType({
      edit: false,
      add: true
    })
  }
  if(event.target.textContent === "Edit"){
    setFormType( {
      add: false,
      edit: true
    })
  }
  

}

const editTsx = (<form onSubmit={handleTaskEdit
}>
  <label>Task Name</label>
  <input type="text" value={task?.name} />
  <label>Category</label>
  <input type="text" value={task?.category} />
  <label>Description</label>
  <input type="text" value={task?.desciption} />
  <label>Points</label>
  <input type="text" value={task?.points} />
  <Button label='Update' ></Button>
</form>)

const addTsx = (<form onSubmit={handleTaskAdd
}>
  <label>Task Name</label>
  <input type="text" disabled value={task?.name} />
  <label>Category</label>
  <input type="text" disabled value={task?.category} />
  <label>Description</label>
  <input type="text" disabled value={task?.desciption} />
  <label>Points</label>
  <input type="text" disabled value={task?.points} />
  <label>Tribe</label>
  <select value={selectedTribeName} onChange={handleSelectTribe}>
    {tribes.map((tribe) => <option value={tribe.name} className='tribe-option'>{tribe.name}</option>)}
  </select>
  <LocalizationProvider dateAdapter={AdapterDayjs}>
    <DatePicker value={date} onChange={newDate => setDate(newDate)}/>
  </LocalizationProvider>
  {formMessage && (<p className='form-message'>{formMessage}</p>)}
  <Button label='Add' ></Button>
</form>)


  return (
    <>
    <Header subtitle='Individual Task'/>
    <div className='task-btn-container'>
    <Button label='Add' variant={formType.add ? "primary" : "light-grey"} onClick={handleBtnClick}></Button>
    <Button label='Edit' variant={formType.edit ? "primary" : "light-grey"} onClick={handleBtnClick}></Button>
    </div>
  
    <div className='task-form-container'>
      {formType.edit ? editTsx : addTsx}
    </div>
   
    <NavigationAdmin navActionIndex={0} />
    </>
  )
}

export default IndividualTask