import { ActionType } from '../Store/Store';

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
    status: 'loading' as RequestStatusType,
    error: null as string | null
}

type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return { ...state, error: action.error}
        default:
            return state
    }
}


export const setAppStatus = (status: RequestStatusType) => ({type:'APP/SET-STATUS', status} as const)

export const setAppError = (error: string | null) => ({type:'APP/SET-ERROR', error} as const)