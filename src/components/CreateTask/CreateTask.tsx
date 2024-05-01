import { ChangeEvent, FormEvent, useState } from "react";
import Button from "../Button/Button";


const emptyFormData = {
name: "",
date: "",
category: "",
description: "",
points: "",
}

export const createTask = () => {
const [formData, setFormData] = useState(emptyFormData)

const handleCreateTask = () => {
    console.log(formData)
}

const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };


    return (
        <section className="create-task">
            <div className="create-task__form">
                <form action="">
                    <label htmlFor="name">Name</label><input type="text" />
                    <label htmlFor="date">Date</label><input type="text" />
                    <label htmlFor="category">Category</label><input type="text" />
                    <label htmlFor="description">Description</label><input type="text" />
                    <label htmlFor="points"></label>Points<input type="text" />
                    </form>
            <Button variant="secondary" label="Create" onClick={handleCreateTask}></Button>
            </div>

        </section>
    )
}

export default createTask;