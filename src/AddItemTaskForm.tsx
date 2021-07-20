import React, { ChangeEvent, useState, KeyboardEvent } from 'react';
import { IconButton, TextField } from '@material-ui/core';
import './App.css';
import { AddBox } from '@material-ui/icons';


export type AddItemFormType = {
    addItem: (title: string) => void
}

export function AddItemTaskForm(props: AddItemFormType) {
    const [title, setTitle] = useState('')
    const [error, setError] = useState<string | null>(null)
    const addTask = () => {
        if (title.trim() !== '') {
            props.addItem(title.trim());
            setTitle('');
        } else {
            setError('Title is required');
        }
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError('')

    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.charCode === 13) {
            addTask();
        }
    }
    return (
        <div>
            <TextField
                value={title}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
                variant={'outlined'}
                helperText={error}
                label={'Title'}
                size={'small'}
                error={!!error}
            />
            <IconButton
                onClick={addTask}
                color={'primary'}
                size={'small'}>
                <AddBox fontSize={'large'}/>
            </IconButton>
        </div>
    )

}