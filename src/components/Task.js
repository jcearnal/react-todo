import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

function Task({ task, onToggleCompleted, onDelete, onUpdateTask, onDeleteSubTask, onToggleSubTaskCompleted }) {
  const [subTaskDescription, setSubTaskDescription] = useState('');

  // In case of rendering issue, etc.
  if (!task) {
    return <div>Task not found</div>;
  }

  // Sub-task
  const handleAddSubTask = () => {
    if (!subTaskDescription.trim()) {
      alert("Sub-task cannot be empty"); // No empty sub-tasks
      return;
    }
    const newSubTask = { id: uuidv4(), description: subTaskDescription, completed: false }; 
    const updatedSubTasks = [...(task.subTasks ?? []), newSubTask]; // Add to existing sub-tasks
    onUpdateTask(task.id, updatedSubTasks); // Update w/ sub-task
    setSubTaskDescription(''); 
  };

  
  return (
    <div>
      <div className="task-main" style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
        <input
          type="checkbox"
          checked={task?.completed}
          onChange={() => onToggleCompleted(task.id)} // Flip state
          name={`task-completed-${task.id}`}
        />
        <span className={task.completed ? 'task-completed' : ''} style={{ marginLeft: '10px' }}>{task.description}</span>
        <button onClick={() => onDelete(task.id)} style={{ marginLeft: 'auto' }}>X</button> 
      </div>
      <div className="sub-tasks" style={{ marginLeft: '20px' }}>
        {task.subTasks?.map((subTask) => ( // Showing each sub-task, if any
          <div key={subTask.id} className="sub-task" style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
            <input
              type="checkbox"
              checked={subTask?.completed}
              onChange={() => onToggleSubTaskCompleted(task.id, subTask.id)} // Flip state for sub-tasks
              name={`subtask-completed-${subTask.id}`}
            />
            <span className={subTask.completed ? 'sub-task-completed' : ''} style={{ marginLeft: '10px' }}>{subTask.description}</span>
            <button onClick={() => onDeleteSubTask(task.id, subTask.id)} style={{ marginLeft: 'auto' }}>Remove</button> 
          </div>
        ))}
        <div style={{ display: 'flex', alignItems: 'center' }}>
         <input
          type="text"
          value={subTaskDescription}
          onChange={(e) => setSubTaskDescription(e.target.value)} // type in to add more
          placeholder="Add sub-task"
          style={{ marginRight: '10px' }}
          name={`add-subtask-${task.id}`}
        />
          <button onClick={handleAddSubTask}>Add Sub-task</button> 
        </div>
      </div>
    </div>
  );
}

export default Task;
