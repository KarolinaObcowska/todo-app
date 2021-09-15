/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { Grid, AppBar, Typography } from '@material-ui/core';
import '@fontsource/roboto';
import { useState, useEffect } from 'react';
import AddTask from './AddTask'
import Task from './Task';
import { createTask, getTasks } from '../API';

const Layout = () => {

    const [tasks, setTasks] = useState<Task[]>([]);

    const fetchTasks = (): void => {
      getTasks()
        .then(({ data: { tasks } }: Task[] | any) => setTasks(tasks))
        .catch((err: Error) => console.log(err))
    };

    useEffect(() => {
      fetchTasks()
    });

    const handleAddTask = (e: React.FormEvent, formData: Task): void => {
        e.preventDefault();
        createTask(formData)
        .then(({ status, data }) => {
         if (status !== 201) {
           throw new Error('Error! Task not saved')
         }
         setTasks(data.tasks)
       })
       .catch((err) => console.log(err))
     };

    //  const handleUpdateTask = (task: Task): void => {
    //    updateTask(task)
    //     .then((data) => setTasks(data.tasks))
    //     .catch(err => console.log(err))
    //  };

    //  const handleDeleteTask = (_id: string): void => {
    //    deleteTask(_id)
    //     .then((data) => setTasks(data.tasks))
    //     .catch(err => console.log(err))
    //  }



    return (
        <Grid justifyContent='center' container={true} >
            <AppBar position='static'style={{background: 'white', color:'black', padding:  9}}>
              <Typography variant="h4" align='center'> Todo App </Typography>
            </AppBar>
            <AddTask newTask={handleAddTask}/>
            {tasks.map((task: Task) => (
              <Task 
                key={task._id}
                task={task} />
            ) )}
        </Grid>
    )
}

export default Layout
