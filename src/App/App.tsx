import React from 'react';
import './App.css';
import { AppBar, Button, Container, Toolbar, Typography } from '@material-ui/core';
import { MenuOpen } from '@material-ui/icons';
import { TaskType } from '../Api/TaskListApi';
import { TodoListsList } from '../Pages/TodoListsList/TodoListsList';


export type TodoTaskType = {
    [key: string]: Array<TaskType>
}

const App = React.memo(function () {

    return (
        <div className="App">
            <AppBar style={{background: '#3F5172', color: 'white'}} position="static">
                <Toolbar style={{display: 'flex', justifyContent: 'space-between'}}>
                    {/*<IconButton edge="start" color="inherit" aria-label="menu">
                    </IconButton>*/}
                    <MenuOpen/>
                    <Typography variant="h6">
                        MY TODOLIST :)
                    </Typography>
                    <Button variant={'outlined'} color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <TodoListsList/>
            </Container>
        </div>

    );
})

export default App;
