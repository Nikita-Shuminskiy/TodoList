import axios from 'axios';


/*type TaskType = {
    title: string
    description: string
    completed: boolean
    status: string
    priority: string
    startDate: number
    deadline: number
}*/
let a = 0
export type TaskType = {
    description: string
    title: string
    completed: boolean
    status: number
    priority: number
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
    addTask(todolistId:string,title:string) {
        return instance.post<Array<GeneralTaskType<TaskType>>>(`todo-lists/${todolistId}/tasks`, {title})
    },
    updTask(todolistId:string,taskId:string,title:string) {
        return instance.put<Array<GeneralTaskType<TaskType>>>(`todo-lists/${todolistId}/tasks/${taskId}`, {title})
    },
    deleteTask(todolistId:string, taskId:string) {
        return instance.delete<Array<GeneralTaskType>>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },

}