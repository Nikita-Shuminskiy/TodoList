
import {
    addTaskAC,
    changeStatusAC,
    changeTaskValueNewAC,
    removeTaskAC,
    taskReducer
} from './task-reducer';
import { removeTodolistAC } from './todoList-reducer';
import { todoTaskType } from '../AppRudux';

let startState: todoTaskType = {}
beforeEach(() => {
    startState = {
        'todolistId1': [
            {id: '1', title: 'CSS', isDone: false},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', isDone: false}
        ],
        'todolistId2': [
            {id: '1', title: 'bread', isDone: false},
            {id: '2', title: 'milk', isDone: true},
            {id: '3', title: 'tea', isDone: false}
        ]
    }
} )


test('correct task should be deleted from correct array', () => {

    const action = removeTaskAC('2', 'todolistId2');

    const endState = taskReducer(startState, action)

    expect(endState).toEqual({
        'todolistId1': [
            {id: '1', title: 'CSS', isDone: false},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', isDone: false}
        ],
        'todolistId2': [
            {id: '1', title: 'bread', isDone: false},
            {id: '3', title: 'tea', isDone: false}
        ]
    });
})
test('correct task should be added to correct array', () => {


    const action = addTaskAC('juce', 'todolistId2');

    const endState = taskReducer(startState, action)

    expect(endState['todolistId1'].length).toBe(3);
    expect(endState['todolistId2'].length).toBe(4);
    expect(endState['todolistId2'][0].id).toBeDefined();
    expect(endState['todolistId2'][0].title).toBe('juce');
    expect(endState['todolistId2'][0].isDone).toBe(true);
})
test('status of specified task should be changed', () => {

    const action = changeStatusAC('2', false, 'todolistId2');

    const endState = taskReducer(startState, action)

    expect(endState['todolistId2'].length).toBe(3);
    expect(endState['todolistId1'].length).toBe(3);
    expect(endState['todolistId2'][1].title).toBe('milk');
    expect(endState['todolistId2'][1].isDone).toBe(false);

});
test('changing the title for TodoListTask', () => {

    const action = changeTaskValueNewAC('1', 'REACT-JS-CSS', 'todolistId1');

    const endState = taskReducer(startState, action)

    expect(endState['todolistId2'][0].title).toBe('bread');
    expect(endState['todolistId1'][1].title).toBe(('JS'));
    expect(endState['todolistId2'][1].title).toBe('milk');
    expect(endState['todolistId1'][0].title).toBe('REACT-JS-CSS');
});
test('property with todolistId should be deleted', () => {

    const action = removeTodolistAC('todolistId2');

    const endState = taskReducer(startState, action)


    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState['todolistId2']).toBeUndefined();
});
