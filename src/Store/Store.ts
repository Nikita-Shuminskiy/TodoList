import { applyMiddleware, combineReducers, createStore, Dispatch } from 'redux';
import {
    addTaskAC,
    changeStatusAC,
    changeTaskTitleAC, removeTaskAC, setTasksAC,
    taskReducer
} from '../State/task-reducer';
import {
    addTodolistAC,
    changeTodoListFilterAC,
    daleteTodolistAC, setTodolistsAC,
    updateTodoListTitleAC,
    todoListReducer
} from '../State/todoList-reducer';
import thunk from 'redux-thunk';


// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния


export type ActionType =
    | ReturnType<typeof daleteTodolistAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof updateTodoListTitleAC>
    | ReturnType<typeof changeTodoListFilterAC>
    | ReturnType<typeof setTodolistsAC>
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof changeStatusAC>
    | ReturnType<typeof changeTaskTitleAC>
    | ReturnType<typeof setTasksAC>

const rootReducer = combineReducers({
    tasks: taskReducer,
    todolists: todoListReducer
})
// непосредственно создаём store
export const store = createStore(rootReducer, applyMiddleware(thunk));
// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof rootReducer>
export type AppDispatchType = Dispatch<ActionType>

// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store;