import axios from 'axios';


const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '978dde1d-b974-4ee1-a942-d32857675e96'
    }
})

//api
export const todoListsApi = {
    getTodolists() {
        return instance.get<Array<TodolistType>>('todo-lists')
    },
    delTodoLists(todoId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todoId}`)
    },
    updTodoLists(title: string, id: string) {
        return instance.put<ResponseType>(`todo-lists/${id}`, {title})
    },
    createTodoLists(title: string) {
        return instance.post<ResponseType<{ item: TodolistType }>>('todo-lists', {title})
    },
    getTasks(todolistId:string) {
        return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`)
    },
    createTask(title:string,todolistId:string) {
        return instance.post<ResponseType<{item: TaskType}>>(`todo-lists/${todolistId}/tasks`, {title:title})
    },
    updateTask(taskId:string, properties:UpdateTaskModelType, todolistId:string) {
        return instance.put<ResponseType<{item: TaskType}>>(`todo-lists/${todolistId}/tasks/${taskId}`, properties) // {properties} не ставить на обновление!!
    },
    deleteTask(id: string, todoId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todoId}/tasks/${id}`)
    },
}
export const authMeApi = {
    login(dataLogin:LoginParamsType){
        return instance.post<ResponseType<{userId:number}>>('auth/login', dataLogin)
    },
    me(){
        return instance.get<ResponseType<{id:number,login:string,email:string}>>('auth/me')
    },
    logout(){
        return instance.delete<ResponseType>('auth/login')
    }
}
export type LoginParamsType = {
    email:string
    password:string
    rememberMe:boolean
    captcha?:string
}

// types
export type TodolistType = {
    id: string
    title: string
    addedDate: string
    order: number
}
export type ResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    data: D
}
export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}
export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}
export type TaskType = {
    description: string
    title: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}
export type UpdateTaskModelType = {
    title: string
    description: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
}
export type GetTasksResponse = {
    error: string
    totalCount: number
    items: TaskType[]
}
