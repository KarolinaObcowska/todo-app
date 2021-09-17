/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect }  from 'react';
import { List, Grid, AppBar, Typography, Box} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import '@fontsource/roboto';
import AddTask from './AddTask'
import Task from './Task';
import { createTask, updateTask, deleteTask, getTasks } from '../API';


const useStyles = makeStyles((theme) => ({
  root: {
      marginTop: 20,
  },
}));

const Layout = () => {
  const classes = useStyles();

    const [tasks, setTasks] = useState<Task[]>([]);

    const fetchTasks = (): void => {
      getTasks()
      .then(({ data: { tasks } }: Task[] | any) => setTasks(tasks))
      .catch((err: Error) => console.log(err))
    }
    useEffect(() => {
      fetchTasks();
    });

    const handleAddTask = (e: React.FormEvent, formData: Task): void => {
        createTask(formData)
        .then(({ status, data }) => {
         if (status !== 201) {
           throw new Error('Error! Task not saved')
         }
         setTasks(data.tasks)
       })
       .catch((err) => console.log(err))
     };


     const handleUpdateTask = (task: Task): void => {
       updateTask(task)
        .then(({status, data}) => {
          if (status !== 201) {
            throw new Error('Error! Task not deleted')
          }
          setTasks(data.tasks)})
        .catch(err => console.log(err))
     };

     const handleDeleteTask = (_id: string): void => {
       deleteTask(_id)
        .then(({status, data}) => {
          if (status !== 201) {
            throw new Error('Error! Task not deleted')
          }
          setTasks(data.tasks)})
        .catch(err => console.log(err))
     }

    return (
        <Grid justifyContent='center' container={true} >
            <AppBar position='static'style={{background: 'white', color:'black', padding:  9}}>
              <Typography variant="h4" align='center'> Todo App </Typography>
            </AppBar>
            <Box style={{marginTop: 30}}>
            <AddTask newTask={handleAddTask}/>
            <List className={classes.root}>

            {tasks.map((task: Task) => (
              <Task 
                key={task._id}
                task={task} 
                updateTask={handleUpdateTask}
                deleteTask={handleDeleteTask}
                />
            ) )}
            </List>
            </Box>
        </Grid>
    )
}

export default Layout
