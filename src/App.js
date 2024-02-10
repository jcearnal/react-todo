import { useState } from 'react';
import Task from './components/Task';
import TaskInputForm from './components/TaskInputForm';
import './App.css';
import Header from './components/Header';

function App() {
  const [tasks, setTasks] = useState([]);

  const addTask = (description) => {
    const newTask = { id: Date.now(), description, completed: false };
    setTasks([...tasks, newTask]);
  };

  const toggleCompleted = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div className="app">
      <Header title="To-Do List" />
      <TaskInputForm onAddTask={addTask} />
      {tasks.map(task => (
        <Task
          key={task.id}
          description={task.description}
          completed={task.completed}
          onToggleCompleted={() => toggleCompleted(task.id)}
          onDelete={() => deleteTask(task.id)}
        />
      ))}
    </div>
  );
}

export default App;