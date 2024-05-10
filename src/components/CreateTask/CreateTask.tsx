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
  category: "",
  description: "",
  points: "",
};

export const CreateTask = ({ buttonLabel }: CreateTaskProps) => {
  const [formData, setFormData] = useState(emptyFormData);
  const [missingFieldsError, setMissingFieldsError] = useState<string>("");
  const [taskPassedMessage, setTaskPassedMessage] = useState<string>("");

  const handleCreateTask = async () => {
    setMissingFieldsError("");
    setTaskPassedMessage("");
    const taskRef = collection(db, "test-tasks");
    const storedData = [];
    const q = query(taskRef, where("name", "==", `${formData.name}`));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      storedData.push(doc.data);
    });

    if (
      formData.name &&
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
      setTaskPassedMessage("Task Successfully Created");
    } else if (storedData.length > 0) {
      setMissingFieldsError("Task with this name already exists.");
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
        <div>
          <label>Name</label>
          <input
            name="name"
            type="text"
            onChange={handleChange}
            data-testid="name-input"
            value={formData.name}
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
          {missingFieldsError && (
            <p className="error--message">{missingFieldsError}</p>
          )}
          {taskPassedMessage && (
            <p className="success--message">{taskPassedMessage}</p>
          )}
          <Button
            variant="secondary"
            label={buttonLabel}
            onClick={handleCreateTask}
          ></Button>
        </div>
      </div>
    </section>
  );
};

export default CreateTask;
