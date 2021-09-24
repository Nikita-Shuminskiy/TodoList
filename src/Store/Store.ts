import { applyMiddleware, combineReducers, createStore, Dispatch } from 'redux';
import { addTaskAC, removeTaskAC, setTasksAC, taskReducer, updateTaskAC } from '../State/task-reducer';
import {
    addTodolistAC,
    changeTodolistEntityStatus,
    changeTodoListFilterAC,
    daleteTodolistAC,
    setTodolistsAC,
    todoListReducer,
    updateTodoListTitleAC
} from '../State/todoList-reducer';
import thunk from 'redux-thunk';
import { appReducer, setAppError, setAppStatus, setIsInitializedAC } from '../State/App-reducer';
import { authReducer, setIsLoggedIn } from '../State/authReducer';
import { configureStore } from '@reduxjs/toolkit';


// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния


export type ActionType =
    | ReturnType<typeof setIsLoggedIn>
    | ReturnType<typeof daleteTodolistAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof updateTodoListTitleAC>
    | ReturnType<typeof changeTodoListFilterAC>
    | ReturnType<typeof setTodolistsAC>
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof setTasksAC>
    | ReturnType<typeof setAppStatus>
    | ReturnType<typeof setAppError>
    | ReturnType<typeof changeTodolistEntityStatus>
    | ReturnType<typeof updateTaskAC>
    | ReturnType<typeof setIsInitializedAC>

const rootReducer = combineReducers({
    tasks: taskReducer,
    todolists: todoListReducer,
    app: appReducer,
    authReducer: authReducer
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().prepend(thunk)
})
// непосредственно создаём store
/*export const store = createStore(rootReducer, applyMiddleware(thunk));*/
// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof rootReducer>
export type AppDispatchType = Dispatch<ActionType>

// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store;