import React,{useState,useEffect} from "react";
import TaskBoard from "../components/TaskBoard/TaskBoard";
import Dropdown from "../components/Dropdown/Dropdown";

const Dashboard = () => {
    const [tasks, setTasks] = useState([]);
    console.log("tasks in dashboard", tasks);
    const updatedTasks = (tasks) =>{
        console.log("tasks in dashboard", tasks);
        setTasks([...tasks]);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
    useEffect(() => {
        const tasks = JSON.parse(localStorage.getItem('tasks'));
        if(tasks){
            setTasks(tasks);
        }
    }, []);
    return(
        <>
            <Dropdown tasks={tasks} setTasks={updatedTasks}/>
            <TaskBoard tasks={tasks} setTasks={updatedTasks}/>
        </>
    )
};

export default Dashboard;