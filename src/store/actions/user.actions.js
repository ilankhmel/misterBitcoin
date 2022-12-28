import { userService } from "../../services/user.service"

export function spendBalance(move){
    return async (dispatch) => {
        userService.handleMove(move)
        dispatch({type:'SPEND_BALANCE', move})
    }
}

export function signup(username){
    return async (dispatch) => {
        const user = userService.signup(username)
        dispatch({type:'LOG_IN', user})
    }
}

export function logout(){
    return async (dispatch) => {
        userService.logout()
        dispatch({type:'LOG_OUT'})
    }
}