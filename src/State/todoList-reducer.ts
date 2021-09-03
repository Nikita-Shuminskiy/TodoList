import { todoListsApi, TodolistType } from '../Api/TodoListsApi';
import { ActionType, AppDispatchType } from '../Store/Store';
import { RequestStatusType, setAppError, setAppStatus } from './App-reducer';


let initialState: Array<TodoListDomainType> = []

export const todoListReducer = (state = initialState, action: ActionType): Array<TodoListDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(t => t.id != action.id)
        case 'ADD-TODOLIST':
            return [{...action.todoList, filter: 'all', entityStatus: 'idle'}, ...state]
        case  'CHANGE-TODOLIST-TITLE':
            return state.map(tl => tl.id === action.id ? {...tl, title:action.title} : tl)
        case 'FILTER-TODOLIST':
            return state = state.map(tl => tl.id === action.todolistId ? {...tl, filter: action.filter} : tl)
        case 'SET-TODOLISTS':
            return action.todolists.map((t) => ({...t, filter: 'all', entityStatus: 'idle'}))
        case 'CHANGE-TODOLIST-ENTITY-STATUS':
            return state.map(tl => tl.id === action.id ? {...tl, filter: 'all', entityStatus: 'loading'}: tl)
        default:
            return state
    }
}


//action
export const changeTodolistEntityStatus = (id:string,entityStatus:RequestStatusType) => ({type:'CHANGE-TODOLIST-ENTITY-STATUS', id,entityStatus}as const)
export const daleteTodolistAC = (id: string) => ({type: 'REMOVE-TODOLIST', id} as const)
export const addTodolistAC = (todoList: TodolistType) => ({type: 'ADD-TODOLIST', todoList} as const)
export const updateTodoListTitleAC = (title: string, id: string) => ({
    type: 'CHANGE-TODOLIST-TITLE',
    title,
    id
} as const)
export const changeTodoListFilterAC = (todolistId: string, filter: FilterValuesType) => ({
    type: 'FILTER-TODOLIST',
    todolistId,
    filter
} as const)
export const setTodolistsAC = (todolists: Array<TodolistType>) => ({type: 'SET-TODOLISTS', todolists} as const)


/// thunk
export const setTodoListsThunk = () =>
    (dispatch: AppDispatchType) => {
        dispatch(setAppStatus('loading'))
        todoListsApi.getTodolists()
            .then((response) => {
                dispatch(setTodolistsAC(response.data))
                dispatch(setAppStatus('idle'))
            })
    }
export const addTodoListThunk = (title: string) =>
    (dispatch: AppDispatchType) => {
        dispatch(setAppStatus('loading'))
        todoListsApi.createTodoLists(title)
            .then(res => {
                dispatch(addTodolistAC(res.data.data.item))
                dispatch(setAppStatus('idle'))
            })
    }
export const deleteTodoListThunk = (todoId: string) =>
    (dispatch: AppDispatchType) => {
        dispatch(changeTodolistEntityStatus(todoId,'loading'))
        dispatch(setAppStatus('loading'))
        todoListsApi.delTodoLists(todoId)
            .then(res => {
                if(res.data.resultCode === 0) {
                    dispatch(daleteTodolistAC(todoId))
                    dispatch(setAppStatus('idle'))
                }else {
                    if (res.data.messages.length) {
                        dispatch(setAppError(res.data.messages[0]))
                    } else {
                        dispatch(setAppError('Some error occurred'))
                    }
                    dispatch(setAppStatus('failed'))
                }

            })
    }
export const updateTodoListTitleThunk = (title: string, id: string) =>
    (dispatch: AppDispatchType) => {
        dispatch(setAppStatus('loading'))
        todoListsApi.updTodoLists(title, id)
            .then(() => {
                dispatch(updateTodoListTitleAC(title, id))
                dispatch(setAppStatus('idle'))
            })
    }

export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodoListDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}