<template>
    <li class="task-preview" ref="line" :class="{ 'being-edit': editing || isSelected }"
        v-click-outside="(unSelectLine)">
        <regular-modal v-if="showModal" :cmp="'task-opt-modal'" class="task-opt-modal-parent" @openTask="openTask"
            @removeTask="removeTask" @closeModal="closeModal" @taskTitleToClipboard="copyToClipboard(task.title)"
            @linkToClipboard="copyToClipboard(task.link.url)" @duplicateTask="duplicateTask" />

        <section class="static">
            <div class="options flex center">
                <span class="hidden" @click="openLineOptionModal" v-svg-icon="'fatMore'"></span>
            </div>
            <span class="task-select" :style="{ 'border-left-color': group.style.color }"
                :class="{ 'being-edit': editing || isSelected }">
                <input :checked="isSelected" ref="checkbox" @click="selectTask(task._id)" type="checkbox" />
            </span>
            <router-link class="task-title-container" :to="('/board/' + board._id + '/task/' + task._id)">
                <div :style="{ 'border-left-color': `${group.style.light}` }" class="task-title-item"
                    :class="{ 'being-edit': editing || isSelected }">
                    <p @blur="updateTask({ key: 'title', val: $event.target.innerText })"
                        @keydown.enter.prevent="updateTask({ key: 'title', val: $event.target.innerText })"
                        @click.prevent="" class="task-title" contenteditable="true" v-html="task.title"></p>
                    <div class="hover-marks"><span v-svg-icon="'open'"></span>Open</div>
                </div>
                <span v-if="task.comments?.length" class="task-comment-icon count-comment">
                    <span v-svg-icon="'commentCount'"></span>
                    <span class="task-comments-length">{{ task.comments.length }}</span>
                </span>
                <span v-else v-svg-icon="'addComment'" class="task-comment-icon"></span>
            </router-link>
        </section>
        <section class="dynamic">
            <component v-for="(column, idx) in formattedData" :isKanban="false" :is="column.cmpName + 'Task'"
                :content="column.content" :name="column.name" :additionalDb="column.additionalDb"
                :color="group.style.color" :key="idx" @updateTask="updateTask" @editing="setIsEditing" :colors="colors">
            </component>
        </section>
    </li>
</template>
<script>
import dateTask from './task-columns/date-task.vue'
import linkTask from './task-columns/link-task.vue'
import personTask from './task-columns/person-task.vue'
import labelTask from './task-columns/labels-task.vue'
import timelineTask from './task-columns/timeline-task.vue'
import regularModal from './dynamic-modals/regular-modal.vue'
import numbersTask from './task-columns/numbers-task.vue'
import textTask from './task-columns/text-task.vue'

export default {
    name: 'task-preview',
    emits: ['updateTask', 'removeTask', 'saveSelectedTasks', 'duplicateTask'],
    props: {
        task: Object,
        cmpsOrder: Array,
        users: Array,
        group: {
            type: Object,
            required: true
        },
        additionalDb: Object,
        selectedTasks: {
            type: Array,
            required: false
        },
        isSelected: Boolean,
        areAllChecked: {
            type: Boolean,
            // required: true
        },
        colors: {
            type: Object,
            reqiured: true
        }
    },
    created() {
        this.editing = false
        this.isChecked = false
    },
    data() {
        return {
            showModal: false,
            editing: null,
            isChecked: null,
        }
    },
    computed: {

        formattedData() {
            return this.cmpsOrder.map(cmp => {
                const formattedCmp = {
                    content: this.task[cmp] || null
                }
                switch (cmp) {
                    case 'person':
                        formattedCmp.additionalDb = this.additionalDb.users
                    case 'date':
                    case 'link':
                    case 'timeline':
                    case 'numbers':
                    case 'text':
                        formattedCmp.cmpName = cmp
                        break
                    // formattedCmp.cmpName = 'shallow'
                    // formattedCmp.name = cmp
                    // break
                    case 'priority':
                    case 'status':
                    case 'label':
                        formattedCmp.cmpName = 'label'
                        formattedCmp.name = cmp
                        formattedCmp.additionalDb = this.additionalDb[cmp] || []
                        break
                }

                return formattedCmp
            })
        },
        persons() {
            return this.task.persons.map(person => person.fullname).join(' ')
        },
        board() {
            return this.$store.getters.board
        },

    },
    methods: {
        updateTask({ key, val }) {
            console.log(`key:`, key)
            console.log(`val:`, val)
            const task = this.task
            const oldVal = task[key] || ''
            task[key] = val
            const activity = {
                key,
                oldVal,
                newVal: val,
                taskId: task._id
            }
            this.$emit('updateTask', task, activity)
        },
        openLineOptionModal() {
            this.showModal = true
        },
        openTask() {
            this.$router.push('/board/' + this.board._id + '/task/' + this.task._id)
        },
        removeTask() {
            this.$emit('removeTask', this.task)
            this.showModal = false
        },
        selectTask(taskId) {
            this.$emit('saveSelectedTasks', taskId)
            this.isChecked = !this.isChecked
        },
        copyToClipboard(data) {
            if (!data) return
            this.$copyText(`${data}`)
        },
        setIsEditing() {
            this.editing = true
        },
        unSelectLine() {
            this.editing = false
        },
        duplicateTask() {
            this.$emit('duplicateTask', this.task)
        },
        closeModal() {
            this.showModal = false
        }

    },

    watch: {
        areAllChecked(newState, oldState) {
            if (newState) {
                this.isChecked = true
            } else {
                this.isChecked = false
            }

        },
    },
    components: {
        dateTask,
        linkTask,
        personTask,
        labelTask,
        timelineTask,
        regularModal,
        numbersTask,
        textTask
    }
}
</script>
