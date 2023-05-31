import React, { useState,useEffect } from "react";
import "./TaskBoard.css";
import { Card } from "../Card/Card";
import CreateTask from "../CreateTask/CreateTask";


const TaskBoard = ({ tasks, setTasks }) => {

    const [showForm, setShowForm] = useState(false);
    const [showAddTask, setShowAddTask] = useState(false);
  const [formValues, setFormValues] = useState({ name: "", position: "" });

  useEffect(() => {}, [tasks]);

  const handleFormInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    let { name, position } = formValues;
    position = position ? parseInt(position) : columns.length+1; 
    const newColumn = { id: Date.now(), title: name, position, tasks: [] };

    setColumns(columns=>{
        const tempColumns = [...columns];
        tempColumns.splice(position - 1, 0, newColumn);
        return tempColumns;
    });
    setFormValues({ name: "", position: "" });
    setShowForm(false);
  };

    const [columns, setColumns] = useState([
        {
            id: 1, title: "To Do", tasks: [
                {
                    name: "Task 1",
                    description: "Task description",
                    deadline: "2023-06-01",
                    points: "5",
                    user: "John Doe",
                    user_image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFRmWtO1zrO6tt35ewAJOE9NpAb8yiwhbrBWyxjVQCZw&s"
                }
            ]
        },
        { id: 2, title: "In Progress", tasks: [] },
        { id: 3, title: "Done", tasks: [] },
    ]);

    const handleAddColumn = () => {
        setShowForm(true);
    };
    const handleAddTask = () => {
        setShowAddTask(true);
    }
    

    const handleTaskMove = (taskId, targetColumnId) => {
        // setTasks((prevTasks) => {
          const updatedTasks = tasks.map((task) => {
            if (task.id === taskId) {
              return { ...task, status: targetColumnId };
            }
            return task;
          });
          
          setTasks([...updatedTasks]);
        // });
    };  
    
    const handleDragStart = (e, taskId) => {
        e.dataTransfer.setData("taskId", taskId);
      };
    
      const handleDragOver = (e) => {
        e.preventDefault();
      };
    
      const handleDrop = (e, columnId) => {
        const taskId = e.dataTransfer.getData("taskId");
        if (taskId) {
          handleTaskMove(parseInt(taskId), columnId);
        }
      };
    
    return (
        <div className="task-board" data-testid="task-board">
            <div className="task-board-header">
                <h2>Task Board</h2>
                <div>
                    <button onClick={handleAddColumn}>Add Column</button>
                    <button onClick={handleAddTask}>Add Task</button>
                </div>
            </div>
            <div className="task-board-columns">
                {columns.map((column) => (
                    <div key={column.id} className="task-column" onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, column.title)} data-testid={`${column.title.toLowerCase().replace(/\s/g, "-")}-column`}>
                        <h3>{column.title}  </h3>
                        <ul className="task-list">
                            {
                                (tasks&&tasks.length?tasks.filter((task) => task.status === column.title).map((task) => <><Card story_number={task.id} story_points={task.points} user_image={task.user_image} onDragStart={handleDragStart}>{task.name}</Card></>):""
                                )
                            }
                        </ul>
                    </div>
                ))}
            </div>
            {showForm && (
                <div className="form-popup-overlay">
        <div className="form-popup">
          <form onSubmit={handleFormSubmit}>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formValues.name}
              onChange={handleFormInputChange}
              required
            />
            <label htmlFor="position">Position:</label>
            <input
              type="text"
              id="position"
              name="position"
              value={formValues.position}
              onChange={handleFormInputChange}
              
            />
            
            <button type="submit">Submit</button>
            <button type="button" onClick={() => setShowForm(false)}>Cancel</button>
          </form>
        </div>
        </div>
      )}
      {
        showAddTask && <div className="form-popup-overlay">
        <div className="form-popup"><CreateTask tasks={tasks} setTasks={setTasks} setShowAddTask={setShowAddTask}/></div></div>
      }
        
        
        </div>
    );
};

export default TaskBoard;
