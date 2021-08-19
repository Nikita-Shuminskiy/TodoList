import React, { ChangeEvent, useCallback } from 'react';
import { Checkbox, IconButton } from '@material-ui/core';
import { EditInput } from './EditInput';
import { Delete } from '@material-ui/icons';
import { useSelector } from 'react-redux';
import { AppRootStateType } from './Store/Store';
import { TodoListType, TodoTaskType } from './AppRudux';


export type TasksComponentType = {
    todoId:string
    taskId:string
    removeTask: (taskId: string, todoId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todoId: string) => void
    changeTaskValueNew: (taskId: string, valueNew: string, todoId: string) => void
    titleEditInput:string
    isDone:boolean
}

export const Tasks = React.memo(( {todoId,taskId,removeTask,changeTaskStatus,changeTaskValueNew,titleEditInput,isDone}:TasksComponentType ) => {

    console.log('Task-Component')

    const onChangeHandlerWrapper = useCallback ((e: ChangeEvent<HTMLInputElement>) => {
        changeTaskStatus(taskId, e.currentTarget.checked, todoId)
    },[changeTaskStatus,taskId,todoId])

    const onChangeInputValueWrapper = useCallback(function(valueNew: string) {
        changeTaskValueNew(taskId, valueNew, todoId)
    },[changeTaskValueNew,taskId,todoId])

    const removeTaskWrapper = useCallback(() => removeTask(taskId, todoId),[removeTask,taskId,todoId])

    return <li  className={isDone ? 'is-done' : ''}>
        <Checkbox
            checked={isDone}
            color="primary"
            onChange={onChangeHandlerWrapper}
        />
        <EditInput isDone={isDone} title={titleEditInput} onChange={onChangeInputValueWrapper}/>
        <IconButton
            onClick={removeTaskWrapper}
            size={'small'}
        >
            <Delete fontSize={'medium'}/>
        </IconButton>
    </li>
})