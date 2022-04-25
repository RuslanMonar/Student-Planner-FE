import {SAVE_USER_SUCCESS, LOGOUT} from "../Redux/AuthReducer";

export const SaveUserAction = (payload) => ({type:SAVE_USER_SUCCESS, payload})
export const LogOutAction = (payload) => ({type:LOGOUT, payload})

