import { ChangeEvent, useState } from "react";
import Button from "../Button/Button";
import "./CreateTask.scss";
import { createDocumentInFirestoreCollection } from "../../utils/dbUtils";
import { FirestoreCollections } from "../../utils/dbUtils";
import { addDoc, collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

type CreateTaskProps = {
  buttonLabel: string;
};


const emptyFormData = {
  name: "",
  date: "",
  category: "",
  description: "",
  points: "",
};

export const CreateTask = ({ buttonLabel }: CreateTaskProps) => {
  const [formData, setFormData] = useState(emptyFormData);
  const [missingFieldsError, setMissingFieldsError] = useState<string>("");

  const handleCreateTask = async () => {
    const taskRef = collection(db, "test-tasks")
    const storedData = [];
    const q = query(taskRef, where("name", "==", `${formData.name}`));
    const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        storedData.push(doc.data) 
});
    if (
      formData.name &&
      formData.date &&
      formData.category &&
      formData.description &&
      formData.points &&
      storedData.length == 0
    ) {
      setMissingFieldsError("");
      const docRef = await addDoc(collection(db, "test-tasks"), formData);
      await createDocumentInFirestoreCollection(
        FirestoreCollections.TASKS,
        docRef.id,
        formData
      );
      await setFormData(emptyFormData);
      window.alert("Task Created Successfully");
    } else {
      setMissingFieldsError("Please fill all required fields.");
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <section className="create-task">
      <div className="create-task__form">
        <form action="">
          <label>Name</label>
          <input
            name="name"
            type="text"
            onChange={handleChange}
            data-testid="name-input"
            value={formData.name}
          />
          <label>Date</label>
          <input
            name="date"
            type="Date"
            onChange={handleChange}
            min={new Date().toISOString().split("T")[0]}
            value={formData.date}
          />
          <label>Category</label>
          <input
            name="category"
            type="text"
            onChange={handleChange}
            value={formData.category}
          />
          <label>Description</label>
          <input
            name="description"
            type="text"
            onChange={handleChange}
            value={formData.description}
          />
          <label>Points</label>
          <input
            name="points"
            type="number"
            onChange={handleChange}
            value={formData.points}
          />
          {missingFieldsError && <p>{missingFieldsError}</p>}
        </form>
        <Button
          variant="secondary"
          label={buttonLabel}
          onClick={handleCreateTask}
        ></Button>
      </div>
    </section>
  );
};

export default CreateTask;
