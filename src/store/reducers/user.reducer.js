import { userService } from "../../services/user.service"

 
 const INITIAL_STATE = {
    loggedInUser: userService.getUser()
 }

 export function userReducer(state = INITIAL_STATE, action){
    switch (action.type) {
        case 'SPEND_BALANCE':
            const {loggedInUser} = state
            return{
                ...state,
                loggedInUser: {...loggedInUser, coins: loggedInUser.coins -= action.move.amount, moves: [...loggedInUser.moves, action.move]}
            }
        case 'LOG_IN':
            return{
                ...state,
                loggedInUser: {...action.user}
        }
        case 'LOG_OUT':
            console.log('gere');
            return{
                ...state,
                loggedInUser: ''
        }
    
        default:
           return state
    }
 }