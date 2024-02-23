import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid'; // Using uuid to generate unique ids for tasks and sub-tasks.
import Task from './components/Task';
import TaskInputForm from './components/TaskInputForm';
import Header from './components/Header';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);

  // Adds task w/ unique id, description, completion, and empty array for sub-tasks
  const addTask = (description) => {
    // No empty tasks allowed
    if (!description.trim()) {
      alert('Task description cannot be empty.'); 
      return;
    }
    const newTask = {
      id: uuidv4(), // Use UUID import for unique id
      description,
      completed: false,
      subTasks: [] // Nested sub-tasks
    };
    setTasks([...tasks, newTask]);
  };

  // Toggles completion status
  const toggleCompleted = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task));
  };

  // Delete task (filter from array)
  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  // Update sub-tasks for a task
  const onUpdateTask = (taskId, updatedSubTasks) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, subTasks: updatedSubTasks } : task
    ));
  };

  // Delete sub-task from task
  const onDeleteSubTask = (taskId, subTaskId) => {
    setTasks(tasks.map(task => {
      if (task.id === taskId) {      
        const updatedSubTasks = task.subTasks.filter(subTask => subTask.id !== subTaskId);
        return { ...task, subTasks: updatedSubTasks };
      }
      return task;
    }));
  };

  // Toggle completion status of sub-task
  const onToggleSubTaskCompleted = (taskId, subTaskId) => {
    setTasks(tasks.map(task => {
      if (task.id === taskId) {
        const updatedSubTasks = task.subTasks.map(subTask => {
          if (subTask.id === subTaskId) {
            return { ...subTask, completed: !subTask.completed };
          }
          return subTask;
        });
        return { ...task, subTasks: updatedSubTasks };
      }
      return task;
    }));
  };

  return (
    <div className="app">
      <Header title="To-Do List" />
      <TaskInputForm onAddTask={addTask} />
      {tasks.map(task => (
        <Task
          key={task.id} // Use UUID 
          task={task}
          onToggleCompleted={() => toggleCompleted(task.id)}
          onDelete={() => deleteTask(task.id)}
          onUpdateTask={onUpdateTask}
          onDeleteSubTask={onDeleteSubTask} 
          onToggleSubTaskCompleted={onToggleSubTaskCompleted}
        />
      ))}
    </div>
  );
}

export default App;
