import { storageService } from "./storage.service"
export const userService = {
    getUser,
    signup,
    logout,
    handleMove,
}

function getUser(){
    return storageService.load('user')
}

function signup(name){
    storageService.store('user', {
        name,
        coins: 100,
        moves: []
       })

    return getUser()
}

function logout(){
    localStorage.clear()
}

function handleMove(move){
    let user = getUser()
    user.coins -= move.amount
    user.moves.push(move)
    console.log(user);
    storageService.store('user', user)
}