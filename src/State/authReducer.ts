import { AppDispatchType } from '../Store/Store';
import { setAppStatus } from './App-reducer';
import { authMeApi, LoginParamsType } from '../Api/TodoListsApi';
import { handleServerAppError, handleServerNetworkError } from '../Utils/Error-utils';
import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit/dist/createAction';

const slice = createSlice({
    name: 'auth',
    initialState: {
        isLoggedIn: false
    },
    reducers: {
        setIsLoggedIn(state: any, action:PayloadAction<{ value: boolean }>) {
            state.isLoggedIn = action.payload.value
        }
    }
})
export const authReducer = slice.reducer
export const { setIsLoggedIn } = slice.actions
// actions
// thunks
export const loginTC = (data: LoginParamsType) =>
    (dispatch: AppDispatchType) => {
        dispatch(setAppStatus('loading'))
        authMeApi.login(data)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(setIsLoggedIn({value:true}))
                    dispatch(setAppStatus('idle'))
                } else {
                    handleServerAppError(res.data, dispatch)
                }
            }).catch(rej => {
            handleServerNetworkError(rej.messages, dispatch)
        })
}
export const initializeAppTC = () => (dispatch: AppDispatchType) => {
    authMeApi.me().then(res => {
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedIn({value:true}));
        } else {
        }
    })
}
export const logoutTC = () => (dispatch: AppDispatchType) => {
    dispatch(setAppStatus('loading'))
    authMeApi.logout()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedIn({value:false}))
                dispatch(setAppStatus('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}



