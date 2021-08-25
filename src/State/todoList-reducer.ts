import { v1 } from 'uuid';
import { todoLists, TodolistType } from '../Api/TodoListsApi';
import { ActionType } from '../Store/Store';
import { Dispatch } from 'redux';


export type FilterValuesType = 'all' | 'active' | 'completed';


export const removeTodolistAC = (id: string) => ({type: 'REMOVE-TODOLIST', id} as const)

export const addTodolistAC = (title: string) => ({type: 'ADD-TODOLIST', title, todolistId: v1()} as const)

export const todolistChangeTitleAC = (title: string, id: string) => ({
    type: 'CHANGE-TODOLIST-TITLE',
    title,
    id
} as const)

export const changeTodoListFilterTypeAC = (todolistId: string, value: FilterValuesType) => ({
    type: 'FILTER-TODOLIST',
    todolistId,
    value
} as const)

export const setTodolistsAC = (todolists: Array<TodolistType>) => (  { type: 'SET-TODOLISTS', todolists} as const)




export const setTodoListsThunk = () => {
    return (dispatch: Dispatch) => {
        todoLists.getTodolists()
            .then((response) => {
                dispatch(setTodolistsAC(response.data))
            })
    }
}

/*export const addTodoListThunk = (title: string) => {
    return (dispatch: AppDispatchType) => {
        todoLists.createTodoLists(title)
            .then(response => {
                dispatch(addTodolistAC(response.data))
            })
    }
}
export const deleteTodoListThunk = (todoId: string) => {
    return (dispatch: AppDispatchType) => {
        todoLists.delTodoLists(todoId)
            .then(response => {
                dispatch(addTodolistAC(response.data))
            })
    }
}
export const updateTodoListTitleThunk = (todoId:string,title:string) => {
        return (dispatch: AppDispatchType) => {
            todoLists.updTodoLists(todoId,title)
                .then(response => {
                    dispatch(addTodolistAC(response.data))
                })
        }
    }*/


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
                id: action.todolistId,
                title: action.title,
                order: 1,
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
        case 'SET-TODOLISTS': {
            return action.todolists.map((t) => ( {...t, filter:'all'} ) )
        }
        default:
            return state
    }
}
