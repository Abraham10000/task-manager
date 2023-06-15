import { useTaskManager } from '@/store/useTaskManager';
import React, { ChangeEvent, useRef, useEffect, useState } from 'react';

interface Task {
  id: number,
  title: string,
  completed: boolean,
}

const TaskManager = () => {
  const createTaskRef = useRef<HTMLInputElement>(null);
  const {
    tasks,
    searchTask,
    addTask,
    updateTask,
    deleteTask,
  } = useTaskManager();

  const handleAddTask = () => {
    const title = createTaskRef.current?.value || '';
    const newTask: Task = {
      id: Date.now(),
      title,
      completed: false,
    };
    addTask(newTask);
    createTaskRef.current!.value = ''; // Reset the input field
  };

  const handleUpdateTask = (taskId: number, updatedTask: Task["title"]) => {
    updateTask(taskId, updatedTask);
  };

  const handleDeleteTask = (taskId: number) => {
    deleteTask(taskId);
  };
  
  const [searchQuery, setSearchQuery] = useState('');


  const handleSearch = (e : any) => {
    searchTask(e.target.value);
  };
  
  //Use hook useEffect for calling searchTask of the hook useTaskManager everytime when 
  //the value of the variable state change
  useEffect(() => {
    searchTask(searchQuery);
  }, [searchQuery, searchTask]);
  
  // Update variable fileteredTasks using the new state variable searchQuery
  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // See! I already give you everything!
  // const filteredTasks = tasks.filter((task) =>
  //   task.title.toLowerCase().includes(searchTask.toLowerCase())
  // );

  return (
    <div>
      <h1>Task Manager</h1>

      <input type="text" ref={createTaskRef}/>

      <button onClick={handleAddTask}>Add Task</button>

      <input type="text" onChange={handleSearch} placeholder="Search Task" />

      <ul>
        {filteredTasks.map((task) => (
          <li key={task.id}>
            <input
              type="text"
              value={task.title}
              onChange={(e) =>
                handleUpdateTask(task.id, e.target.value)
              }
            />
            <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskManager;
