import axios from 'axios';


export type TitlePropertiesType = {
    title: string
    description: string
    completed: boolean
    status: string
    priority: string
    startDate: string
    deadline: string
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
    startDate: number
    deadline: number
    id: string
    todoListId: string
    order: number
    addedDate: number
}
type GetTaskType = {
    error: string
    items: Array<TaskType>
    totalCount: number
}
type GeneralTaskType<Item = {}> = {
    data: {
        item: Item
    }
    fieldsErrors: Array<string>
    messages: Array<string>
    resultCode: number

}
const instance = axios.create({
    baseURL:'https://social-network.samuraijs.com/api/1.1/',
    withCredentials:true,
    headers: {
        'API-KEY': 'a64298a1-3682-4ad4-b177-06c041a94c86'
    }
})
export const taskApi = {
    getTask(todolistId:string) {
       return instance.get<Array<GetTaskType>>(`todo-lists/${todolistId}/tasks`)
    },
    createTask(todolistId:string, title:string) {
        return instance.post<Array<GeneralTaskType<TaskType>>>(`todo-lists/${todolistId}/tasks`, {title})
    },
    updTitleTask(todolistId:string, taskId:string, properties:TitlePropertiesType) {
        return instance.put<Array<GeneralTaskType<TaskType>>>(`todo-lists/${todolistId}/tasks/${taskId}`, {properties})
    },
    deleteTask(todolistId:string, taskId:string) {
        return instance.delete<Array<GeneralTaskType>>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },

}