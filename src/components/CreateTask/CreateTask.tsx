import { ChangeEvent, useState } from "react";
import Button from "../Button/Button";
import "./CreateTask.scss";
import { createDocumentInFirestoreCollection } from "../../utils/dbUtils";
import { FirestoreCollections } from "../../utils/dbUtils";

type CreateTaskProps = {
    buttonLabel: string;
}

const emptyFormData = {
name: "",
date: "",
category: "",
description: "",
points: "",
}

export const CreateTask = ({buttonLabel}:CreateTaskProps) => {
const [formData, setFormData] = useState(emptyFormData)
const [missingFieldsError, setMissingFieldsError] = useState<string>("");
const localStorageUID = localStorage.getItem("userUID");

const handleCreateTask = async () => {
    if (formData.name && formData.date && formData.category && formData.description && formData.points && localStorageUID) {
        setMissingFieldsError("")
        await createDocumentInFirestoreCollection(FirestoreCollections.TASKS, localStorageUID, formData)
        await setFormData(emptyFormData)
    } else {
        setMissingFieldsError("Please fill all required fields.");
    }
}

const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };


    return (
        <section className="create-task">
            <div className="create-task__form">
                <form action="">
                    <label>Name</label><input name="name" type="text" onChange={handleChange} data-testid = "name-input" value={formData.name}/>
                    <label>Date</label><input name="date" type="Date" onChange={handleChange} min={new Date().toISOString().split('T')[0]} value={formData.date}/>
                    <label>Category</label><input name="category" type="text" onChange={handleChange} value={formData.category}/>
                    <label>Description</label><input name="description" type="text" onChange={handleChange} value={formData.description}/>
                    <label>Points</label><input name="points" type="text" onChange={handleChange} value={formData.points}/>
                    {missingFieldsError && (
                    <p>
                        {missingFieldsError}
                    </p>
                    )}
                    </form>
            <Button variant="secondary" label={buttonLabel} onClick={handleCreateTask}></Button>
            </div>

        </section>
    )
}

export default CreateTask;