import { todoListReducer,  addTodolistAC } from './todoList-reducer';
import { taskReducer } from "./task-reducer";
import { TodoListType, TodoTaskType } from '../AppRudux';


test('ids should be equals', () => {
    const startTasksState: TodoTaskType = {};
    const startTodolistsState: Array<TodoListType> = [];

    const action = addTodolistAC("new todolist");

    const endTasksState = taskReducer(startTasksState, action)
    const endTodolistsState = todoListReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;

    expect(idFromTasks).toBe(action.todolistId);
    expect(idFromTodolists).toBe(action.todolistId);
});


