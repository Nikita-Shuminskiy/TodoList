import React, { useCallback } from 'react';
import './App.css';
import { Todolist } from './Todolist';
import { AddTodoListForm } from './AddTodoListForm';
import { AppBar, Typography, Button, Toolbar, Container, Grid, Paper } from '@material-ui/core';
import { MenuOpen } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { AppRootStateType } from './Store/Store';
import { addTaskAC, changeStatusAC, changeTaskValueNewAC, removeTaskAC } from './State/task-reducer';
import {
    addTodolistAC, FilterValuesType,
    removeTodolistAC,
    todolistChangeTitleAC,
    TodoListDomainType
} from './State/todoList-reducer';
import { changeTodoListFilterTypeAC } from '../src/State/todoList-reducer';
import { GetTask } from './Stories/taskList.';
import { TaskStatuses, TaskType } from './Api/TaskListApi';



export type TodoTaskType = {
    [key: string]: Array<TaskType>
}

const AppRedux = React.memo(function () {
    console.log('App-Redux')
    const todolists = useSelector<AppRootStateType, TodoListDomainType[]>(state => state.todolists)

    const tasks = useSelector<AppRootStateType, TodoTaskType>(state => state.tasks)

    const dispatch = useDispatch()


    const removeTask = useCallback(function (id: string, todoId: string) {
        const action = removeTaskAC(id, todoId)
        dispatch(action)
    }, [dispatch])

    const addTask = useCallback(function (title: string, todoId: string) {
        const action = addTaskAC(title, todoId)
        dispatch(action)
    }, [dispatch])

    const changeStatus = useCallback(function (id: string, status: TaskStatuses, todoId: string) {
        const action = changeStatusAC(id, status, todoId)
        dispatch(action)
    }, [dispatch])

    const changeTaskValueNew = useCallback(function (id: string, valueNew: string, todoId: string) {
        const action = changeTaskValueNewAC(id, valueNew, todoId)
        dispatch(action)
    }, [dispatch])

    const changeFilter = useCallback(function (todolistId: string, value: FilterValuesType) {
        const action = changeTodoListFilterTypeAC(todolistId, value)
        dispatch(action)
    }, [dispatch])

/////////////////////////////////
    const delTodolist = useCallback(function (id: string) {
        const action = removeTodolistAC(id)
        dispatch(action)

    }, [dispatch])

    const addTodoList = useCallback(function (title: string) {
        const action = addTodolistAC(title)
        dispatch(action)
    }, [dispatch])

    const changeTitleTodoList = useCallback(function (title: string, id: string) {
        const action = todolistChangeTitleAC(title, id)
        dispatch(action)
    }, [dispatch])

    const todoListsWrapper = todolists.map(todo => {
        let allTaskForTodoList = tasks[todo.id]
        let tasksForTodolist = allTaskForTodoList;
        return (
            <Grid item key={todo.id}>
                <Paper style={{padding: '20px'}} elevation={5}>
                    <Todolist
                        changeTitleTodoList={changeTitleTodoList}
                        changeTaskValueNew={changeTaskValueNew}
                        delTodolist={delTodolist}
                        idTodoList={todo.id}
                        titleTodoList={todo.title}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        changeFilterTasks={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeStatus}
                        filter={todo.filter}
                    />
                </Paper>
            </Grid>
        )
    })

    return (
        <div className="App">
            <AppBar style={{background: '#3F5172', color: 'white'}} position="static">
                <Toolbar style={{
                    display: 'flex',
                    justifyContent: 'space-between'
                }}>
                    {/*<IconButton edge="start" color="inherit" aria-label="menu">
                    </IconButton>*/}
                    <MenuOpen/>
                    <Typography variant="h6">
                        MY TODOLIST :)
                    </Typography>
                    <Button
                        variant={'outlined'}
                        color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: '20px, 0'}}>
                    <AddTodoListForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={5}>
                    {todoListsWrapper}
                </Grid>
            </Container>
        <GetTask/>

        </div>

    );
})

export default AppRedux;
