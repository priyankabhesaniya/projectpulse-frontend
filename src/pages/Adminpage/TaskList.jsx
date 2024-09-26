import React from 'react';

const TaskList = ({ tasks }) => {
  return (
    <div className="task-list">
      {tasks.length === 0 ? (
        <p>No tasks available</p>
      ) : (
        <ul>
          {tasks?.map((task) => (
            <li key={task.id}>
              {task.name} - {task.status}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskList;
