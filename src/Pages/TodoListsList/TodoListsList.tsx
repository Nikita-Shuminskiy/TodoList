import React, { useCallback, useEffect } from 'react';
import { Grid, Paper } from '@material-ui/core';
import { Todolist } from '../TodoList/Todolist';
import {
    addTodoListThunk,
    changeTodoListFilterAC, deleteTodoListThunk,
    FilterValuesType,
    setTodoListsThunk,
    TodoListDomainType, updateTodoListTitleThunk
} from '../../State/todoList-reducer';
import { useDispatch, useSelector } from 'react-redux';
import { AppRootStateType } from '../../Store/Store';
import { addTaskThunk, removeTaskThunk, updateTaskStatusTC, updateTaskTitleTC } from '../../State/task-reducer';
import { TaskStatuses } from '../../Api/TaskListApi';
import { TodoTaskType } from '../../App/App';
import { AddTodoListForm } from '../../Components/AddItemForm/AddTodoListForm';


type TodoListsListType = {}


export const TodoListsList: React.FC<TodoListsListType> = (props) => {
    const todolists = useSelector<AppRootStateType, TodoListDomainType[]>(state => state.todolists)

    const tasks = useSelector<AppRootStateType, TodoTaskType>(state => state.tasks)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setTodoListsThunk())
    }, [dispatch])

    const removeTask = useCallback(function (id: string, todoId: string) {
        const action = removeTaskThunk(id, todoId)
        dispatch(action)
    }, [dispatch])

    const addTask = useCallback(function (title: string, todoId: string) {
        const action = addTaskThunk(title, todoId)
        dispatch(action)
    }, [dispatch])

    const changeStatus = useCallback(function (id: string, status: TaskStatuses, todoId: string) {
        const action = updateTaskStatusTC(id, status, todoId)
        dispatch(action)
    }, [dispatch])

    const changeTaskValueNew = useCallback(function (id: string, valueNew: string, todoId: string) {
        const action = updateTaskTitleTC(id, valueNew, todoId)
        dispatch(action)
    }, [dispatch])

    const changeFilter = useCallback(function (todolistId: string, value: FilterValuesType) {
        const action = changeTodoListFilterAC(todolistId, value)
        dispatch(action)
    }, [dispatch])

/////////////////////////////////
    const delTodolist = useCallback(function (id: string) {
        const action = deleteTodoListThunk(id)
        dispatch(action)
    }, [dispatch])

    const addTodoList = useCallback(function (title: string) {
        const action = addTodoListThunk(title)
        dispatch(action)
    }, [dispatch])

    const changeTitleTodoList = useCallback(function (title: string, id: string) {
        const action = updateTodoListTitleThunk(title, id)
        dispatch(action)
    }, [dispatch])


    return <>
        <Grid container style={{padding: '20px, 0'}}>
            <AddTodoListForm addItem={addTodoList}/>
        </Grid>
        <Grid container spacing={3}>
            {
                todolists.map(todo => {
                    let allTaskForTodoList = tasks[todo.id]
                    return (
                            <Grid item key={todo.id}>
                                <Paper style={{padding: '20px'}} elevation={5}>
                                    <Todolist
                                        changeTitleTodoList={changeTitleTodoList}
                                        changeTaskValueNew={changeTaskValueNew}
                                        delTodolist={delTodolist}
                                        idTodoList={todo.id}
                                        titleTodoList={todo.title}
                                        tasks={allTaskForTodoList}
                                        removeTask={removeTask}
                                        changeFilterTasks={changeFilter}
                                        addTask={addTask}
                                        changeTaskStatus={changeStatus}
                                        filter={todo.filter}
                                    />
                                </Paper>
                            </Grid>
                    )
                })}
        </Grid>
    </>
};



