import React, {useState} from "react";
import "./CreateTask.css";

const CreateTask = ({tasks, setTasks, setShowAddTask}) => {

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        deadline: "",
        points: 0,
        user: "",
      });

    const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
        ...prevState,
        [name]: value,
    }));
    };
    
    const handleSubmit = (event) => {
        event.preventDefault();
        const newTask = {...formData, id:(new Date()).getTime(), status:"To Do", user_image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFRmWtO1zrO6tt35ewAJOE9NpAb8yiwhbrBWyxjVQCZw&s"};
        setTasks([...tasks, newTask]);
        setShowAddTask(false);
    }

  return (
    <div className="form-container">
        <form onSubmit={handleSubmit}>
        <table>
            <tbody>
            <tr>
                <td>
                <label htmlFor="name">Name:</label>
                </td>
                <td>
                <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="New task"
                    className="create-task-input"
                    onChange={handleChange}
                    value={formData.name}
                    required
                />
                </td>
            </tr>
            <tr>
                <td>
                <label htmlFor="description">Description:</label>
                </td>
                <td>
                <textarea
                    id="description"
                    name="description"
                    className="create-task-input"
                    onChange={handleChange}
                    value={formData.description}
                ></textarea>
                </td>
            </tr>
            <tr>
                <td>
                <label htmlFor="deadline">Deadline:</label>
                </td>
                <td>
                <input
                    type="date"
                    id="deadline"
                    name="deadline"
                    className="create-task-input"
                    onChange={handleChange}
                    value={formData.deadline}
                    required
                />
                </td>
            </tr>
            <tr>
                <td>
                <label htmlFor="points">Story points:</label>
                </td>
                <td>
                <input
                    type="number"
                    id="points"
                    name="points"
                    placeholder={0}
                    className="create-task-input"
                    onChange={handleChange}
                    value={formData.points}
                    required
                />
                </td>
            </tr>
            <tr>
                <td>
                <label htmlFor="user">Assign To:</label>
                </td>
                <td>
                <input
                    type="text"
                    id="user"
                    name="user"
                    
                    className="create-task-input"
                    onChange={handleChange}
                    value={formData.user}
                    required
                />
                </td>
            </tr>
            <tr>
                <td  style={{ textAlign: "center" }}>
                <button type="submit">Submit</button>
                </td>
                <td  style={{ textAlign: "center" }}>
                <button type="button" onClick={()=>{setShowAddTask(false)}}>Cancel</button>
                </td>
            </tr>
            </tbody>
        </table>
        </form>
    </div>
  );
}

export default CreateTask;