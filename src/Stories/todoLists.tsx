import React, { useEffect, useState } from 'react'
import { todoLists } from '../Api/TodoListsApi';

export default {
    title: 'API'
}



export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todoLists.getTodolists().then(res => {
            setState(res.data);
        })
    }, [])
    return <div> {JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todoLists.createTodoLists('NEWTODODODODOkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkODOD')
            .then(res => {
                setState(res.data);
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    const todoId = '9f8a9aab-46ec-4ddc-9a4d-5f499e4962a1'
    useEffect(() => {
        todoLists.delTodoLists(todoId)
            .then((res) => {
                setState(res.data);
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    const title = 'asasasadsdsdsdsdsdsdsdsdsdsdsdsdssasa'
    const todoId = "7b2cd17a-b6bd-44cf-97ef-f59b0b244555"
    useEffect(() => {
        todoLists.updTodoLists(todoId, title)
            .then((response) => {
                setState(response.data);
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
