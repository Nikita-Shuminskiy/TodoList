import { todoLists, TodolistType } from '../Api/TodoListsApi';
import { ActionType, AppDispatchType } from '../Store/Store';


let initialState: Array<TodoListDomainType> = []

export const todoListReducer = (state = initialState, action: ActionType): Array<TodoListDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(t => t.id != action.id)
        case 'ADD-TODOLIST':
          /*  const todoList: TodoListDomainType = {
                id: action.todoList.id,
                title: action.todoList.title,
                order: action.todoList.order,
                addedDate: action.todoList.addedDate,
                filter: 'all',
            }
            return [todoList, ...stateCopy]*/
            return [{...action.todoList, filter: 'all'}, ...state]
        case  'CHANGE-TODOLIST-TITLE':
           /* const todolist = stateCopy.find(tl => tl.id === action.id)
            if (todolist) {
                todolist.title = action.title
            }
            return stateCopy*/
            return state.map(tl => tl.id === action.id ? {...tl, title:action.title} : tl)
        case 'FILTER-TODOLIST':
            return state = state.map(tl => tl.id === action.todolistId ? {...tl, filter: action.filter} : tl)
        case 'SET-TODOLISTS':
            return action.todolists.map((t) => ({...t, filter: 'all'}))
        default:
            return state
    }
}


//action
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
        todoLists.getTodolists()
            .then((response) => {
                dispatch(setTodolistsAC(response.data))
            })
    }
export const addTodoListThunk = (title: string) =>
    (dispatch: AppDispatchType) => {
        todoLists.createTodoLists(title)
            .then(res => {
                dispatch(addTodolistAC(res.data.data.item))
            })
    }
export const deleteTodoListThunk = (todoId: string) =>
    (dispatch: AppDispatchType) => {
        todoLists.delTodoLists(todoId)
            .then(res => {
                dispatch(daleteTodolistAC(todoId))
            })
    }
export const updateTodoListTitleThunk = (title: string, id: string) =>
    (dispatch: AppDispatchType) => {
        todoLists.updTodoLists(title, id)
            .then(() => {
                dispatch(updateTodoListTitleAC(title, id))
            })
    }

export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodoListDomainType = TodolistType & {
    filter: FilterValuesType
}