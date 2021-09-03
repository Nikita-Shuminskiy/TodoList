import { v1 } from 'uuid';
import {
    addTodolistAC,
    daleteTodolistAC,
    updateTodoListTitleAC,TodoListDomainType,
    todoListReducer
} from './todoList-reducer';



let todolistId1: string;
let todolistId2: string;
let startState: Array<TodoListDomainType> = []

beforeEach(() => {
    todolistId1: v1();
    todolistId2: v1();
    startState = [
        {
            id: todolistId1,
            title: 'asa',
            order:1,
            addedDate: '121',
            filter: 'all',
        },
        {
            id: todolistId2,
            title:'New Todo11111list',
            order:1,
            addedDate: '121',
            filter: 'all',
        }
    ]
})

test('correct todolist should be removed', () => {

    const endState = todoListReducer(startState, daleteTodolistAC(todolistId1))

    expect(endState.length).toBe(0);
    expect(endState[0].id).toBe(todolistId2);
    expect(endState[0].title).toBe('What to buy');
});
/*
test('correct todolist should be added', () => {

    let newTodolistTitle = 'New Todolist';

    const endState = todoListReducer(startState, addTodolistAC(newTodolistTitle))

    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe(newTodolistTitle);
});
*/

test('correct todolist should change its name', () => {

    let newTodolistTitle = 'New Todolist'
    const action: ReturnType<typeof updateTodoListTitleAC> = {
        type: 'CHANGE-TODOLIST-TITLE',
        title: newTodolistTitle,
        id: todolistId2,
    };

    const endState = todoListReducer(startState, updateTodoListTitleAC(action.title, action.id));

   /* expect(endState[0].title).toBe('asa');*/
    expect(endState[1].title).toBe(newTodolistTitle);
});





