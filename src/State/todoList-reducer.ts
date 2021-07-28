import { FilterValuesType, TodoListType } from '../App';
import { v1 } from 'uuid';

export type ActionType = RemoveTodoType | AddTodolistType | TodolistChangeTitleType | ChangeFilterTodoListType


export type RemoveTodoType = { type: 'REMOVE-TODOLIST', id: string }
export type AddTodolistType = { type: 'ADD-TODOLIST', title: string, todolistId: string }
type TodolistChangeTitleType = {
    type: 'CHANGE-TODOLIST-TITLE'
    id: string
    title: string
}
type ChangeFilterTodoListType = {
    type: 'CHANGE-TODOLIST-FILTER'
    id: string
    filter: FilterValuesType
};

export const removeTodolistAC = (id: string): RemoveTodoType => {
    return {type: 'REMOVE-TODOLIST', id}
}

export const AddTodolistAC = (title: string): AddTodolistType => {
    return {type: 'ADD-TODOLIST', title, todolistId: v1()}
}

export const TodolistChangeTitleType = (title: string, id: string): TodolistChangeTitleType => {
    return {type: 'CHANGE-TODOLIST-TITLE', title, id}
}
export const ChangeFilterTodoListType = (id: string, filter: FilterValuesType): ChangeFilterTodoListType => {
    return {type: 'CHANGE-TODOLIST-FILTER', id, filter}
}

export const todoListReducer = (state: TodoListType[], action: ActionType): TodoListType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            const stateCopy = {...state}
            stateCopy.filter(t => t.id != action.id)
            return stateCopy
        }
        case 'ADD-TODOLIST':
            const todoList: TodoListType = {
                id: action.todolistId,
                title: action.title,
                filter: 'all',
            }
            return [...state, todoList]
        case  'CHANGE-TODOLIST-TITLE':
            const todolist = state.find(tl => tl.id === action.id)
            if (todolist) {
                todolist.title = action.title
            }
            return [...state]
        case 'CHANGE-TODOLIST-FILTER':
            const todo = state.find(f => f.id === action.id)
            if (todo) {
                todo.filter = action.filter
            }
            return state
        default:
            throw new Error('I dont understand you')
    }
}
