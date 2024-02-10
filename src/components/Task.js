function Task({ description, completed, onToggleCompleted, onDelete }) {
  return (
    <div className="task">
      <input
        type="checkbox"
        checked={completed}
        onChange={onToggleCompleted}
      />
      <span style={{ textDecoration: completed ? 'line-through' : 'none' }}>
        {description}
      </span>
      <button onClick={onDelete}>X</button>
    </div>
  );
  
}
export default Task;

