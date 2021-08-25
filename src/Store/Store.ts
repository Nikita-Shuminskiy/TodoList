import { applyMiddleware, combineReducers, createStore, Dispatch } from 'redux';
import {
    addTaskAC,
    changeStatusAC,
    changeTaskTitleAC, removeTaskAC, setTasksAC,
    taskReducer
} from '../State/task-reducer';
import {
    addTodolistAC,
    changeTodoListFilterTypeAC,
    removeTodolistAC, setTodolistsAC,
    todolistChangeTitleAC,
    todoListReducer
} from '../State/todoList-reducer';
import thunk from 'redux-thunk';


// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния


export type ActionType =
    | ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof todolistChangeTitleAC>
    | ReturnType<typeof changeTodoListFilterTypeAC>
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