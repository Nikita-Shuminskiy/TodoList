import React from 'react';
import { useEffect, useState } from 'react'
import { taskApi, TaskType, TitlePropertiesType } from '../Api/TaskListApi';


export default {
    title: 'TASK-API'
}

export const GetTask = () => {
    const [state, setState] = useState<any>(null)
    const todoLists = '7bff4f81-4861-43a4-801c-974b11593ceb'
    useEffect(() => {
        taskApi.getTask(todoLists).then(res => {
            setState(res.data);
        })
    }, [])
    return <div> {JSON.stringify(state)}</div>
}
export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    const todoLists = '7bff4f81-4861-43a4-801c-974b11593ceb'
    const title = 'ASASASASASASASASDSDFsdsdsdsDGFHF'
    useEffect(() => {
        taskApi.createTask(todoLists,title).then(res => {
            setState(res.data);
        })
    }, [])
    state.map((t:TaskType) => {
        return <div key={t.id}>
        <div></div>
            <p>{t.status}</p>
            <p>{t.title}</p>
            <p>{t.priority}</p>
        </div>
    } )
    return <div> {JSON.stringify(state)}</div>
}
export const UpdTitleTask = () => {
    const todoLists = '7bff4f81-4861-43a4-801c-974b11593ceb'
    const taskId = 'ded190b7-296c-4794-879e-2f3c7c8ec07b'
    const title = 'NEWNEWNENWNEWENWNENWNEWNENWNENWETASSSSSK'
    const properties:TitlePropertiesType = {
        title: title,
        description: 'string',
        completed: true,
        status: '2021-08-19T13:12:11.577',
        priority: 'string',
        startDate: '2021-08-19T13:12:11.577',
        deadline: '2021-08-19T13:12:11.577',
    }
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        taskApi.updTitleTask(todoLists,taskId,properties).then(res => {
            setState(res.data);
        })
    }, [])
    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTask = () => {
    const todoLists = '7bff4f81-4861-43a4-801c-974b11593ceb'
    const taskId = '585dcb12-2008-4fc0-a1de-9c4693be924a'
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        taskApi.deleteTask(todoLists,taskId).then(res => {
            setState(res.data);
        })
    }, [])
    return <div> {JSON.stringify(state)}</div>
}
