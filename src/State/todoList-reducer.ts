import { v1 } from 'uuid';
import { TodolistType } from '../Api/TodoListsApi';

export type ActionType = RemoveTodoType | AddTodolistType | TodolistChangeTitleType | changeTodoListFilterType


export type RemoveTodoType = { type: 'REMOVE-TODOLIST', id: string }

export type AddTodolistType = { type: 'ADD-TODOLIST', title: string, todolistId: string }

export type TodolistChangeTitleType = {
    type: 'CHANGE-TODOLIST-TITLE'
    title: string
    id: string

}
export type changeTodoListFilterType = {
    type: 'FILTER-TODOLIST'
    todolistId: string
    value: FilterValuesType
}

export const removeTodolistAC = (id: string): RemoveTodoType => {
    return {type: 'REMOVE-TODOLIST', id}
}

export const addTodolistAC = (title: string): AddTodolistType => {
    return {type: 'ADD-TODOLIST', title, todolistId: v1()}
}

export const todolistChangeTitleAC = (title: string, id: string): TodolistChangeTitleType => {
    return {type: 'CHANGE-TODOLIST-TITLE', title, id}
}
export const changeTodoListFilterTypeAC = (todolistId: string, value: FilterValuesType): changeTodoListFilterType => {
    return {type: 'FILTER-TODOLIST',todolistId,value }
}

export type FilterValuesType = 'all' | 'active' | 'completed';

let initialState:Array<TodoListDomainType> = []

export type TodoListDomainType = TodolistType & {
    filter: FilterValuesType
}


export const todoListReducer = (state = initialState, action: ActionType): Array<TodoListDomainType> => {
    const stateCopy = [...state]
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return stateCopy.filter(t => t.id != action.id)
        }
        case 'ADD-TODOLIST': {
            const todoList: TodoListDomainType = {
                id: action.todolistId,
                title: action.title,
                order:1,
                addedDate: '121',
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
        case 'FILTER-TODOLIST': {
            return state = state.map(tl => tl.id === action.todolistId ? {...tl, filter: action.value} : tl)
            /*const todolist = state.find(tl => tl.idTodoList === action.todolistId);
            if (todolist) {
                todolist.filter = action.value;
            }
            return [...state]*/
        }

        default:
            return state
    }
}
