// Library imports
import { useState, useEffect } from 'react';

import { CheckIcon } from '@heroicons/react/24/solid'


function EditForm({ editTask, updateTask, closeEditMode }) {
    const [updatedTaskName, setUpdatedTaskName] = useState(editTask.name);
    
    const handleFormSubmit = (e) => {
        e.preventDefault();
        updateTask({...editTask, name:updatedTaskName});
    }
 
    return (
        <div 
            role="dialog" 
            aria-labelledby="editTask"
            // This closes the edit mode window when background div is clicked
            onClick={(e) => {e.target === e.currentTarget && closeEditMode()}}
        >
            <form className="todo" onSubmit={handleFormSubmit}>
                <div className="wrapper">
                    <input 
                    type="text" 
                    id="editTask" 
                    className="input" 
                    value={updatedTaskName} 
                    onInput={(e) => setUpdatedTaskName(e.target.value)}
                    required
                    autoFocus
                    maxLength={60}
                    placeholder="Update Task"
                />
                    <label 
                        htmlFor="editTask"
                        className="label"
                    >Enter Task</label>
                </div>
                <button
                    className="btn"
                    aria-label={`Confirm edited task to now read ${updatedTaskName}`}
                    type="submit"
                >
                    <CheckIcon 
                        strokeWidth={2} 
                        height={24} 
                        width={24}
                    />
                </button>
            </form>
        </div>
        
    )

}

export default EditForm;