import axios from 'axios';

const instance = axios.create({
    baseURL:'https://social-network.samuraijs.com/api/1.1/',
    withCredentials:true,
    headers: {
        'API-KEY': '71501a34-a17e-4bd2-be97-8b7458efae32'
    }
})


export type TodolistType= {
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



export const todoLists = {
    getTodolists() {
       return instance.get<Array<TodolistType>>('todo-lists')

    },
    delTodoLists(todoId:string) {
        return instance.delete<Array<GeneralTodoListType>>(`todo-lists/${todoId}`)

    },
    updTodoLists(todoId:string,title:string) {
        return instance.put<Array<GeneralTodoListType>>(`todo-lists/${todoId}`,{title})

    },
    createTodoLists(title:string) {
        return instance.post<Array<GeneralTodoListType<{item: TodolistType}>>>('todo-lists',{title})
    },

}