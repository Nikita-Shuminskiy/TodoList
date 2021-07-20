import React, { ChangeEvent } from 'react';
import { FilterValuesType, TaskType } from './App';
import { AddItemTaskForm } from './AddItemTaskForm';
import { EditInput } from './EditInput';
import { Button, IconButton} from '@material-ui/core';
import { Delete, CheckBox, CheckRounded } from '@material-ui/icons';

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todoId: string) => void
    changeFilter: (value: FilterValuesType, todoId: string) => void
    addTask: (title: string, todoId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todoId: string) => void
    changeTaskValueNew: (taskId: string, valueNew: string, todoId: string) => void
    filter: FilterValuesType
    id: string
    delTask: (id: string) => void
    changeTitleValueNew: (id: string, newTitle: string) => void
}

export function Todolist(props: PropsType) {
    const changeTitleValueNew = (newTitle: string) => {
        props.changeTitleValueNew(props.id, newTitle)
    }
    const onAllClickHandler = () => props.changeFilter('all', props.id);
    const onActiveClickHandler = () => props.changeFilter('active', props.id);
    const onCompletedClickHandler = () => props.changeFilter('completed', props.id);

    function addTaskwrapper(title: string) {
        debugger
        props.addTask(title, props.id)

    }

    return <div>
        <h3>
            <IconButton onClick={() => props.delTask(props.id)} >
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
                        {/*<CheckBox  onChange={onChangeHandler} checked={t.isDone} />*/}
                        <input type="checkbox"
                               onChange={onChangeHandler}
                               checked={t.isDone}/>
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
