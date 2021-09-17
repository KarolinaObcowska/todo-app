import React from 'react';
import { IconButton, ListItem, ListItemText, Checkbox, ListItemSecondaryAction } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

interface Props {
    task: Task
    updateTask: (task: Task) => void
    deleteTask: (_id: string) => void
}



const Task = ({task, updateTask, deleteTask}: Props) => {
        return (
            <ListItem > 
                <ListItemText>{task.what}
                </ListItemText >
                <Checkbox checked={task.done} onChange={() => updateTask(task)}/> 
                <ListItemSecondaryAction >
                    <IconButton aria-label='Delete Task' onClick={() => deleteTask(task._id)}>
                        <DeleteIcon /> 
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
    )
}

export default Task
