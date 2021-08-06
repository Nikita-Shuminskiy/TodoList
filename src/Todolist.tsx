import React, { ChangeEvent, useCallback } from 'react';
import { AddTodoListForm } from './AddTodoListForm';
import { EditInput } from './EditInput';
import { Button, Checkbox, IconButton } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import { FilterValuesType, TaskType } from './AppRudux';
import { Tasks } from './Tasks';

type PropsType = {
    titleTodoList: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todoId: string) => void
    changeFilterTasks: (todolistId: string, value: FilterValuesType) => void
    addTask: (title: string, todoId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todoId: string) => void
    changeTaskValueNew: (taskId: string, valueNew: string, todoId: string) => void
    filter: FilterValuesType
    idTodoList: string
    delTodolist: (id: string) => void
    changeTitleTodoList: (newTitle: string, id: string) => void
}

export const Todolist = React.memo(function (props: PropsType) {
    console.log('TodoList')
    const changeTitleValueNewWrapper = useCallback((newTitle: string) => {
        props.changeTitleTodoList(newTitle, props.idTodoList)
    }, [props.changeTitleTodoList, props.idTodoList])

    const onAllClickHandlerWrapper = useCallback(() => props.changeFilterTasks(props.idTodoList, 'all'), [props.changeFilterTasks, props.idTodoList])

    const onActiveClickHandlerWrapper = useCallback(() => props.changeFilterTasks(props.idTodoList, 'active'), [props.changeFilterTasks, props.idTodoList])

    const onCompletedClickHandlerWrapper = useCallback(() => props.changeFilterTasks(props.idTodoList, 'completed'), [props.changeFilterTasks, props.idTodoList])

    const addTaskWrapper = useCallback((title: string) => {
        props.addTask(title, props.idTodoList)
    }, [props.addTask, props.idTodoList])

    const deleteTodoListWrapper = useCallback(() => {
        props.delTodolist(props.idTodoList)
    }, [props.delTodolist, props.idTodoList])



    let tasksForTodolist = props.tasks
    if (props.filter === 'active') {
        tasksForTodolist = props.tasks.filter(t => t.isDone === !true);
    }
    if (props.filter === 'completed') {
        tasksForTodolist = props.tasks.filter(t => t.isDone === !false);
    }

    return <div>
        <h3>
            <IconButton onClick={deleteTodoListWrapper}>
                <Delete/>
            </IconButton>
            <EditInput title={props.titleTodoList} onChange={changeTitleValueNewWrapper}/>
        </h3>
        <AddTodoListForm addItem={addTaskWrapper}/>
        <ul style={{listStyle: 'none'}}>
            {
                tasksForTodolist.map(t => {
                  return <div key={t.id}>
                    <Tasks removeTask={props.removeTask} todoId={props.idTodoList}
                           changeTaskStatus={props.changeTaskStatus}
                           changeTaskValueNew={props.changeTaskValueNew}
                           titleEditInput={t.title}
                            taskId={t.id}
                            isDone={t.isDone}/>
                  </div>
                })
            }
        </ul>
        <div>
            <Button
                style={{backgroundColor: 'red'}}
                size={'medium'}
                variant={props.filter === 'all' ? 'outlined' : 'contained'}
                /*  color={props.filter === 'all' ? 'secondary' : 'primary'}*/
                onClick={onAllClickHandlerWrapper}>All</Button>
            <Button
                variant={props.filter === 'active' ? 'outlined' : 'contained'}
                onClick={onActiveClickHandlerWrapper}>Active</Button>
            <Button
                variant={props.filter === 'completed' ? 'outlined' : 'contained'}
                onClick={onCompletedClickHandlerWrapper}>Completed</Button>
        </div>
    </div>
})
