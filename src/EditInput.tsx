import React, { ChangeEvent, useCallback, useState } from 'react';
import { TextField } from '@material-ui/core';

type EditInputType = {
    title: string
    onChange:(valueNEW:string) => void
}
export const EditInput = React.memo((props: EditInputType) => {
    console.log('edit-input')
    const [editMode, setEditMode] = useState(false)
    const [title, setTitle] = useState(props.title)

    const onEditSpan = () => {
        setEditMode(true)
        setTitle(props.title)
    }
    const offEditSpan =  () =>{
        setEditMode(false)
        props.onChange(title)

    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    return editMode ? <TextField color={'primary'} size={'small'} autoFocus={true} onBlur={offEditSpan} onChange={onChangeHandler} value={title}/> :
        <span onDoubleClick={onEditSpan}>{props.title}</span>
})