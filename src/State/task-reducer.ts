import { todoTaskType } from '../App';
import { v1 } from 'uuid';
import { AddTodolistType, RemoveTodoType } from './todoList-reducer';

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

export const taskReducer = (state:todoTaskType, action: ActionType):todoTaskType => {
    switch (action.type) {
        case 'REMOVE-TASK':
        let todoTask = state[action.idTodo]
            state[action.idTodo] = todoTask.filter(f => f.id != action.id)
            return {...state}
        case 'ADD-TASK': {
            let task = {id: v1(), title: action.title, isDone: true};
            let newTasks = state[action.todoId]
            state[action.todoId] = [task, ...newTasks]
            return {...state}
        }
        case 'CHANGE-STATUS':{
            let todoTask = state[action.todoId]
            let task = todoTask.find(t => t.id === action.id)
            if (task) {
                task.isDone = action.isDone
            }
            return {...state}
        }
        case 'CHANGE-TITLE':{
            let todolistTask = state[action.todoId]
            let task = todolistTask.find(t => t.id === action.id)
            if (task) {
                    task.title = action.valueNew
            }
            return {...state}
        }
        case 'ADD-TODOLIST': {
            const stateCopy = {...state}
            stateCopy[action.todolistId] = []
            return stateCopy
        }
        case 'REMOVE-TODOLIST': {
            const stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy
        }
        default:
            throw new Error ('I dont Understand')
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
