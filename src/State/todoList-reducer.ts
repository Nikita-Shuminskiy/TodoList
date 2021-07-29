import { v1 } from 'uuid';
import { FilterValuesType, TodoListType } from '../AppRudux';

export type ActionType = RemoveTodoType | AddTodolistType | TodolistChangeTitleType | ChangeFilterTodoListType


export type RemoveTodoType = { type: 'REMOVE-TODOLIST', id: string }
export type AddTodolistType = { type: 'ADD-TODOLIST', title: string, todolistId: string }
export type TodolistChangeTitleType = {
    type: 'CHANGE-TODOLIST-TITLE'
    title: string
    id: string

}
type ChangeFilterTodoListType = {
    type: 'CHANGE-TODOLIST-FILTER'
    id: string
    filter: FilterValuesType
};

export const removeTodolistAC = (id: string): RemoveTodoType => {
    return {type: 'REMOVE-TODOLIST', id}
}

export const addTodolistAC = (title: string): AddTodolistType => {
    return {type: 'ADD-TODOLIST', title, todolistId: v1()}
}

export const todolistChangeTitleAC = (title: string, id: string): TodolistChangeTitleType => {
    return {type: 'CHANGE-TODOLIST-TITLE', title, id}
}
export const ChangeFilterTodoListAC = (id: string, filter: FilterValuesType): ChangeFilterTodoListType => {
    return {type: 'CHANGE-TODOLIST-FILTER', id, filter}
}
let initialState: TodoListType[] = []
export const todoListReducer = (state = initialState, action: ActionType): TodoListType[] => {
    const stateCopy = [...state]
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return stateCopy.filter(t => t.id != action.id)
        }
        case 'ADD-TODOLIST': {
            const todoList: TodoListType = {
                id: action.todolistId,
                title: action.title,
                filter: 'all',
            }
            return [...stateCopy, todoList]
        }

        case  'CHANGE-TODOLIST-TITLE': {
            const todolist = stateCopy.find(tl => tl.id === action.id)
            if (todolist) {
                todolist.title = action.title
            }
            return stateCopy
        }

        case 'CHANGE-TODOLIST-FILTER': {
            const todo = stateCopy.find(f => f.id === action.id)
            if (todo) {
                todo.filter = action.filter
            }
            return stateCopy
        }

        default:
            return stateCopy
    }
}
