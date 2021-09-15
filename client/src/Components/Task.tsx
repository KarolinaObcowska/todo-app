import React from 'react'
import { List, IconButton, ListItem, ListItemText, Checkbox, ListItemSecondaryAction } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

interface Props {
    task: Task
}
const Task = (props: Props) => {
    return (
        <List>
            <ListItem > 
                <ListItemText>{props.task.what}
                </ListItemText >
                <Checkbox checked={props.task.done}/> 
                <ListItemSecondaryAction >
                    <IconButton aria-label='Delete Task'>
                        <DeleteIcon /> 
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
        </List>
    )
}

export default Task
