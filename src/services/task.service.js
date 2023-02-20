import { httpService } from './http.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'
import { socketService } from './socket.service.js'

const TASK_URL = 'task/'

export const taskService = {
    save,
    remove,
    duplicateMultiple,
    newTask
}

async function save(task, isFifo = true, isDuplicate = false) {
    let savedTask
    if (task._id) savedTask = await httpService.put(TASK_URL + task._id, { task, isFifo, isDuplicate })
    else savedTask = await httpService.post(TASK_URL, { task, isFifo, isDuplicate })

    const loggedinUser = await userService.getLoggedinUser()
    savedTask = { task: savedTask, isFifo }
    socketService.emit('save-task', { savedTask, loggedinUser })
    return savedTask
}

async function newTask(groupId, boardId) {
    return {
        title: 'Item 1',
        status: 'qwdlk',
        priority: 'qwdlk',
        groupId,
        boardId
    }
}

async function remove(task) {
    const miniTask = { _id: task._id, groupId: task.groupId, boardId: task.boardId }
    const removedTask = await httpService.delete(TASK_URL, miniTask)
    const loggedinUser = await userService.getLoggedinUser()
    socketService.emit('remove-task', { removedTask, loggedinUser })
    return removedTask
}

async function duplicateMultiple(tasks) {
    const tasksToDuplicate = tasks.map(task => {
        const clonedTask = JSON.parse(JSON.stringify(task))
        clonedTask._id = utilService.makeId()
        return clonedTask
    })
    const loggedinUser = await userService.getLoggedinUser()
    socketService.emit('duplicate-tasks', { tasksToDuplicate, loggedinUser })
    _saveMultiple(tasks, tasksToDuplicate)
    return tasksToDuplicate
}

async function _saveMultiple(tasks, tasksCopy) {
    const { boardId } = tasks[0]
    await httpService.post(TASK_URL + 'many/', { tasks, tasksCopy, boardId })
}