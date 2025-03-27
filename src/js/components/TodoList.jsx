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
        const updatedTasks = tasks.filter((_, i) => i !== index);
        await syncTasks(updatedTasks);
    };

    // Limpiar todas las tareas
    const clearTasks = async () => {
        await syncTasks([]); // Enviar lista vacía al backend
    };

    return (
        <div className="container mt-4">
            <h1 className="text-center">Lista de Tareas</h1>

            <div className="input-group mb-3">
                <input
                    type="text"
                    className="form-control"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    placeholder="Nueva tarea..."
                />
                <button className="btn btn-primary" onClick={createTask}>Agregar</button>
            </div>

            <ul className="list-group">
                {tasks.length > 0 ? tasks.map((task, index) => (
                    <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                        <span>{task.label}</span>
                        <button className="btn btn-danger btn-sm" onClick={() => deleteTask(index)}>Eliminar</button>
                    </li>
                )) : <li className="list-group-item text-center">No hay tareas</li>}
            </ul>

            {tasks.length > 0 && (
                <button className="btn btn-warning mt-3 w-100" onClick={clearTasks}>
                    Limpiar todas las tareas
                </button>
            )}
        </div>
    );
};

export default TodoList;
