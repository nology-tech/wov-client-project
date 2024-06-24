import React from 'react'
import { useParams } from 'react-router-dom'

const IndividualTask = () => {

const {taskID} = useParams()

// GET ALL THE TASKS, FILTER OUT THE CURRENT TASK AND USE THAT INFORMATION ON THE PAGE

// HAVE DIFFERENT FORMS FOR EDITING

// DELETING THE TASK

// ADDING THE TASK TO A GROUP OF USERS


  return (
    <div>IndividualTask</div>
  )
}

export default IndividualTask