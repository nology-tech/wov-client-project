import { ChangeEvent, FormEvent, useState } from "react";
import Button from "../Button/Button";
import "./CreateTask.scss";

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

const handleCreateTask = () => {
    if (formData.name && formData.date && formData.category && formData.description && formData.points) {
        setMissingFieldsError("")
        console.log(formData)
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
                    <label>Name</label><input name="name" type="text" onChange={handleChange}/>
                    <label>Date</label><input name="date" type="Date" onChange={handleChange} min={new Date().toISOString().split('T')[0]}/>
                    <label>Category</label><input name="category" type="text" onChange={handleChange}/>
                    <label>Description</label><input name="description" type="text" onChange={handleChange}/>
                    <label>Points</label><input name="points" type="text" onChange={handleChange}/>
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