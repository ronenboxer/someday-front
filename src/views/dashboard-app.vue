<template>
    <section class="main-app-container" :class="{ 'folded': isWorkspaceCollapsed }">
        <task-nav />
        <board-workspace @addBoard="addBoard" @toggleWorkspace="toggleWorkspace"
            :isWorkspaceCollapsed="isWorkspaceCollapsed" />

        <section class='board-app-container' >
            <regular-modal v-if="false" :cmp="'task-select-modal'" />
            <board-header @saveBoardTitle="saveBoardTitle" :filterBy="filterBy" :users="users"
               />
            <dashboard-list />
            <router-view />
        </section>
    </section>
</template>
<script>
import regularModal from '../cmps/dynamic-modals/regular-modal.vue'
import boardHeader from '../cmps/board-header.vue'
import boardWorkspace from '../cmps/board-workspace.vue'
import taskNav from '../cmps/task-nav.vue'
import dashboardList from '../cmps/dashboard-cmps/dashboard-list.vue'
import { userService } from '../services/user.service.js'

export default {
    name: 'dashboard-app',
    computed: {
        users() {
            return this.$store.getters.users
        },
        route() {
            return this.$route.params.id
        },
        board() {
            return this.$store.getters.board
        },
        isWorkspaceCollapsed() {
            return this.$store.getters.isWorkspaceCollapsed
        },
        filterBy() {
            return this.$store.getters.filterBy
        },
        loggedinUser() {
            return this.$store.getters.loggedinUser
        },
        isViewingTask() {
            return typeof (this.$route.params.taskId) === 'string'
        },
        dataMap() {
            return this.$store.getters.filterMap
        },
        colors() {
            return this.$store.getters.colors
        }

    },
    methods: {
        saveBoard(board) {
            this.$store.commit({ type: 'setBoard', board })
            this.$store.dispatch({ type: 'saveBoard', board })
        },
        addBoard() {
            this.$store.dispatch({ type: 'addBoard' })
        },
        toggleWorkspace() {
            this.$store.commit({ type: 'toggleWorkspace' })
        },
        async saveSelectedTasks(taskId) {
            await this.$store.commit({ type: 'saveSelectedTasks', taskId })
            const idx = this.selectedTasksWithColor.findIndex(anyTask => anyTask.taskId === taskId)
            if (idx === -1) {
                const formattedTaskId = this.getSelectedTasksColors([taskId])
                this.selectedTasksWithColor.push(formattedTaskId[0])
            } else this.selectedTasksWithColor.splice(idx, 1)
        },
        async saveBoardTitle(title) {
            const board = JSON.parse(JSON.stringify(this.board))
            if (board.title === title) return
            board.title = title
            await this.$store.dispatch({ type: 'saveBoard', board })
            this.$store.dispatch({ type: 'loadMiniBoards' })
        },
    },
    async created() {
        const user = await userService.getLoggedinUser()
        this.$store.commit({ type: 'setLoggedinUser', user })
    },
    components: {
        boardHeader,
        boardWorkspace,
        taskNav,
        regularModal,
        dashboardList,
    },
}
</script>