import { ActionType, AppDispatchType, AppRootStateType } from '../Store/Store';
import { setAppStatus } from './App-reducer';
import { authMeApi, LoginParamsType } from '../Api/TodoListsApi';
import { handleServerAppError, handleServerNetworkError } from '../Utils/Error-utils';

const initialState = {
    isLoggedIn: false
}
type InitialStateType = typeof initialState

export const authReducer = (state: InitialStateType = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.value}
        default:
            return state

    }
}

// actions
export const setIsLoggedInAC = (value: boolean) => ({type: 'login/SET-IS-LOGGED-IN', value} as const)

// thunks
export const loginTC = (data: LoginParamsType) =>
    (dispatch: AppDispatchType) => {
        dispatch(setAppStatus('loading'))
        authMeApi.login(data)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(setIsLoggedInAC(true))
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
            dispatch(setIsLoggedInAC(true));
        } else {
        }
    })
}
export const logoutTC = () => (dispatch: AppDispatchType) => {
    dispatch(setAppStatus('loading'))
    authMeApi.logout()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(false))
                dispatch(setAppStatus('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}



