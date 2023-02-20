import { boardService } from '../services/board.service'
import { colorService, colors } from '../services/color.service.js'
import { router } from '../router.js'

export const boardStore = {
    state: {
        board: {},
        filteredBoard: {},
        kanbanBoard: {},
        firstBoardId: null,
        miniBoards: null,
        isWorkspaceCollapsed: false,
        filter: {},
        dataMap: {},
        colors: {},
        stats: {},
    },
    getters: {
        board({ board },) { return board },
        filteredBoard({ filteredBoard },) { return filteredBoard },
        boardsTitles({ boardsTitles }) { return boardsTitles.map(board => board.title) },
        miniBoards({ miniBoards }) { return miniBoards },
        filter({ filter }) { return filter },
        dataMap({ dataMap }) { return dataMap },
        stats({ stats }) { return stats },
        isWorkspaceCollapsed({ isWorkspaceCollapsed }) { return isWorkspaceCollapsed },
        colors({ colors }) { return colors },
        stats({ stats }) { return stats },
    },
    mutations: {
        setBoard(state, { boardData }) {
            if (boardData.board) {
                state.board = boardData.board
                state.filteredBoard = boardData.board
            }
            if (boardData.dataMap) state.dataMap = boardData.dataMap
            if (boardData.miniBoards) state.miniBoards = boardData.miniBoards
            if (boardData.stats) state.stats = boardData.stats
        },
        setFilter(state, { filter }) {
            state.filter = filter
            this.commit({ type: 'filterBoard', filter })
        },
        setFirstBoardId(state, { boardId }) {
            state.firstBoardId = boardId
        },
        filterBoard(state, { filter }) {
            state.filteredBoard = boardService.filterBoard(state.board, filter)
        },
        updateMiniBoard(state, { board }) {
            const idx = state.miniBoards.findIndex(mini => mini._id === board._id)
            state.miniBoards[idx].title = board.title
        },
        removeMiniBoard(state, {boardId}){
            const idx = state.miniBoards.findIndex(mini => {
                return mini._id === boardId
            })
            state.miniBoards.splice(idx,1)
        },
        setStatuses(state, { statuses }) {
            state.statuses = statuses
        },
        saveTask(state, { savedTask }) {
            const { task, isFifo } = savedTask
            const groupIdx = state.board.groups.findIndex(group => group._id === task.groupId)
            if (groupIdx === -1) return null
            const taskIdx = state.board.groups[groupIdx].tasks.findIndex(anyTask => anyTask._id === task._id)
            if (taskIdx === -1) {
                if (isFifo) state.board.groups[groupIdx].tasks.push(task)
                else state.board.groups[groupIdx].tasks.unshift(task)
            } else state.board.groups[groupIdx].tasks[taskIdx] = task
            this.commit({ type: 'filterBoard', filter: {} })
        },
        removeTask(state, { task }) {
            const groupIdx = state.board.groups.findIndex(anyGroup => anyGroup._id === task.groupId)
            if (groupIdx === -1) return
            const taskIdx = state.board.groups[groupIdx].tasks.findIndex(anyTask => anyTask._id === task._id)
            if (taskIdx < 0) return
            state.board.groups[groupIdx].tasks.splice(taskIdx, 1)
            this.commit({ type: 'filterBoard', filter: {} })
        },
        addGroup(state, { group, isFifo }) {
            isFifo ? state.board.groups.push(group) : state.board.groups.unshift(group)
            this.commit({ type: 'filterBoard', filter: {} })
        },
        saveGroup(state, { group }) {
            const idx = state.board.groups.findIndex(anyGroup => anyGroup._id === group._id)
            state.board.groups[idx] = group
            this.commit({ type: 'filterBoard', filter: {} })
        },
        removeGroup(state, { group }) {
            var idx = state.board.groups.findIndex(anyGroup => anyGroup._id === group._id)
            state.board.groups.splice(idx, 1)
            this.commit({ type: 'filterBoard', filter: {} })
        },
        toggleWorkspace(state) {
            state.isWorkspaceCollapsed = !state.isWorkspaceCollapsed
            boardService.saveToSessionStorage('workspace', state.isWorkspaceCollapsed)
        },
        setWorkspaceState(state) {
            const workspaceState = boardService.loadFromSessionStorage('workspace')
            state.isWorkspaceCollapsed = JSON.parse(workspaceState)
        },
        setColors(state, { colors }) {
            state.colors = colors
        },
        updateLabels(state, { type, title, value, id }) {
            const colors = state.colors
            if (!type || !colors[type] || !id || (!title && !value)) return
            const idx = colors[type].findIndex(label => label._id === id)
            if (idx === -1) return
            if (title) colors[type][idx].title = title
            if (value) colors[type][idx].value = value
        }
    },
    actions: {
        async saveBoard({ commit }, { board }) {
            try {
                board.groups.forEach(group => group.tasks.forEach(task => task.groupId = group._id))
                commit({ type: 'setBoard', boardData: { board } })
                commit({ type: 'updateMiniBoard', board })
                board = await boardService.save(board)
                return board
            } catch (err) {
                console.log('boardStore: Error in saveBoard', err)
                throw err
            }
        },
        async addBoard({ commit }) {
            try {
                const data = await boardService.getEmptyBoard()
                const { board } = data
                commit({ type: 'setBoard', boardData: data })
                router.push('/board/' + board._id)
            } catch (err) {
                console.log('boardStore: Error in addBoard', err)
                throw err
            }
        },
        async removeBoard({ commit }, { boardId }) {
            try {
                const res = await boardService.remove(boardId)
            } catch (err) {
                console.log('boardStore: Error in addBoard', err)
                throw err
            }
        },
        async queryBoard({ commit, state }, { filter }) {
            try {
                commit({ type: 'setFilter', filter })
                const boardData = await boardService.query(filter.id ? filter.id : '')
                commit({ type: 'setBoard', boardData })
                commit({ type: 'filterBoard', filter })
                // boardService.getDashboardData(boardData.board)
            } catch (err) {
                console.log('Could not find board');
                throw new Error()
            }
        },
        async getFirstBoard({ commit }) {
            try {
                const board = await boardService.query()
                commit({ type: 'setBoard', boardData: { board } })
            } catch (err) {
                console.log('Could not find board');
            }

        },
        saveLabel({ dispatch }, { type, title, value, id }) {
            if (colorService.save(type, title, value, id)) dispatch({ type: loadColors })
        },
        updateLabel({ dispatch }, { type, title, value, id }) {
            if (colorService.update(type, title, value, id)) dispatch({ type: loadLabels })
        },
        removeLabel({ dispatch }, { type, id }) {
            if (colorService.update(type, id)) dispatch({ type: loadLabels })
        },
        loadColors({ commit }) {
            commit({ type: 'setColors', colors: colors() })
        }
    }
}