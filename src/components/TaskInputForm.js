import React, { useState } from 'react';

// Define component for the task input form
function TaskInputForm({ onAddTask }) { 
  // State for storing input value of task description.
  const [description, setDescription] = useState('');

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); 
    onAddTask(description); // Call onAddTask function passed as a prop with the current description
    setDescription(''); // Reset the description state, clearing input field
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        id="new-task" 
        name="newTask" 
        type="text"
        placeholder="Add new task" // Placeholder input field.
        value={description} // Binds input value to the description state
        onChange={(e) => setDescription(e.target.value)} // Update the description state on input change
      />
      <button type="submit">Add Task</button> 
    </form>
  );
}

export default TaskInputForm;
