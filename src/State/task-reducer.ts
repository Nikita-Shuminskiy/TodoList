import { v1 } from 'uuid';
import { AddTodolistType, RemoveTodoType } from './todoList-reducer';
import { TodoTaskType } from '../AppRudux';

export type RemoveTaskType = {
    type: 'REMOVE-TASK',
    id: string
    idTodo:string
}
export type AddTaskType = {
    type: 'ADD-TASK'
    title:string
    todoId:string
}
export type ChangeStatusType ={
    type:'CHANGE-STATUS'
    id:string
    isDone:boolean
    todoId:string
}
export type changeTaskValueNewType = {
    type: 'CHANGE-TITLE'
    id:string
    valueNew:string
    todoId:string
}
type ActionType = RemoveTaskType | AddTaskType | ChangeStatusType | changeTaskValueNewType | AddTodolistType | RemoveTodoType

let initialState: TodoTaskType = {}

export const taskReducer = (state = initialState, action: ActionType):TodoTaskType => {
    const stateCopy = {...state}
    switch (action.type) {
        case 'REMOVE-TASK':
        let todoTask = stateCopy[action.idTodo]
            stateCopy[action.idTodo] = todoTask.filter(f => f.id != action.id)
            return stateCopy
        case 'ADD-TASK': {
            let task = {id: v1(), title: action.title, isDone: false};
            let newTasks = stateCopy[action.todoId]
            stateCopy[action.todoId] = [task, ...newTasks]
            return stateCopy
        }
        case 'CHANGE-STATUS':{
            return { ...state, [action.todoId]: state[action.todoId].map( t => t.id === action.id ? { ...t, isDone: action.isDone}: t) }
        }
        case 'CHANGE-TITLE':{
            return {...state, [action.todoId]: state[action.todoId].map(t => t.id === action.id ? {...t, title:action.valueNew}: t) }
        }
        case 'ADD-TODOLIST': {
            stateCopy[action.todolistId] = []
            return stateCopy
        }
        case 'REMOVE-TODOLIST': {
          delete stateCopy[action.id]
          return stateCopy
        }
        default:
           return state
    }
}
export const removeTaskAC = (id:string, idTodo:string):RemoveTaskType => {
    return {type: 'REMOVE-TASK', id, idTodo}
    }
export const addTaskAC = (title: string, todoId: string):AddTaskType => {
    return {type: 'ADD-TASK', title,todoId}
}
export const changeStatusAC = (id: string, isDone: boolean, todoId: string):ChangeStatusType => {
    return {type: 'CHANGE-STATUS', id,isDone,todoId}
}
export const changeTaskValueNewAC = (id: string, valueNew: string, todoId: string):changeTaskValueNewType => {
    return {type: 'CHANGE-TITLE', id,valueNew,todoId}
}
