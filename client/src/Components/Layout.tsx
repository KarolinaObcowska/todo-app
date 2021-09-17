/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect }  from 'react';
import { List, Grid, AppBar, Typography, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import '../App.css';
import '@fontsource/roboto';
import ReactPaginate from 'react-paginate';
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
  const [currentPage, setCurrentPage] = useState(0);

  const fetchTasks = (): void => {
    getTasks()
    .then(({ data: { tasks } }: Task[] | any) => setTasks(tasks))
    .catch((err: Error) => console.log(err))
  };

  useEffect(() => {
    fetchTasks();
  });

  const PER_PAGE: number = 20;
  const offset: number = currentPage * PER_PAGE;
  const pageCount: number = Math.ceil(tasks.length / PER_PAGE);
  
  const handlePageClick = function ({selected:selectedPage}: any) {
    setCurrentPage(selectedPage)
  }

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
            <ReactPaginate 
              previousLabel={'<- Previous'}
              nextLabel={'Next ->'}
              pageCount={pageCount}
              onPageChange={handlePageClick} 
              pageRangeDisplayed={2} 
              marginPagesDisplayed={2}   
              containerClassName={"pagination"}
              previousLinkClassName={"pagination__link"}
              nextLinkClassName={"pagination__link"}
              disabledClassName={"pagination__link--disabled"}
              activeClassName={"pagination__link--active"}/>
            <List className={classes.root} >
            {tasks
    .slice(offset, offset + PER_PAGE)
    .map((task: Task) => (
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
