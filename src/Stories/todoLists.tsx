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
    const title = 'asasasasasa'
    const todoId = 'e96f3a07-ba38-4431-a66d-1d77f2f90d33'
    useEffect(() => {
        todoLists.updTodoLists(todoId, title)
            .then((res) => {
                setState(res.data);
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
