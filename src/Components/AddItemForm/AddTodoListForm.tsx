import React, { ChangeEvent, useState, KeyboardEvent, useCallback } from 'react';
import { IconButton, TextField } from '@material-ui/core';
import '../../App/App.css';
import { AddBox } from '@material-ui/icons';
import { RequestStatusType } from '../../State/App-reducer';


export type AddItemFormType = {
    addItem: (title:string) => void
    entityStatus?:RequestStatusType
}

export const AddTodoListForm = React.memo(function({addItem,entityStatus}: AddItemFormType) {

    const [title, setTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const textError = 'Title is required'

    const addTask = () => {
        if (title.trim() !== '') {
            addItem(title);
            setTitle('');
        } else {
            setError(textError);
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
        <div style={{ marginTop:'20px',marginBottom: '17px' }}>
            <TextField
                value={title}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
                variant={'outlined'}
                helperText={error}
                label={'Title'}
                size={'small'}
                error={!!error}
                disabled={entityStatus === 'loading'}
            />
            <IconButton
                disabled={entityStatus === 'loading'}
                onClick={addTask}
                color={'primary'}
                size={'small'}>
                <AddBox fontSize={'large'}/>
            </IconButton>
        </div>
    )

})