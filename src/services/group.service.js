import { httpService } from './http.service.js'
import { colorService } from './color.service.js'
import { utilService } from './util.service.js'
import { socketService } from './socket.service.js'

const GROUP_URL = 'group/'

export const groupService = {
    query,
    save,
    remove,
    add,
    duplicate
}

async function query(filterBy = {}) {
    return await httpService.get(GROUP_URL, filterBy)
}

async function remove(group) {
    const { _id: groupId, boardId } = group
    const loggedinUser = await userService.getLoggedinUser()
    socketService.emit('remove-group', { group, loggedinUser })
    return await httpService.delete(GROUP_URL, { groupId, boardId })
}

async function save(group, isFifo = false) {
    if (group._id) {
        const loggedinUser = await userService.getLoggedinUser()
        socketService.emit('update-group', { group, loggedinUser })
        const savedGroup = httpService.put(GROUP_URL + group._id, { group, isFifo })
        return savedGroup
    } else {
        return await httpService.post(GROUP_URL, { group, isFifo })
    }
}

async function duplicate(groupId, boardId) {
    return await httpService.post(GROUP_URL + groupId, { groupId, boardId })
}

async function add(boardId, isFifo = true) {
    const newGroup = await _getNewGroup(boardId)
    const group = await save(newGroup, isFifo)
    const loggedinUser = await userService.getLoggedinUser()
    socketService.emit('save-group', { data: { group, isFifo }, loggedinUser })
    return group
}

async function _getNewGroup(boardId) {
    const { _id, fullname } = await userService.getLoggedinUser()
    const color = colorService.randomColor('group')
    return {
        title: 'New Group',
        boardId,
        createdAt: Date.now(),
        createdBy: { _id, fullname },
        style: { color, light: color + '99' },
        tasks: [
            {
                _id: utilService.makeId(),
                boardId,
                title: 'item 1',
                comments: [],
                status: 'dfbyc',
                priority: 'qwdlk',
                createdAt: Date.now(),
                createdBy: { _id, fullname },
            },
            {
                _id: utilService.makeId(),
                boardId,
                title: 'item 2',
                comments: [],
                status: '34f9e',
                priority: 'qwdlk',
                createdAt: Date.now(),
                createdBy: { _id, fullname },
            },
            {
                _id: utilService.makeId(),
                boardId,
                title: 'item 3',
                comments: [],
                status: 'qwdlk',
                priority: 'qwdlk',
                createdAt: Date.now(),
                createdBy: { _id, fullname },
            }
        ]
    }
}

