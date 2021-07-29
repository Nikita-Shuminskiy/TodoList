import React  from 'react';
import './App.css';
import { Todolist } from './Todolist';
import { AddItemTaskForm } from './AddItemTaskForm';
import { AppBar, IconButton, Typography, Button, Toolbar, Container, Grid, Paper } from '@material-ui/core';
import { MenuOpen } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { AppRootStateType } from './Store/Store';
import { addTaskAC, changeStatusAC, changeTaskValueNewAC, removeTaskAC } from './State/task-reducer';
import {
    addTodolistAC, ChangeFilterTodoListAC,
    removeTodolistAC,
    todolistChangeTitleAC
} from './State/todoList-reducer';

export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type todoTaskType = {
    [key: string]: TaskType[]
}
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

function AppRedux() {
    const todolists = useSelector<AppRootStateType, TodoListType[]> (state => state.todolists)
    const tasks = useSelector<AppRootStateType, todoTaskType> (state => state.tasks)
    const dispatch = useDispatch()


    function removeTask(id: string, todoId: string) {
       const action = removeTaskAC(id,todoId)
        dispatch(action)
    }

    function addTask(title: string, todoId: string) {
        const action = addTaskAC(title, todoId)
        dispatch(action)
    }

    function changeStatus(id: string, isDone: boolean, todoId: string) {
      const action = changeStatusAC(id,isDone,todoId)
        dispatch(action)
    }
    const changeTaskValueNew = (id: string, valueNew: string, todoId: string) => {
       const action = changeTaskValueNewAC(id,valueNew,todoId)
        dispatch(action)
    }

/////////////////////////////////
    function changeFilterTodolist(todoId: string,value: FilterValuesType) {
      const action = ChangeFilterTodoListAC(todoId,value)
        dispatch(action)

    }
    function delTodolist(id: string) {
        const action = removeTodolistAC(id)
        dispatch(action)

    }

    function addTodoList(title: string) {
    const action = addTodolistAC(title)
        dispatch(action)
    }

    function changeTitleValueNewTodo(title: string, id: string) {
        const action = todolistChangeTitleAC(title, id)
        dispatch(action)
    }

    const todoListsWrapper = todolists.map(t => {
        let allTaskForTodoList = tasks[t.id]
        let tasksForTodolist = allTaskForTodoList;
        if (t.filter === 'active') {
            tasksForTodolist = allTaskForTodoList.filter(t => t.isDone === false);
        }
        if (t.filter === 'completed') {
            tasksForTodolist = allTaskForTodoList.filter(t => t.isDone === true);
        }

        return (
            <Grid item  key={t.id}>
                <Paper style={{padding: '20px'}} elevation={5}>
                    <Todolist
                        changeTitleValueNew={changeTitleValueNewTodo}
                        changeTaskValueNew={changeTaskValueNew}
                        delTodolist={delTodolist}
                        id={t.id}
                        title={t.title}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        changeFilter={changeFilterTodolist}
                        addTask={addTask}
                        changeTaskStatus={changeStatus}
                        filter={t.filter}/>
                </Paper>
            </Grid>
        )
    })

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar style={{justifyContent: 'space-between'}}>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                    </IconButton>
                    <MenuOpen/>
                    <Typography variant="h6">
                        Todolists
                    </Typography>
                    <Button
                        variant={'outlined'}
                        color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: '20px, 0'}}>
                    <AddItemTaskForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={5}>
                    {todoListsWrapper}
                </Grid>
            </Container>

        </div>

    );
}

export default AppRedux;
