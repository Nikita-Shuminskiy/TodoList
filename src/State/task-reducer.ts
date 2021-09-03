import { TodoTaskType } from '../App/App';
import { ActionType, AppDispatchType, AppRootStateType } from '../Store/Store';
import { setAppError, setAppStatus } from './App-reducer';
import { handleServerAppError, handleServerNetworkError } from '../Utils/Error-utils';
import { TaskPriorities, TaskStatuses, TaskType, todoListsApi, UpdateTaskModelType } from '../Api/TodoListsApi';




const initialState: TodoTaskType = {}

export const taskReducer = (state = initialState, action: ActionType): TodoTaskType => {
    const stateCopy = {...state}
    switch (action.type) {
        case 'REMOVE-TASK':
            return {...state, [action.idTodo]: state[action.idTodo].filter( f => f.id !== action.id)}
        case 'ADD-TASK':
            return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]}
        case 'UPDATE-TASK':
            return {
                ...state,
                [action.todoId]: state[action.todoId]
                    .map(t => t.id === action.taskId ? {...t, ...action.model} : t)
            }
        case 'ADD-TODOLIST':
          return {...state, [action.todoList.id]:  []}
        case 'REMOVE-TODOLIST':
            delete stateCopy[action.id]
            return stateCopy
        case 'SET-TODOLISTS':
            return action.todolists.reduce((acc,cur) => {
                stateCopy[cur.id] = []
                return stateCopy
            }, {...state})
            /*action.todolists.forEach((tl) => {
                stateCopy[tl.id] = []
            })
            return stateCopy;*/
        case 'SET-TASKS':
           return {...state, [action.todolistId]: action.tasks}
        default:
            return state
    }
}

//action
export const removeTaskAC = (id: string, idTodo: string) => ({type: 'REMOVE-TASK', idTodo, id} as const)
export const addTaskAC = (task: TaskType) => ({type: 'ADD-TASK', task} as const)

export const setTasksAC = (tasks: Array<TaskType>, todolistId: string) => ({
    type: 'SET-TASKS',
    tasks,
    todolistId
} as const)
export const updateTaskAC = (taskId: string, model: UpdateDomainTaskModelType, todoId: string) =>
    ({type: 'UPDATE-TASK', model, todoId, taskId} as const)


//thunk
export const fetchTasksThunk = (todolistId: string) =>
    (dispatch: AppDispatchType) => {
        dispatch(setAppStatus('loading'))
        todoListsApi.getTasks(todolistId)
        .then((res) => {
            const tasks = res.data.items
            dispatch(setTasksAC(tasks, todolistId))
            dispatch(setAppStatus('idle'))
        })
}
export const removeTaskThunk = (taskId: string, todolistId: string) =>
    (dispatch: AppDispatchType) => {
        dispatch(setAppStatus('loading'))
        todoListsApi.deleteTask(taskId, todolistId)
        .then((res) => {
            dispatch(removeTaskAC(taskId, todolistId))
            dispatch(setAppStatus('idle'))
        })
}
export const addTaskThunk = (title: string, todoId: string) =>
    (dispatch: AppDispatchType, getState: AppRootStateType) => {
        dispatch(setAppStatus('loading'))
        todoListsApi.createTask(title, todoId)
        .then((res) => {
           if (res.data.resultCode === 0) {
               dispatch(addTaskAC(res.data.data.item))
               dispatch(setAppStatus('idle'))
           }else {
               if (res.data.messages.length) {
                   dispatch(setAppError(res.data.messages[0]))
               } else {
                   dispatch(setAppError('Some error occurred'))
               }
               dispatch(setAppStatus('failed'))
           }
        }).catch(rej => {
        handleServerNetworkError(rej.messages, dispatch)
    })
}

export const updateTaskTC = (taskId: string, domainModel: UpdateDomainTaskModelType, todolistId: string) =>
    (dispatch: AppDispatchType, getState: () => AppRootStateType) => {
        const state = getState()
        const task = state.tasks[todolistId].find(t => t.id === taskId)
        if (!task) {
            //throw new Error("task not found in the state");
            console.warn('task not found in the state')
            return
        }
        dispatch(setAppStatus('loading'))
        const apiModel: UpdateTaskModelType = {
            deadline: task.deadline,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate,
            title: task.title,
            status: task.status,
            ...domainModel
        }

        todoListsApi.updateTask(todolistId, apiModel,taskId)
            .then(res => {
                const action = updateTaskAC(taskId, domainModel, todolistId)
                dispatch(action)
                dispatch(setAppStatus('succeeded'))
            })
    }
export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}





