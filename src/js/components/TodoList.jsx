
//METODO fetch()  try {} catch {}

import React, { useState, useEffect } from "react";

const TodoList = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");
    const API_URL = "https://playground.4geeks.com/todo/todos/Jonas";

    // Obtener tareas al iniciar el componente
    useEffect(() => {
        getTasks();
    }, []);

    const getTasks = async () => {
        try {
            const response = await fetch(API_URL);
            const data = await response.json();
            if (Array.isArray(data)) {
                setTasks(data);
            } else {
                setTasks([]); // Si el servidor no devuelve una lista válida
            }
        } catch (error) {
            console.error("Error al obtener tareas:", error);
        }
    };

    // Sincronizar cambios con el backend (PUT)
    const syncTasks = async (updatedTasks) => {
        try {
            await fetch(API_URL, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedTasks)
            });
            setTasks(updatedTasks); // Actualizar frontend después de la sincronización
        } catch (error) {
            console.error("Error al sincronizar tareas:", error);
        }
    };

    // Agregar nueva tarea
    const createTask = async () => {
        if (newTask.trim() === "") return; // Evita tareas vacías
        const updatedTasks = [...tasks, { label: newTask, is_done: false }];
        await syncTasks(updatedTasks);
        setNewTask(""); // Limpiar input
    };

    // Eliminar tarea
    const deleteTask = async (index) => {
        const updatedTasks = tasks.filter((_, i) => i !== index); // ¿what?
        await syncTasks(updatedTasks);
    };

    // Limpiar todas las tareas
    const clearTasks = async () => {
        await syncTasks([]); // Enviar lista vacía al backend
    };

    // Marcar tarea como completada o no completada
    const toggleTask = async (index) => {
        const updatedTasks = tasks.map((task, i) => 
            i === index ? { ...task, is_done: !task.is_done } : task
        );

        await syncTasks(updatedTasks);
    };

      // Detectar "Enter" para agregar tarea
      const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            createTask();
        }
    };
    
    return (
        <div className="container mt-4">
            <h1 className="text-center">Lista de Tareas</h1>
             <h5>Contador de tareas: {tasks.length}</h5>
            
            <div className="input-group mb-3">
                <input
                    type="text"
                    className="form-control"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Escribe una nueva una tarea y agrégala presionando ``Enter´´ o pulsando ``Agregar´´"
                />
                <button className="btn btn-primary" onClick={createTask}>Agregar</button>
            </div>

            <ul className="list-group">
                {tasks.length > 0 ? tasks.map((task, index) => (
                    <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center">
                            <input 
                                type="checkbox" 
                                className="form-check-input me-2"
                                checked={task.is_done} 
                                onChange={() => toggleTask(index)} 
                            />
                            <span style={{ textDecoration: task.is_done ? "line-through" : "none" }}>
                                {task.label}
                            </span>
                        </div>
                        <button className="btn btn-danger btn-sm" onClick={() => deleteTask(index)}>Eliminar</button>
                    </li>
                )) : <li className="list-group-item text-center">No hay tareas</li>}
            </ul>
            <h6 className="mt-4"> *_^  Puedes marcar la tareas realizadas en el checkbox, si no quieres eliminarlas.</h6>   

            {tasks.length > 0 && (
                <button className="btn btn-warning mt-3 w-100" onClick={clearTasks}>
                    Limpiar todas las tareas
                </button>
            )}
        </div>
    );
};

export default TodoList;



// METODO fetch().then()

// import React, { useState, useEffect } from "react";

// const TodoList = () => {
//     const [tasks, setTasks] = useState([]);
//     const [newTask, setNewTask] = useState("");
//     const API_URL = "https://playground.4geeks.com/todo/todos/Jonas";

//     // Obtener tareas al iniciar el componente
//     useEffect(() => {
//         getTasks();
//     }, []);

//     const getTasks = () => {
//         fetch(API_URL)
//             .then(response => response.json()) 
//             .then(data => {
//                 if (Array.isArray(data)) {
//                     setTasks(data);
//                 } else {
//                     setTasks([]); // Si el servidor no devuelve una lista válida
//                 }
//             })
//             .catch(error => console.error("Error al obtener tareas:", error));
//     };

//     // Sincronizar cambios con el backend (PUT)
//     const syncTasks = (updatedTasks) => {
//         fetch(API_URL, {
//             method: "PUT",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify(updatedTasks)
//         })
//         .then(() => setTasks(updatedTasks)) // Actualizar frontend después de la sincronización
//         .catch(error => console.error("Error al sincronizar tareas:", error));
//     };

//     // Agregar nueva tarea
//     const createTask = () => {
//         if (newTask.trim() === "") return; // Evita tareas vacías
//         const updatedTasks = [...tasks, { label: newTask, is_done: false }];
        
//         syncTasks(updatedTasks);
//         setNewTask(""); // Limpiar input
//     };

//     // Eliminar tarea
//     const deleteTask = (index) => {
//         const updatedTasks = tasks.filter((_, i) => i !== index);
        
//         syncTasks(updatedTasks);
//     };

//     // Limpiar todas las tareas
//     const clearTasks = () => {
//         syncTasks([]); // Enviar lista vacía al backend
//     };

//     return (
//         <div className="container mt-4">
//             <h1 className="text-center">Lista de Tareas</h1>

//             <div className="input-group mb-3">
//                 <input
//                     type="text"
//                     className="form-control"
//                     value={newTask}
//                     onChange={(e) => setNewTask(e.target.value)}
//                     placeholder="Nueva tarea..."
//                 />
//                 <button className="btn btn-primary" onClick={createTask}>Agregar</button>
//             </div>

//             <ul className="list-group">
//                 {tasks.length > 0 ? tasks.map((task, index) => (
//                     <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
//                         <span>{task.label}</span>
//                         <button className="btn btn-danger btn-sm" onClick={() => deleteTask(index)}>Eliminar</button>
//                     </li>
//                 )) : <li className="list-group-item text-center">No hay tareas</li>}
//             </ul>

//             {tasks.length > 0 && (
//                 <button className="btn btn-warning mt-3 w-100" onClick={clearTasks}>
//                     Limpiar todas las tareas
//                 </button>
//             )}
//         </div>
//     );
// };

// export default TodoList;


