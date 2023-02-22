// Library imports
import { useState, useEffect } from 'react'

// Custom components
import CustomForm from './components/CustomForm';
import TaskList from './components/TaskList';
import EditForm from './components/EditForm'

// Custom hooks
import useLocalStorage from './hooks/useLocalStorage'

function App() {
  const [tasks, setTasks] = useLocalStorage('react-todo.tasks',[]);
  const [editTask, setEditTask] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [previousFcousEl, setPreviousFcousEl] = useState(null);

  // Handler functions
  const addTaskHandler = (task) => {
    setTasks(prevState => [...prevState, task]);
  }

  const checkedTaskHandler = (id) => {    
    setTasks(prevState => prevState.map(t => (
        t.id === id 
          ? {...t, checked: !t.checked} 
          : t
      )))
  }

  const deleteTaskHandler = (id) => {
    setTasks(prevState => prevState.filter(t => t.id !== id));
  }

  const updateTaskHandler = (task) => {
    setTasks(prevState => prevState.map(t => (
        t.id === task.id 
          ? {...t, name: task.name} 
          : t
      )));
      closeEditHandler()
  } 

  const editModeHandler = (task) => {
    setEditTask(task);
    setIsEditing(true);
    setPreviousFcousEl(document.activeElement);
  }
  
  const closeEditHandler = () => {
    setIsEditing(false);
    previousFcousEl.focus();
  }

  // Close edit menu using escape key or mouse click
  useEffect(() => {
    const closeModalIfEscaped = (e) => {
        e.key === "Escape" && closeEditHandler()
    }

    window.addEventListener('keydown', closeModalIfEscaped)

    // Cleanup function for useEffect unmount
    return () => {
        window.removeEventListener('keydown', closeModalIfEscaped)
    }
  }, [closeEditHandler])

  return (
    <div className="container">
      <header>
        <h1>My Task List</h1>
      </header>
      {
        isEditing && (
          <EditForm 
            editTask={editTask}
            updateTask={updateTaskHandler}
            closeEditMode={closeEditHandler}
          />
        )
      }
      
      <CustomForm addTask={addTaskHandler}/>
      {tasks && (
        <TaskList 
          tasks={tasks} 
          deleteTask={deleteTaskHandler} 
          checkedTask={checkedTaskHandler}
          enterEditMode={editModeHandler}
        />      
      )}
    </div>
  );
}

export default App;
