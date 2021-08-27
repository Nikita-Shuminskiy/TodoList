import axios from 'axios';


export type TitlePropertiesType = {
    title: string
    startDate: string
    priority: TaskPriorities
    description: string
    deadline: string
    status: TaskStatuses
}
export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3,
}
export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4,
}
export type TaskType = {
    description: string
    title: string
    completed: boolean
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: number
}
type GetTaskType<T = []> = {
    items: T
    error: string
    totalCount: number
}
type GeneralTaskType<Item = {}> = {
    resultCode: number
    messages: Array<string>
    data: Item
}




const instance = axios.create({
    baseURL:'https://social-network.samuraijs.com/api/1.1/',
    withCredentials:true,
    headers: {
        'API-KEY': '978dde1d-b974-4ee1-a942-d32857675e96'
    }
})
export const taskApi = {
    getTasks(todolistId:string) {
       return instance.get<GetTaskType<Array<TaskType>>>(`todo-lists/${todolistId}/tasks`)
    },
    createTask(title:string,todolistId:string) {
        return instance.post<GeneralTaskType<{item: TaskType}>>(`todo-lists/${todolistId}/tasks`, {title:title})
    },
    updTitleTask(taskId:string,properties:TitlePropertiesType, todolistId:string) {
        return instance.put<GeneralTaskType<TaskType>>(`todo-lists/${todolistId}/tasks/${taskId}`, {properties})
    },
    deleteTask(id: string, todoId: string) {
        return instance.delete<GeneralTaskType>(`todo-lists/${todoId}/tasks/${id}`)
    },

}