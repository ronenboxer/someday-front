import { taskService } from '../services/task.service.js'
import { groupService } from '../services/group.service.js'

export const taskStore = {
    state() {
        return {
            selectedTasks: [],
            selectedTaskColors: [],
        }
    },
    mutations: {
        saveSelectedTasks(state, { taskId }) {
            if (state.selectedTasks.includes(taskId)) {
                const idx = state.selectedTasks.indexOf(taskId)
                state.selectedTasks.splice(idx, 1)
            } else {
                state.selectedTasks.push(taskId)
            }
        },
        unselectTasks(state) {
            state.selectedTasks = []
        },
        toggleSelectAllTasks(state, { tasks, groupId, areAllSelected }) {
            state.selectedTasks = state.selectedTasks.reduce((taskIds, task) => {
                if (!tasks.includes(task)) taskIds.push(task)
                return taskIds
            }, [])
            if (areAllSelected) state.selectedTasks.unshift(...tasks)

        }
    },
    getters: {
        selectedTasks({ selectedTasks }) { return selectedTasks },
    },
    actions: {
        async loadTask(context, { taskId }) {
            try {
                return context.getters.board.groups.some(({ tasks }) => tasks.some(task => {
                    if (task._id === taskId) return task
                }))
            } catch (err) {
                console.log('could not load task');
            }
        },
        async saveTask({ commit, getters, dispatch }, { taskToSave }) {
            try {
                const isFifo = taskToSave.isFifo ? taskToSave.isFifo : false
                const { task } = taskToSave
                if (!task.groupId) {
                    const board = JSON.parse(JSON.stringify(getters.board))
                    if (!board.groups?.length) board.groups = [await groupService.add(board._id)]
                    task.groupId = board.groups[0]._id
                    await taskService.save(task, isFifo)
                    dispatch({ type: 'queryBoard', filter: { id: board._id } })
                } else {
                    const savedTask = await taskService.save(task, isFifo)
                    commit({ type: 'saveTask', savedTask })
                }
                return taskToSave
            } catch (err) {
                console.log(`Cannot save task: ${err}`)
            }
        },
        async duplicateTask({ commit }, { task }) {
            try {
                const duplicatedTask = await taskService.duplicateMultiple([task])
                const taskToSave = { task: duplicatedTask, isFifo: true }
                commit({ type: 'saveTask', taskToSave })
            } catch (err) {
                console.log(`Cannot duplicate task: ${err}`)
            }
        },
        async duplicateMultipleTasks({ commit }, { tasks }) {
            try {
                const duplicatedTasks = await taskService.duplicateMultiple(tasks)
                duplicatedTasks.forEach(duplicatedTask => {
                    const savedTask = { task: duplicatedTask, isFifo: true }
                    commit({ type: 'saveTask', savedTask })
                })
            } catch (err) {
                console.log(`Cannot duplicate task: ${err}`)
            }
        },
        async removeTask({ commit }, { task }) {
            try {
                await taskService.remove(task)
                commit({ type: 'removeTask', task })
            } catch (err) {
                console.log(`Cannot remove task: ${err}`)
            }
        },

    },
}