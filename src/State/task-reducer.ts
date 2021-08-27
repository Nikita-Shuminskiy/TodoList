import { TodoTaskType } from '../AppRudux';
import { taskApi, TaskStatuses, TaskType } from '../Api/TaskListApi';
import { ActionType, AppRootStateType } from '../Store/Store';
import { Dispatch } from 'redux';


const initialState: TodoTaskType = {}


export const taskReducer = (state = initialState, action: ActionType): TodoTaskType => {
    const stateCopy = {...state}
    switch (action.type) {
        case 'REMOVE-TASK':
            let todoTask = stateCopy[action.idTodo]
            stateCopy[action.idTodo] = todoTask.filter(f => f.id !== action.id)
            return stateCopy
        case 'ADD-TASK': {
            const stateCopy = {...state}
            const tasks = stateCopy[action.task.todoListId];
            const newTasks = [action.task, ...tasks];
            stateCopy[action.task.todoListId] = newTasks;
            return stateCopy;
        }
        case 'CHANGE-STATUS': {
            return {
                ...state,
                [action.todoId]: state[action.todoId].map(t => t.id === action.taskId ? {
                    ...t,
                    status: action.status
                } : t)
            }
        }
        case 'CHANGE-TITLE': {
            return {
                ...state,
                [action.todoId]: state[action.todoId].map(t => t.id === action.taskId ? {...t, title: action.title} : t)
            }
        }
        case 'ADD-TODOLIST': {
            stateCopy[action.todoList.id] = []
            return stateCopy
        }
        case 'REMOVE-TODOLIST': {
            delete stateCopy[action.id]
            return stateCopy
        }
        case 'SET-TODOLISTS': {
            action.todolists.forEach((tl) => {
                stateCopy[tl.id] = []
            })
            return stateCopy;
        }
        case 'SET-TASKS': {
            stateCopy[action.todolistId] = action.tasks
            return stateCopy
        }
        default:
            return state
    }
}


export const removeTaskAC = (id: string, idTodo: string) => ({type: 'REMOVE-TASK', idTodo, id} as const)

export const addTaskAC = (task: TaskType) => ({type: 'ADD-TASK', task} as const)

export const changeStatusAC = (taskId: string, status: TaskStatuses, todoId: string) => ({
    type: 'CHANGE-STATUS',
    taskId,
    status,
    todoId,
} as const)

export const setTasksAC = (tasks: Array<TaskType>, todolistId: string) => ({
    type: 'SET-TASKS',
    tasks,
    todolistId
} as const)

export const changeTaskTitleAC = (taskId: string, title: string, todoId: string) => ({
    type: 'CHANGE-TITLE',
    taskId,
    todoId,
    title
} as const)

export const fetchTasksThunk = (todolistId: string) => {
    return (dispatch: Dispatch) => {
        taskApi.getTasks(todolistId)
            .then((res) => {
                const tasks = res.data.items
                return dispatch(setTasksAC(tasks, todolistId))
            })
    }
}
export const removeTaskThunk = (taskId: string, todolistId: string) => {
    return (dispatch: Dispatch) => {
        taskApi.deleteTask(taskId, todolistId)
            .then((res) => {
                dispatch(removeTaskAC(taskId, todolistId))
            })
    }
}
export const addTaskThunk = (title: string, todoId: string) => {
    return (dispatch: Dispatch, getState: AppRootStateType) => {
        taskApi.createTask(title, todoId)
            .then((res) => {
                dispatch(addTaskAC(res.data.data.item))
            })
    }
}


export const updateTaskStatusTC = (taskId: string, status: TaskStatuses, todoId: string) => {
    return (dispatch: Dispatch, getState: () => AppRootStateType) => {

        const allTasksFromState = getState().tasks;
        const tasksForCurrentTodolist = allTasksFromState[todoId]
        const task = tasksForCurrentTodolist.find(t => t.id === taskId)
        if (task) {
            taskApi.updTitleTask(taskId, {
                title: task.title,
                startDate: task.startDate,
                priority: task.priority,
                description: task.description,
                deadline: task.deadline,
                status: status
            }, todoId)
                .then(() => {
                    dispatch(changeStatusAC(taskId, status, todoId))
                })
        }
    }
}
export const updateTaskTitleTC = (taskId: string, title: string, todoId: string) => {
    return (dispatch: Dispatch, getState: () => AppRootStateType) => {

        const allTasksFromState = getState().tasks;
        const tasksForCurrentTodolist = allTasksFromState[todoId]
        const task = tasksForCurrentTodolist.find(t => t.id === taskId)
        if (task) {
            taskApi.updTitleTask(taskId, {
                title: title,
                startDate: task.startDate,
                priority: task.priority,
                description: task.description,
                deadline: task.deadline,
                status: task.status
            }, todoId)
                .then(() => {
                    dispatch(changeTaskTitleAC(taskId, title, todoId))
                })
        }
    }
}




