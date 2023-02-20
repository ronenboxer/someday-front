<template>

    <section class='group-list-container' v-if="boardToShow" @scroll="scrolling">
        <draggable v-model="boardToShow.groups" group="groups" ghost-class="ghost" animation="220" itemKey="element._id"
            @end="saveBoard(boardToShow.cmpsOrder)" handle=".group-preview-title" delay="250" :delay-on-touch-only="true"  direction="vertical" :direction="'vertical'">
            <template #item="{ element }" >
                <group-preview @addColumn="addColumn" @saveSelectedTasks="saveSelectedTasks"
                    :selectedTasks="selectedTasks" :group="element" :cmpsOrder="cmpsOrder" :users="users"
                    :key="element._id" @toggleSelectAllTasks="toggleSelectAllTasks" @saveTask="saveTask"
                    @removeTask="removeTask" @saveGroup="saveGroup" @saveBoard="saveBoard" @addGroup="addGroup"
                    @removeGroup="removeGroup" @duplicateGroup="duplicateGroup" @duplicateTask="duplicateTask"
                    :colors="colors" @removeColumn="removeColumn" />
            </template>
        </draggable>

        <button class="add-group-list-btn flex center" @click="addGroup(true)">
            <span v-svg-icon="'addbig'"></span>
            <div>Add new group</div>
        </button>
    </section>




</template>
<script>
import groupPreview from './group-preview.vue'
import draggable from 'vuedraggable'
import { eventBus } from '../services/event-bus.service'

export default {
    name: 'group-list',
    emits: ['saveTask', 'removeTask', 'saveGroup', 'addGroup', 'removeGroup', 'saveSelectedTasks', 'saveBoard', 'select', 'toggleSelectAllTasks', 'duplicateGroup', 'duplicateTask'],
    props: {
        users: Array,
        board: Object,
        selectedTasks: {
            type: Array,
            required: false
        },
        colors: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            beingDragged: false,
        }
    },
    mounted() {
        eventBus.on('reload', board => this.boardToShow = JSON.parse(JSON.stringify(board)))
    },
    methods: {
        saveBoard(cmpsOrder) {
            this.beingDragged = false
            this.$emit('saveBoard', { ...this.boardToShow, cmpsOrder })
        },
        saveTask(task, activity) {
            this.boardToShow.groups.forEach(group => {
                group.tasks.forEach(task => task.groupId = group._id)
            })
            this.$emit('saveTask', task, activity)
        },
        removeTask(task) {
            this.$emit('removeTask', task)
        },
        duplicateTask(task) {
            this.$emit('duplicateTask', task)
        },
        saveGroup(group) {
            this.$emit('saveGroup', group)
        },
        removeGroup(group) {
            this.$emit('removeGroup', group)
        },
        addGroup(isFifo = true) {
            this.$emit('addGroup', isFifo)
        },
        saveSelectedTasks(taskId) {
            this.$emit('saveSelectedTasks', taskId)
        },
        scrolling(event) {
            const { scrollLeft } = event.target
        },
        toggleSelectAllTasks(tasks, groupId, areAllSelected) {
            this.$emit('toggleSelectAllTasks', tasks, groupId, areAllSelected)
        },
        duplicateGroup(group) {
            this.$emit('duplicateGroup', group)
        },
        addColumn(cmp) {
            const board = JSON.parse(JSON.stringify(this.board))
            board.cmpsOrder.push(cmp)
            this.$emit('saveBoard', board)
        },
        removeColumn(column) {
            const board = JSON.parse(JSON.stringify(this.board))
            const idx = board.cmpsOrder.indexOf(column)
            if (idx === -1) return
            board.cmpsOrder.splice(idx, 1)
            this.$emit('saveBoard', board)
        }
    },
    computed: {
        cmpsOrder: {
            get() {
                return [...this.board.cmpsOrder]
            },
            set(cmpsOrder) {
                this.saveBoard(cmpsOrder)
            }
        },
        boardToShow() {
            return JSON.parse(JSON.stringify(this.board))
        },
        isNarrow() {
            return window.innerWidth <= 500

        }
    },
    components: {
        groupPreview,
        draggable
    },
}
</script>