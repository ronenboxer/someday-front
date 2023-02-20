<template>

    <section class=''>
        <draggable v-if="kanbanBoard?.groups?.length" v-model="kanbanBoard.groups" animation="220"
            itemKey="element.title" :class="{ 'group-dragged': beingDragged }" class="kanban-group-list-container"
            @end="saveBoard(JSON.parse(JSON.stringify(this.$store.getters.board)))" delay="250" :delay-on-touch-only="true">
            <template #item="{ element }">
                <section class="group-preview" :style="getBorder(element)">
                    <div class="group-title" :style="getColor(element)">
                        <h1>{{ element.title }}</h1>
                    </div>
                    <group-preview :group="element" @saveTasks="saveGroup" :kanbanType="kanbanBoard.kanbanType"
                        @addTask="addTask" />
                </section>
            </template>
        </draggable>

    </section>

</template>
<script>
import draggable from 'vuedraggable'
import taskList from './kanban-task-list.vue'
import groupPreview from './kanban-group-preview.vue'

// import triangleModal from './dynamic-modals/triangle-modal.vue'
export default {
    name: 'kanban-group-list',
    props: {
        kanbanBoard: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            show: false,
            beingDragged: false,
            boardToShow: [],

        }
    },
    computed: {
        users() { return this.$store.getters.users },
    },
    methods: {
        updateTask(personsObj) {
            this.$emit('updateTask', personsObj)
        },
        hide() {
            setTimeout(() => this.show = false, 1)
        },
        clickToEdit() {
            this.show = true
            this.$emit('editing')
        },
        getColor(label) {
            return `background-color:${label.color}; `
        },
        getBorder(label) {
            return `border-left: ${label.color} 4px solid;`
        },
        saveGroup() {
            const board = JSON.parse(JSON.stringify(this.$store.getters.board))
            const type = this.kanbanBoard.kanbanType
            if (!board.taskIdOrder) board.taskIdOrder = {}
            if (!board.taskIdOrder[type]) board.taskIdOrder[type] = {}
            board.taskIdOrder[type] = this.kanbanBoard.groups.reduce((taskIdOrder, group) => {
                taskIdOrder[group._id] = group.tasks.map(task => task._id)
                group.tasks.forEach(task => {
                    task[type] = group._id
                    const res = this.updateTask(board, task._id, type, group._id)
                })

                return taskIdOrder
            }, {})
            this.saveBoard(board)
        },
        saveBoard(board) {
            const type = this.kanbanBoard.kanbanType
            // board.groups.forEach((group, idx) => {
            //     group.tasks.forEach(task => task[type] = board.taskIdOrder[type][idx])



            // })
            board.kanbanOrder[type] = this.kanbanBoard.groups.map(group => group._id)
            this.$store.dispatch({ type: 'saveBoard', board })
        },
        updateTask(board, taskId, key, val) {
            return board.groups.some(group => {
                return group.tasks.some(task => {
                    if (task._id === taskId) {
                        task[key] = val
                        return true
                    }
                    return false
                })
            })
        },
        addTask(task) {
            task.groupId = this.kanbanBoard.firstGroupId
            task.boardId = this.kanbanBoard._id
            const taskToSave = {
                task,
                isFifo: true
            }
            this.$store.dispatch({ type: 'saveTask', taskToSave })
            const group = this.kanbanBoard.groups.find(anyGroup => anyGroup._id === task[this.kanbanBoard.kanbanType])
            group.tasks.push(task)
            // this.$emit('addTask',task)
        }
    },
    async created() {
    },
    components: {
        taskList,
        groupPreview,
        draggable,
        // triangleModal
    }
}
</script>
