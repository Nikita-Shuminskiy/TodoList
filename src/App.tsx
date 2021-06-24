import React, { useState } from 'react';
import './App.css';
import { Todolist } from './Todolist';
import { v1 } from 'uuid';

export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodoListType = {
    id:string
    title:string
    filter:FilterValuesType
}

function App() {


    function removeTask(id: string , todoID:string) {
        const tasksAl = tasksAll[todoID]
        const filteredTask = tasksAl.filter(f => f.id !== id)
        tasksAll[todoID] = filteredTask
        setAllTasks({...tasksAll})
    }

    function addTask(title: string,todoID:string) {
        let task = {id: v1(), title: title, isDone: false};
        let tasks = tasksAll[todoID]
        let newTasks = [task, ...tasks];
        setAllTasks({...tasksAll})
    }
    function changeStatus(taskId: string, isDone: boolean,todoID:string) {
        let tasks = tasksAll[todoID]
        let task = tasks.find(t => t.id === taskId);
        if (task) {
            task.isDone = isDone;

            setAllTasks({...tasksAll})
        }

    }
    function changeFilter(value: FilterValuesType, idTODO:string) {
        const todolist = tasksTodoID.find(todo => todo.id === idTODO)
            if (todolist){
                todolist.filter = value
                setTodoId([...tasksTodoID])
            }
    }
    function todolistRemoveTasks  (todoID:string)  {
        let tasksAl = tasksTodoID
        let filteredTask = tasksAl.filter(f => f.id !== todoID)
        tasksAl = filteredTask
        setTodoId(tasksAl)


    }
    /*let [filter, setFilter] = useState<FilterValuesType>('all');*/
    const todoListId1 = v1()
    const todoListId2 = v1()
    const [tasksTodoID, setTodoId] = useState<TodoListType[]>( [
        {id: todoListId1, title: 'Hello Task 1', filter: 'all'},
        {id: todoListId2, title: 'Hello task 2', filter: 'completed'},
    ])

    const [tasksAll,setAllTasks] = useState( {
        [todoListId1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
            {id: v1(), title: 'Rest API', isDone: false},
            {id: v1(), title: 'GraphQL', isDone: false},
        ],
        [todoListId2]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
            {id: v1(), title: 'Rest API', isDone: false},
            {id: v1(), title: 'GraphQL', isDone: false},
        ]
    })


    return (
        <div className="App">
            {
                tasksTodoID.map(todo => {
                    let tasksForTodolist = tasksAll[todo.id]
                    if (todo.filter === 'active') {
                        tasksForTodolist = tasksAll[todo.id].filter(t => t.isDone === false);
                    }
                    if (todo.filter === 'completed') {
                        tasksForTodolist = tasksAll[todo.id].filter(t => t.isDone === true);
                    }
                    return (
                        <Todolist
                            idTodo={todo.id}
                            key={todo.id}
                            title={todo.title}
                            tasks={tasksForTodolist}
                            removeTask={removeTask}
                            changeFilter={changeFilter}
                            addTask={addTask}
                            changeTaskStatus={changeStatus}
                            filter={todo.filter}
                            todolistRemoveTasks={todolistRemoveTasks}
                        />
                    )
                })
            }
        </div>
    );
}

export default App;
