import axios from 'axios';

const instance = axios.create({
    baseURL:'https://social-network.samuraijs.com/api/1.1/',
    withCredentials:true,
    headers: {
        'API-KEY': '71501a34-a17e-4bd2-be97-8b7458efae32'
    }
})


type TodolistType= {
    id: string
    addedDate: string
    order: number
    title: string
}
type CreateTodolistResponseType = {
    resultCode: number
    messages: Array<string>
    data: {
        item: TodolistType
    }
}
type UpdateTodolistResponseType = {
    resultCode: number
    messages: Array<string>
    data: {}
}
type DeleteTodolistResponseType = {
    resultCode: number
    messages: Array<string>
    data: {}
}



export const todoLists = {
    getTodolists() {
       return instance.get<Array<TodolistType>>('todo-lists')

    },
    delTodoLists(todoId:string) {
        return instance.delete(`todo-lists/${todoId}`)

    },
    updTodoLists(todoId:string,title:string) {
        return instance.put(`todo-lists/${todoId}`,{title})

    },
    createTodoLists(title:string) {
        return instance.post<Array<CreateTodolistResponseType>>('todo-lists',{title})
    },

}