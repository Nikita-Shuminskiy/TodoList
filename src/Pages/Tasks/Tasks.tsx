import React, { ChangeEvent, useCallback } from 'react';
import { Checkbox, IconButton } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import { TaskStatuses } from '../../Api/TodoListsApi';
import { EditableSpan } from '../../Components/EditableSpan/EditableSpan';


export type TasksComponentType = {
    todoId: string
    taskId: string
    removeTask: (taskId: string, todoId: string) => void
    changeTaskStatus: (taskId: string, status: TaskStatuses, todoId: string) => void
    changeTaskValueNew: (taskId: string, valueNew: string, todoId: string) => void
    titleEditInput: string
    status: TaskStatuses
}

export const Tasks = React.memo(({
                                     todoId,
                                     taskId,
                                     removeTask,
                                     changeTaskStatus,
                                     changeTaskValueNew,
                                     titleEditInput,
                                     status
                                 }: TasksComponentType) => {

    const onChangeHandlerWrapper = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const newStatusValue = e.currentTarget.checked
        changeTaskStatus(taskId, newStatusValue ? TaskStatuses.Completed : TaskStatuses.New, todoId)
    }, [changeTaskStatus, taskId, todoId])

    const onChangeInputValueWrapper = useCallback(function (valueNew: string) {
        changeTaskValueNew(taskId, valueNew, todoId)
    }, [changeTaskValueNew, taskId, todoId])

    const removeTaskWrapper = useCallback(() => removeTask(taskId, todoId), [removeTask, taskId, todoId])

    return <>
        <li >
            <Checkbox
                className={status === TaskStatuses.Completed ? 'is-done' : ''}
                checked={status === TaskStatuses.Completed}
                color="primary"
                onChange={onChangeHandlerWrapper}
            />
            <EditableSpan  value={titleEditInput} onChange={onChangeInputValueWrapper}/>
            <IconButton onClick={removeTaskWrapper} size={'small'}>
                <Delete fontSize={'medium'}/>
            </IconButton>
        </li>
    </>

})