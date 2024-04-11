import { FormEvent, useState } from "react";
import ActiveTaskTile from "../../components/ActiveTaskTile/ActiveTaskTile";
import Navigation from "../../components/Navigation/Navigation";
import tasks from "../../MockData/tasks";
import { Tasks } from "../../MockData/tasks";
import './ActiveTasks.scss'
import Header from "../../components/Header/Header";


const ActiveTasks = () => {
  const [searchTerm, setSearchTerm] = useState<string>("")

  const handleTaskSearchChange = (event: FormEvent<HTMLInputElement>) => {
    const searchedInput = event.currentTarget.value;
    setSearchTerm(searchedInput)
  }

  const searchedTasks = tasks.filter((task) => 
    task.requirement.toLowerCase().includes(searchTerm) || task.category.toLowerCase().includes(searchTerm)
  )

  console.log(searchedTasks);
  

  return (
    <div className="task-page">
      <Header subtitle="Task" />
      <label htmlFor="task-search">Search Bar</label>
      <input
        type="text"
        id="task-search"
        name="task-search"
        value={searchTerm}
        onInput={handleTaskSearchChange}
        className="task-page__search"
        placeholder="Search by task, category"
      />
      {searchedTasks.map((task, index) => (
        <ActiveTaskTile
          key={task.id}
          requirement={task.requirement}
          category={task.category}
          points={task.points}
          classModifier={(index === searchedTasks.length - 1) ? "active-task active-task--last" : "active-task"}
        />
      ))}
      <Navigation navActionIndex={1} />
    </div>
  );
}

export default ActiveTasks




// Notes
// - How data storing works, will real data have id








































// import { FormEvent, useState } from "react";
// //import TaskTiles from "../../components/..... do want to create a gallery of all?;
// import ActiveTaskTile from "../../../components/ActiveTaskTile/ActiveTaskTile";
// import tasks from "../../../MockData/tasks";
// import {Tasks} from "../../../MockData/Tasks";

// type searchActiveTasks = {
//   tasks: Tasks[];
// };

// const searchActiveTasks = ({ tasks }: searchActiveTasks) => {
//   const [searchTerm, setSearchTerm] = useState<string>("");

//   const handleSearch = (event: FormEvent<HTMLInputElement>) => {
//     const cleanInput = event.currentTarget.value.toLowerCase();
//     setSearchTerm(cleanInput);
//   };

// //  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
//     const selectedValue = event.target.value;
//     setSelectedFilters((prevState) => {
//       if (prevState.includes(selectedValue)) {
//         return prevState.filter((item) => item !== selectedValue);
//       } else {
//         return [...prevState, selectedValue];
//       }
//     });
//   };
// useEffect(() => {
//     applyFilters();
//   }, [selectedFilters]);


// const handleInputChange --->function linked to handletaskcompletion

//   return (
//     *searchbar with placeholder - captures search term and oninput handles input which links to handler
//     function handleTaskCompletion passed up from child
//     <div className="active-tasks__search-box">
//       <input
//         type="text"
//         id={label}
//         name={label}
//         value={searchTerm}
//         onInput={handleInputChange}
//         className="active-tasks__search-box__input"
//       />
// map over data and create tile for each piece of mockdata return a active task tile
//       <ActiveTaskTile props requirement = {tasks.requirement} category = {tasks.category} points = {tasks.points} />  
//     </>
//   );
// };

// export default  .....;






