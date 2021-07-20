import React, { useState } from 'react';
import './App.css';
import { Todolist } from './Todolist';
import { v1 } from 'uuid';
import { AddItemTaskForm } from './AddItemTaskForm';
import { AppBar, IconButton, Typography, Button, Toolbar, Container, Grid, Paper } from '@material-ui/core';
import { MenuOpen } from '@material-ui/icons';

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

function App() {
    let todolist1 = v1()
    let todolist2 = v1()
    let [tasks, setTasks] = useState<todoTaskType>({
        [todolist1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true}
        ],
        [todolist2]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true}
        ]
    })
    const [todolists, setTodolist] = useState<TodoListType[]>([
        {id: todolist1, title: 'New-Todo', filter: 'all'},
        {id: todolist2, title: 'New-Todo', filter: 'all'}
    ])

 /*   function removeTask(id: string, todoId: string) {
        let todolistTask = tasks[todoId]
        tasks[todoId] = todolistTask.filter(t => t.id != id)
        setTasks({...tasks})
    }

    function addTask(title: string, todoId: string) {
        let task = {id: v1(), title: title, isDone: false};
        let newTasks = tasks[todoId]
        tasks[todoId] = [task, ...newTasks]
        setTasks({...tasks})
    }

    function changeStatus(id: string, isDone: boolean, todoId: string) {
        let todolistTask = tasks[todoId]
        let task = todolistTask.find(t => t.id === id)
        if (task) {
            task.isDone = isDone
            setTasks({...tasks})
        }
    }

    function changeFilter(value: FilterValuesType, todoId: string) {
        let todolist = todolists.find(t => t.id === todoId)
        if (todolist) {
            todolist.filter = value
            setTodolist([...todolists])
        }

    }*/
   /* function delTask(id: string) {
        setTodolist(todolists.filter(t => t.id != id))
        delete tasks[id]
        setTasks({...tasks})
    }

    const changeTaskValueNew = (id: string, valueNew: string, todoId: string) => {
        let todolistTask = tasks[todoId]
        let task = todolistTask.find(t => t.id === id)
        if (task) {
            task.title = valueNew
            setTasks({...tasks})
        }
    }

    function addTodoList(title: string) {
        const todoList: TodoListType = {
            id: v1(),
            title: title,
            filter: 'all'
        }
        setTodolist([...todolists, todoList])
        setTasks({...tasks, [todoList.id]: []})
    }

    function changeTitleValueNew(id: string, newTitle: string) {
        const todolist = todolists.find(tl => tl.id === id)
        if (todolist) {
            todolist.title = newTitle
            setTodolist([...todolists])
        }
    }*/

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
            <Grid item key={t.id}>
                <Paper style={{padding: '20px'}} elevation={5}>
                    <Todolist
                        changeTitleValueNew={changeTitleValueNew}
                        changeTaskValueNew={changeTaskValueNew}
                        delTask={delTask}
                        id={t.id}
                        title={t.title}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
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

export default App;
