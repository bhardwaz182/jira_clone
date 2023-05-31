import React,{useState} from "react";
import "./Dropdown.css";

const Dropdown = ({tasks, setTasks }) => {

    const [formData, setFormData] = useState("Date");
    const handleChange = (e) => {
        const value = e.target.value;
        setFormData(value);
        if(value === "name"){
            const sortedTasks = tasks.sort((a,b) => {
                if(a.name < b.name){
                    return -1;
                }else if(a.name > b.name){
                    return 1;
                }else{
                    return 0;
                }
            });
            console.log("in name");
            setTasks(sortedTasks);
        }else if(value === "Date"){
            const sortedTasks = tasks.sort((a,b) => {
                if(a.id < b.id){
                    return -1;
                }else if(a.id > b.id){
                    return 1;
                }else{
                    return 0;
                }
            });
            setTasks(sortedTasks);
        }
    }
    
    return(
        <div className="dropdown">
            <label htmlFor="sort">Sort by:</label>
            <select id="sort" onChange={handleChange} value={formData}>
                <option value="Date">Date</option>
                <option value="name">Name</option>
            </select>
        </div>
    )
}

export default Dropdown;