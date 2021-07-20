import { todoListReducer, AddTodolistAC, removeTodolistAC } from './todoList-reducer';
import { taskReducer } from "./task-reducer";
import { TodoListType, todoTaskType } from '../App';


test('ids should be equals', () => {
    const startTasksState: todoTaskType = {};
    const startTodolistsState: Array<TodoListType> = [];

    const action = AddTodolistAC("new todolist");

    const endTasksState = taskReducer(startTasksState, action)
    const endTodolistsState = todoListReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;

    expect(idFromTasks).toBe(action.todolistId);
    expect(idFromTodolists).toBe(action.todolistId);
});


