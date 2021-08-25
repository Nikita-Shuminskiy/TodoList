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
    data: {
        item: Item
    }
    fieldsErrors: Array<string>
    messages: Array<string>
    resultCode: number
}
type addTaskType<T = {}> = {
    data: { item:T }
    resultCode:number
    message: string
}
const instance = axios.create({
    baseURL:'https://social-network.samuraijs.com/api/1.1/',
    withCredentials:true,
    headers: {
        'API-KEY': 'a64298a1-3682-4ad4-b177-06c041a94c86'
    }
})
export const taskApi = {
    getTasks(todolistId:string) {
       return instance.get<GetTaskType<Array<TaskType>>>(`todo-lists/${todolistId}/tasks`)
    },
    createTask( title:string,todolistId:string) {
        return instance.post<addTaskType<TaskType>>(`todo-lists/${todolistId}/tasks`, {title})
    },
    updTitleTask(taskId:string,properties:TitlePropertiesType, todolistId:string) {
        return instance.put<Array<GeneralTaskType<TaskType>>>(`todo-lists/${todolistId}/tasks/${taskId}`, {properties})
    },
    deleteTask(id: string, todoId: string) {
        return instance.delete<Array<GeneralTaskType>>(`todo-lists/${todoId}/tasks/${id}`)
    },

}