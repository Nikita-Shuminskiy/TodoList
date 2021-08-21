import { v1 } from 'uuid';
import { AddTodolistType, RemoveTodoType } from './todoList-reducer';
import { TodoTaskType } from '../AppRudux';
import { TaskPriorities, TaskStatuses } from '../Api/TaskListApi';

export type RemoveTaskType = {
    type: 'REMOVE-TASK',
    id: string
    idTodo: string
}
export type AddTaskType = {
    type: 'ADD-TASK'
    title: string
    todoId: string
}
export type ChangeStatusType = {
    type: 'CHANGE-STATUS'
    id: string
    status: TaskStatuses
    todoId: string
}
export type changeTaskValueNewType = {
    type: 'CHANGE-TITLE'
    id: string
    valueNew: string
    todoId: string
}
type ActionType =
    RemoveTaskType
    | AddTaskType
    | ChangeStatusType
    | changeTaskValueNewType
    | AddTodolistType
    | RemoveTodoType

const initialState: TodoTaskType = {}


export const taskReducer = (state = initialState, action: ActionType): TodoTaskType => {
    const stateCopy = {...state}
    switch (action.type) {
        case 'REMOVE-TASK':
            let todoTask = stateCopy[action.idTodo]
            stateCopy[action.idTodo] = todoTask.filter(f => f.id != action.id)
            return stateCopy
        case 'ADD-TASK': {
            let task = {
                id: v1(),
                title: action.title,
                status: TaskStatuses.New,
                description: '2121',
                priority: TaskPriorities.Hi,
                startDate: 212,
                deadline: 1212,
                todoListId: action.todoId,
                order: 1,
                addedDate: 23232,
                completed: false,
            };
            let newTasks = stateCopy[action.todoId]
            stateCopy[action.todoId] = [task, ...newTasks]
            return stateCopy
        }
        case 'CHANGE-STATUS': {
            return {
                ...state,
                [action.todoId]: state[action.todoId].map(t => t.id === action.id ? {...t, status: action.status} : t)
            }
        }
        case 'CHANGE-TITLE': {
            return {
                ...state,
                [action.todoId]: state[action.todoId].map(t => t.id === action.id ? {...t, title: action.valueNew} : t)
            }
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
export const removeTaskAC = (id: string, idTodo: string): RemoveTaskType => {
    return {type: 'REMOVE-TASK', id, idTodo}
}
export const addTaskAC = (title: string, todoId: string): AddTaskType => {
    return {type: 'ADD-TASK', title, todoId}
}
export const changeStatusAC = (id: string, status: TaskStatuses, todoId: string): ChangeStatusType => {
    return {type: 'CHANGE-STATUS', id, status, todoId}
}
export const changeTaskValueNewAC = (id: string, valueNew: string, todoId: string): changeTaskValueNewType => {
    return {type: 'CHANGE-TITLE', id, valueNew, todoId}
}
