import React, {useState, useEffect} from "react";





const TodoList = () => {

const [tasks, setTasks ] = useState([])
console.log(tasks);
const [newTask, setNewTask] = useState("")

//una peticion GET para LEER las tareas que tenemos creadas en nuestra API

//una peticion POST para CREAR las tareas en nuestra API
const createTask = async ({newTask}) => {
try {
    const response = await fetch ("https://playground.4geeks.com/todo/todos/Jonas",{
        method:"POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify ({label: newTask, is_done: false })
    })
    const data = await response.json()
    setTasks([...tasks, data])
    setNewTask("")
} catch (error) {
 console.log(error)   
}
}
//una peticion PUT para ACTUALIZAR las tareas que tenemos creadas en nuestra API
//una peticion DELETE para ELIMINAR las tareas que tenemos creadas en nuestra API


    return (
    
        <div>
            Hola
        </div>
       
    )
}

export default TodoList;