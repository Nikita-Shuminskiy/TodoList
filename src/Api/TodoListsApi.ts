import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '978dde1d-b974-4ee1-a942-d32857675e96'
    }
})

//api
export const todoLists = {
    getTodolists() {
        return instance.get<Array<TodolistType>>('todo-lists')
    },
    delTodoLists(todoId: string) {
        return instance.delete<GeneralTodoListType>(`todo-lists/${todoId}`)
    },
    updTodoLists(title: string, id: string) {
        return instance.put<GeneralTodoListType>(`todo-lists/${id}`, {title})
    },
    createTodoLists(title: string) {
        return instance.post<GeneralTodoListType<{ item: TodolistType }>>('todo-lists', {title})
    },

}


//types
export type TodolistType = {
    id: string
    title: string
    addedDate: string
    order: number
}
type GeneralTodoListType<Data = {}> = {
    data: Data
    fieldsErrors: Array<string>
    messages: Array<string>
    resultCode: number
}