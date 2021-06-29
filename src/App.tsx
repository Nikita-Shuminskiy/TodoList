import React, { useState } from 'react';
import './App.css';
import { Todolist } from './Todolist';
import { v1 } from 'uuid';

export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodoListType = {
    id: string
    title: string
    filter:  FilterValuesType
}
export type todoTaskType = {
    [key:string]: taskType[]
}
export type taskType ={
    id:string
    title:string
    isDone:boolean
}

function App() {
    let todolist1 = v1()
    let todolist2 = v1()
    let [tasks, setTasks] = useState<todoTaskType>({
        [todolist1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true}
    ],
       [todolist2]: [
           {id: v1(), title: 'HTML&CSS', isDone: true},
           {id: v1(), title: 'JS', isDone: true}
       ]
})

 /*   let [filter, setFilter] = useState<FilterValuesType>('all');*/

    function removeTask(id: string,todoId:string) {
        let todolistTask= tasks[todoId]
        tasks[todoId] = todolistTask.filter(t => t.id != id)
        setTasks({...tasks})
    }

    function addTask(title: string,todoId:string) {
        let task = {id: v1(), title: title, isDone: false};
        let newTasks = tasks[todoId]
        tasks[todoId] = [task, ...newTasks]
        setTasks({...tasks})
    }

    function changeStatus(id: string, isDone: boolean,todoId:string) {
        let todolistTask= tasks[todoId]
        let task = todolistTask.find(t => t.id === id)
        if(task) {
            task.isDone = isDone
            setTasks({...tasks})
        }
    }

    function changeFilter(value: FilterValuesType, todoId:string) {
        let todolist = todolists.find(t => t.id === todoId)
        if (todolist) {
            todolist.filter = value
            setTodolist([...todolists])
        }

    }
    function delTask (id:string) {
       setTodolist(todolists.filter(t => t.id != id))
        delete tasks[id]
        setTasks({...tasks})
    }

    const [todolists, setTodolist] = useState<TodoListType[]>([
        {id: todolist1, title: 'New-Todo', filter: 'all'},
        {id: todolist2, title: 'New-Todo', filter: 'all'}
    ])


    return (
        <div className="App">
            {
                todolists.map(t => {
                    let allTaskForTodoList = tasks[t.id]
                    let tasksForTodolist = allTaskForTodoList;
                    if (t.filter === 'active') {
                        tasksForTodolist = allTaskForTodoList.filter(t => t.isDone === false);
                    }
                    if (t.filter === 'completed') {
                        tasksForTodolist = allTaskForTodoList.filter(t => t.isDone === true);
                    }
                    return <Todolist
                        delTask={delTask}
                        id={t.id}
                        key={t.id}
                        title={t.title}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeStatus}
                        filter={t.filter}/>
                })
            }
        </div>
    );
}

export default App;
