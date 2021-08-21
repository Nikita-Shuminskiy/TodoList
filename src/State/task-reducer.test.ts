import { addTaskAC, changeStatusAC, changeTaskValueNewAC, removeTaskAC, taskReducer } from './task-reducer';
import { removeTodolistAC } from './todoList-reducer';
import { TodoTaskType } from '../AppRudux';
import { TaskPriorities, TaskStatuses } from '../Api/TaskListApi';
import { v1 } from 'uuid';

let startState: TodoTaskType = {}
beforeEach(() => {
    startState = {
        'todolistId1': [
            {
                id: '1',
                title: '1',
                status: TaskStatuses.New,
                description: '2121',
                priority: TaskPriorities.Hi,
                startDate: 212,
                deadline: 1212,
                todoListId: '1',
                order: 1,
                addedDate: 23232,
                completed: false,
            },
            {
                id: v1(),
                title: '2',
                status: TaskStatuses.Completed,
                description: '2121',
                priority: TaskPriorities.Hi,
                startDate: 212,
                deadline: 1212,
                todoListId: '1',
                order: 1,
                addedDate: 23232,
                completed: false,
            },
            {
                id: v1(),
                title: '3',
                status: TaskStatuses.New,
                description: '2121',
                priority: TaskPriorities.Hi,
                startDate: 212,
                deadline: 1212,
                todoListId: '1',
                order: 1,
                addedDate: 23232,
                completed: false,
            },
        ],
        'todolistId2': [
            {
                id: v1(),
                title: '123',
                status: TaskStatuses.New,
                description: '2121',
                priority: TaskPriorities.Hi,
                startDate: 212,
                deadline: 1212,
                todoListId: '1',
                order: 1,
                addedDate: 23232,
                completed: false,
            },
            {
                id: v1(),
                title: '123',
                status: TaskStatuses.Completed,
                description: '2121',
                priority: TaskPriorities.Hi,
                startDate: 212,
                deadline: 1212,
                todoListId: '1',
                order: 1,
                addedDate: 23232,
                completed: false,
            },
            {
                id: 2,
                title: '123',
                status: TaskStatuses.New,
                description: '2121',
                priority: TaskPriorities.Hi,
                startDate: 212,
                deadline: 1212,
                todoListId: '1',
                order: 1,
                addedDate: 23232,
                completed: false,
            },
        ],
    }
} )
test('correct task should be deleted from correct array', () => {
    const action = removeTaskAC('2', 'todolistId2');
    const endState = taskReducer(startState, action)
    expect(endState).toEqual({
        'todolistId1': [
            {
                id: '1',
                title: '1',
                status: TaskStatuses.New,
                description: '2121',
                priority: TaskPriorities.Hi,
                startDate: 212,
                deadline: 1212,
                todoListId: '1',
                order: 1,
                addedDate: 23232,
                completed: false,
            },
            {
                id: '2',
                title: '2',
                status: TaskStatuses.Completed,
                description: '2121',
                priority: TaskPriorities.Hi,
                startDate: 212,
                deadline: 1212,
                todoListId: '1',
                order: 1,
                addedDate: 23232,
                completed: false,
            },
            {
                id: '3',
                title: '3',
                status: TaskStatuses.New,
                description: '2121',
                priority: TaskPriorities.Hi,
                startDate: 212,
                deadline: 1212,
                todoListId: '1',
                order: 1,
                addedDate: 23232,
                completed: false,
            },
        ],
        'todolistId2': [
            {
                id: v1(),
                title: '123',
                status: TaskStatuses.New,
                description: '2121',
                priority: TaskPriorities.Hi,
                startDate: 212,
                deadline: 1212,
                todoListId: '1',
                order: 1,
                addedDate: 23232,
                completed: false,
            },
            {
                id: v1(),
                title: '123',
                status: TaskStatuses.Completed,
                description: '2121',
                priority: TaskPriorities.Hi,
                startDate: 212,
                deadline: 1212,
                todoListId: '1',
                order: 1,
                addedDate: 23232,
                completed: false,
            },
        ],
    });
})
test('correct task should be added to correct array', () => {
    const action = addTaskAC('newTask', 'todolistId2');
    const endState = taskReducer(startState, action)

    expect(endState['todolistId1'].length).toBe(3);
    expect(endState['todolistId2'].length).toBe(4);
    expect(endState['todolistId2'][0].id).toBeDefined();
    expect(endState['todolistId2'][0].title).toBe('newTask');
    expect(endState['todolistId2'][0].status).toBe(TaskStatuses.New);
})
test('status of specified task should be changed', () => {

    const action = changeStatusAC('2', TaskStatuses.New, 'todolistId2');

    const endState = taskReducer(startState, action)

    expect(endState['todolistId2'].length).toBe(3);
    expect(endState['todolistId1'].length).toBe(3);
    expect(endState['todolistId2'][1].title).toBe('123');
    expect(endState['todolistId2'][1].status).toBe(TaskStatuses.Completed);

});
test('changing the title for TodoListTask', () => {

    const action = changeTaskValueNewAC('1', 'REACT-JS-CSS', 'todolistId1');

    const endState = taskReducer(startState, action)

    expect(endState['todolistId2'][0].title).toBe('123');
    expect(endState['todolistId1'][1].title).toBe(('2'));
/*    expect(endState['todolistId2'][2].title).toBe('titleId2');*/
    expect(endState['todolistId1'][0].title).toBe('REACT-JS-CSS');
});
test('property with todolistId should be deleted', () => {

    const action = removeTodolistAC('todolistId2');

    const endState = taskReducer(startState, action)


    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState['todolistId2']).toBeUndefined();
});
