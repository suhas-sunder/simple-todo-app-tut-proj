// Component import
import TaskItem from './TaskItem'

// Styles
import styles from './TaskList.module.css'

function TaskList( { tasks, deleteTask, checkedTask, enterEditMode} ) {
  return (
    <ul className={styles.tasks}>
        {
            tasks.sort((a, b) => (b.id - a.id)).map(task =>  (
                <TaskItem 
                    key={task.id}
                    task={task}
                    deleteTask={deleteTask}
                    checkedTask={checkedTask}
                    enterEditMode={enterEditMode}
                />
            ))
        }
    </ul>
  )
}

export default TaskList