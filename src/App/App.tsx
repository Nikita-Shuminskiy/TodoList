import React from 'react';
import './App.css';
import { AppBar, Button, Container, IconButton, LinearProgress, Toolbar, Typography } from '@material-ui/core'; // тянет всю библиотеку, разбить на ипорты!!!!
import { MenuOpen } from '@material-ui/icons';
import { TodoListsList } from '../Pages/TodoListsList/TodoListsList';
import { AppRootStateType } from '../Store/Store';
import { RequestStatusType } from '../State/App-reducer';
import { useSelector } from 'react-redux';
import { ErrorSnackbar } from '../Components/ErrorSnackBar/ErrorSnackBar';




const App = React.memo(function () {
    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)

    return (
        <div className="App">
            <ErrorSnackbar/>
            <AppBar style={{background: '#3F5172', color: 'white'}} position="static">
                <Toolbar style={{display: 'flex', justifyContent: 'space-between'}}>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                    </IconButton>
                    <MenuOpen/>
                    <Typography variant="h6">
                        MY TODOLIST :)
                    </Typography>
                    <Button variant={'outlined'} color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            {status === 'loading' && <LinearProgress color='secondary'/>}
            <Container fixed>
                <TodoListsList/>
            </Container>
        </div>

    );
})

export default App;
