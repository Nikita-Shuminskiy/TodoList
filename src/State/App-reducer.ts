import { ActionType } from '../Store/Store';
import { setIsLoggedIn } from './authReducer';
import { Dispatch } from 'redux';
import { authMeApi } from '../Api/TodoListsApi';
import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit/dist/createAction';

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
type InitialStateType = typeof initialState
const initialState = {
    status: 'idle' as RequestStatusType,
    error: null as string | null,
    isInitialized: false
}
const slice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        setAppStatus(state: any, action:PayloadAction<{ status: RequestStatusType }>) {
            state.status = action.payload.status
        },
        setAppError(state: any, action:PayloadAction<{ error: string | null }>) {
            state.error = action.payload.error
        },
        setIsInitializedAC(state: any, action:PayloadAction<{ isInitialized: boolean }>) {
            state.isInitialized = action.payload.isInitialized
        },
    }
})
export const appReducer = slice.reducer
export const { setAppStatus,setAppError,setIsInitializedAC } = slice.actions

export const initializeAppTC = () => (dispatch: Dispatch<ActionType>) => {
    authMeApi.me().then(res => {
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedIn({value: true}));
        }
    }).finally(() => {
        dispatch(setIsInitializedAC({isInitialized: true}))
    })
}
