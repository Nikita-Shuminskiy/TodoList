import React, { ChangeEvent } from 'react';
import { AddItemTaskForm } from './AddItemTaskForm';
import { EditInput } from './EditInput';
import { Button, Checkbox, IconButton } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import { FilterValuesType, TaskType } from './AppRudux';

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todoId: string) => void
    changeFilter: ( todoId: string,value: FilterValuesType) => void
    addTask: (title: string, todoId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todoId: string) => void
    changeTaskValueNew: (taskId: string, valueNew: string, todoId: string) => void
    filter: FilterValuesType
    id: string
    delTodolist: (id: string) => void
    changeTitleValueNew: ( newTitle: string, id: string) => void
}

export function Todolist(props: PropsType) {
    const changeTitleValueNew = (newTitle: string) => {
        props.changeTitleValueNew( newTitle, props.id)
    }
    const onAllClickHandler = () => props.changeFilter(props.id, 'all', );
    const onActiveClickHandler = () => props.changeFilter( props.id,'active');
    const onCompletedClickHandler = () => props.changeFilter(props.id,'completed');

    function addTaskwrapper(title: string) {
        props.addTask(title, props.id)

    }

    return <div>
        <h3>
            <IconButton onClick={() => props.delTodolist(props.id)} >
                <Delete />
            </IconButton>
            <EditInput title={props.title} onChange={changeTitleValueNew}/>
        </h3>
        <AddItemTaskForm addItem={addTaskwrapper}/>
        <ul style={{listStyle: 'none'}} >
            {
                props.tasks.map(t => {
                    const onClickHandler = () => props.removeTask(t.id, props.id)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(t.id, e.currentTarget.checked, props.id);
                    }

                    function onChangeInputValueNEWwrapper(valueNew: string) {
                        props.changeTaskValueNew(t.id, valueNew, props.id)
                    }

                    return <li  key={t.id} className={t.isDone ? 'is-done' : ''}>
                        <Checkbox
                            checked={t.isDone}
                            color="primary"
                            onChange={onChangeHandler}
                        />
                        <EditInput title={t.title} onChange={onChangeInputValueNEWwrapper}/>
                        <IconButton
                            onClick={onClickHandler}
                            size={'small'}
                        >
                            <Delete fontSize={'medium'} />
                        </IconButton>
                    </li>
                })
            }
        </ul>
        <div>
            <Button

                style={{backgroundColor: 'red'}}
                size={'medium'}
                variant={props.filter === 'all' ? 'outlined': 'contained'}
              /*  color={props.filter === 'all' ? 'secondary' : 'primary'}*/
                    onClick={onAllClickHandler}>All</Button>
            <Button
                variant={props.filter === 'active' ? 'outlined': 'contained'}
                    onClick={onActiveClickHandler}>Active</Button>
            <Button
                variant={props.filter === 'completed' ? 'outlined': 'contained'}
                    onClick={onCompletedClickHandler}>Completed</Button>
        </div>
    </div>
}
