import { ActionType } from '../Store/Store';
import { setIsLoggedIn } from './authReducer';
import { Dispatch } from 'redux';
import { authMeApi } from '../Api/TodoListsApi';

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
    status: 'loading' as RequestStatusType,
    error: null as string | null,
    isInitialized: false
}

type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return { ...state, error: action.error}
        case 'APP/SET-INITIALIZED':
            return {...state, isInitialized: action.isInitialized}
        default:
            return state
    }
}


export const setAppStatus = (status: RequestStatusType) => ({type:'APP/SET-STATUS', status} as const)

export const setAppError = (error: string | null) => ({type:'APP/SET-ERROR', error} as const)
export const setIsInitializedAC = (isInitialized: boolean) => ({type:'APP/SET-INITIALIZED', isInitialized} as const)

export const initializeAppTC = () => (dispatch: Dispatch<ActionType>) => {
    authMeApi.me().then(res => {
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedIn({value: true}));
        }
    }).finally(() => {
        dispatch(setIsInitializedAC(true))
    })
}
