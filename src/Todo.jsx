import React from 'react'
import { useState } from 'react'
import './Todo.css'

const Todo = () => {
    let[todos,setTodos] =useState([]);
    let[newTodo,setNewTodo] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(null);
    const [editedTask, setEditedTask] = useState('');

      let updateTodo = (e) => {
        setNewTodo(e.target.value);
      }

      let addTask = () => {
          if(newTodo.trim()!=="")
          {
              setTodos([...todos,newTodo]);
              setNewTodo("");
          }
      }

      let editTask = (index)=> {
          setCurrentIndex(index);
          setIsEditing(true);
          setEditedTask(todos[index])
      }

      const updateTask = ()=>{
       const updateTodo = [...todos];
       updateTodo[currentIndex]=editedTask;
       if (editedTask.trim() !== '') {
        const updatedTodos = [...todos];
        updatedTodos[currentIndex] = editedTask;
        setTodos(updatedTodos);
        setIsEditing(false);
        setEditedTask('');
      } else {
        alert('Task cannot be empty!');  //  Alert for empty task
      }
      }

      const deleteTask = (index) =>{
        const  filteredTodos = todos.filter((_,idx) => idx!=index)
        setTodos(filteredTodos);
      }
  return (
    <div className="todo-container">
      <div className='sch'>
       <input className='inpTask' type="text" placeholder='enter your task' value={newTodo} id='inputTask' onChange={updateTodo}/>
       <button className='edit' onClick={addTask}>Add Task</button>
       </div>
       <ul>
        {todos.map((task,index)=>(
          <div  key={index}>
             <li >{task}</li> 
             <button className='edit'  onClick={() => editTask(index)}>Edit</button>
             <button className='delete' onClick={() => deleteTask(index)}>Delete</button>
          </div>
        
       ))}
       </ul>

        {/* Popup for editing the task */}
      {isEditing && (
        <div className="popup">
          <div className="popup-inner">
            <h2>Edit Task</h2>
            <input
              type="text"
              value={editedTask}
              onChange={(e) => setEditedTask(e.target.value)}
            />
            <button  onClick={updateTask}>Update</button>
            <button  onClick={() => setIsEditing(false)}>Cancel</button>
          </div>
        </div>
      )}

    </div>
  )
}

export default Todo