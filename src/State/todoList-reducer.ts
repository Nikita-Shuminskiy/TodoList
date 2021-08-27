import { todoLists, TodolistType } from '../Api/TodoListsApi';
import { ActionType } from '../Store/Store';
import { Dispatch } from 'redux';


export type FilterValuesType = 'all' | 'active' | 'completed';


export const daleteTodolistAC = (id: string) => ({type: 'REMOVE-TODOLIST', id} as const)

export const addTodolistAC = (todoList: TodolistType) => ({type: 'ADD-TODOLIST', todoList} as const)

export const updateTodoListTitleAC = (title: string, id: string) => ({
    type: 'CHANGE-TODOLIST-TITLE',
    title,
    id
} as const)

export const changeTodoListFilterTypeAC = (todolistId: string, value: FilterValuesType) => ({
    type: 'FILTER-TODOLIST',
    todolistId,
    value
} as const)

export const setTodolistsAC = (todolists: Array<TodolistType>) => ({type: 'SET-TODOLISTS', todolists} as const)


/// thunk
export const setTodoListsThunk = () => {
    return (dispatch: Dispatch) => {
        todoLists.getTodolists()
            .then((response) => {
                dispatch(setTodolistsAC(response.data))
            })
    }
}
export const addTodoListThunk = (title: string) => {
    return (dispatch: Dispatch) => {
        todoLists.createTodoLists(title)
            .then(res => {
                dispatch(addTodolistAC(res.data.data.item))
            })
    }
}

export const deleteTodoListThunk = (todoId: string) => {
    return (dispatch: Dispatch) => {
        todoLists.delTodoLists(todoId)
            .then(res => {
                dispatch(daleteTodolistAC(todoId))
            })
    }
}

export const updateTodoListTitleThunk = (title: string, id: string) => {
    return (dispatch: Dispatch) => {
        todoLists.updTodoLists(title, id)
            .then(() => {
                dispatch(updateTodoListTitleAC(title, id))
            })
    }
}


let initialState: Array<TodoListDomainType> = []

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
                id: action.todoList.id,
                title: action.todoList.title,
                order: action.todoList.order,
                addedDate: action.todoList.addedDate,
                filter: 'all',
            }
            return [todoList, ...stateCopy]
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
        case 'SET-TODOLISTS': {
            return action.todolists.map((t) => ({...t, filter: 'all'}))
        }
        default:
            return state
    }
}
