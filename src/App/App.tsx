import React, { useEffect } from 'react';
import './App.css';
import {
    AppBar,
    Button,
    CircularProgress,
    Container,
    IconButton,
    LinearProgress,
    Toolbar,
    Typography
} from '@material-ui/core'; // тянет всю библиотеку, разбить на ипорты!!!!
import { MenuOpen } from '@material-ui/icons';
import { TodoListsList } from '../Pages/TodoListsList/TodoListsList';
import { AppRootStateType } from '../Store/Store';
import { initializeAppTC, RequestStatusType } from '../State/App-reducer';
import { useDispatch, useSelector } from 'react-redux';
import { ErrorSnackbar } from '../Components/ErrorSnackBar/ErrorSnackBar';
import { Login } from '../Pages/Login/Login';
import { Redirect, Route, Switch,useHistory  } from 'react-router-dom';
import { logoutTC } from '../State/authReducer';



const App = React.memo(function () {


    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.authReducer.isLoggedIn)

    const isInitialized = useSelector<AppRootStateType, boolean>(state => state.app.isInitialized)
    const history = useHistory()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initializeAppTC())
    },[])

    if (!isInitialized) {
        return <div style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }
    const loginHandler = () => {
        history.push('/login')
    }

const logOutHandler = () =>{
        dispatch(logoutTC())
}
    return <div className="App">
            <ErrorSnackbar/>
            <AppBar style={{background: '#3F5172', color: 'white'}} position="static">
                <Toolbar style={{display: 'flex', justifyContent: 'space-between'}}>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                    </IconButton>
                    <MenuOpen/>
                    <Typography variant="h6">
                        MY TODOLIST :)
                    </Typography>
                    <Button onClick={loginHandler}  variant={'outlined'} color="inherit">Login</Button>
                    {isLoggedIn  &&   <Button onClick={logOutHandler} variant={'outlined'} color="inherit">Log-Out</Button> }
                </Toolbar>
                {status === 'loading' && <LinearProgress color="secondary"/>}
            </AppBar>
            <Container fixed>
                <Switch>
                    <Route exact path={'/'} render={ () => <TodoListsList  />}/>

                    <Route  path={'/login'} render={ () => <Login/>}/>

                    <Route path={'/404'} render={ () => <h1>404: PAGE NOT FOUND</h1> }/>

                    <Redirect from={'*'}  to={'/404'} />
                </Switch>
            </Container>
        </div>
})

export default App;
