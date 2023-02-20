import { storageService } from './async-storage.service'
import { httpService } from './http.service'
import { store } from '../store/store'
import { socketService, SOCKET_EVENT_USER_UPDATED, SOCKET_EMIT_USER_WATCH } from './socket.service'
import { showSuccessMsg } from './event-bus.service'

const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'

export const userService = {
    login,
    loginGoogle,
    logout,
    signup,
    getLoggedinUser,
    saveLocalUser,
    query,
    remove,
    update,
}

window.userService = userService


async function query() {
    const user = await httpService.get(`user/`)
    // socketService.emit(SOCKET_EMIT_USER_WATCH, userId)
    return user
}

function remove(userId) {
    // return storageService.remove('user/', userId)
    return httpService.delete(`user/${userId}`)
}

async function update(user) {
    await storageService.put('user', user)
    // user = await httpService.put(`user/${user._id}`, user)
    // Handle case in which admin updates other user's details
    if (getLoggedinUser()._id === user._id) saveLocalUser(user)
    return user
}

async function login(userCred) {
    const user = await httpService.post('auth/login', userCred)
    if (user) {
        socketService.login(user._id)
        return saveLocalUser(user)
    }
}

async function loginGoogle(userCred) {

    const user = await httpService.post('auth/loginGoogle', userCred)
    if (user) {
        socketService.login(user._id)
        return saveLocalUser(user)
    }
}

async function signup(userCred) {
    if (!userCred.imgUrl) userCred.imgUrl = 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png'
    const user = await httpService.post('auth/signup', userCred)
    socketService.login(user._id)
    return saveLocalUser(user)
}

async function logout() {
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
    socketService.logout()
    return await httpService.post('auth/logout')
}

function saveLocalUser(user) {
    user = { _id: user._id, fullname: user.fullname, imgUrl: user.imgUrl }
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
    return user
}

async function getLoggedinUser() {
    let loggedinUser = JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
    if (!loggedinUser) {
        const users = await userService.query()
        loggedinUser = users.find(user => user.isGuest)
    }
    saveLocalUser(loggedinUser)
    return loggedinUser
}

