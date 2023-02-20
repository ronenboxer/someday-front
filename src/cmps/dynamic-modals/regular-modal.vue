<template>
    <section @keydown.escape="closeModal" class='regular-modal' v-click-outside="closeModal">
        <component @addColumn="addColumn" :cmpsOrder="cmpsOrder" @updateSelection="updateSelection" :idx="idx"
            :selectedTasks="selectedTasks" :filter="filter" @setFilter="setFilter" :is="cmp" @openTask="openTask"
            :users="users" @removeTask="removeTask" @addGroup="addGroup" @removeGroup="removeGroup" :id="id"
            @editGroupTitle="editGroupTitle" :selectedColor="selectedColor" @propagateMenu="propagateMenu"
            @deleteMultiple="deleteSelectedTasks" @duplicateMultiple="duplicateSelectedTasks"
            @taskTitleToClipboard="taskTitleToClipboard" @linkToClipboard="linkToClipboard"
            @duplicateGroup="duplicateGroup" @duplicateTask="duplicateTask" :colors="colors" :name="name" />
    </section>
</template>

<script>
import addColumnModal from './add-column-modal.vue'
import taskOptModal from '../regular-modal-cmps/task-opt-modal.vue'
import groupOptModal from '../regular-modal-cmps/group-opt-modal.vue'
import newItemModal from '../filter-modals-cmps/new-item-modal.vue'
import filterPersonModal from '../filter-modals-cmps/filter-person-modal.vue'
import taskSelectModal from '../regular-modal-cmps/task-select-modal.vue'
import colorPickerModal from '../regular-modal-cmps/color-picker-modal.vue'
import multiFilterModal from '../filter-modals-cmps/multi-filter-modal.vue'
export default {

    name: 'regular-modal',
    emits: ['closeModal', 'openTask', 'removeTask', 'addGroup', 'removeGroup', 'setFilter', 'editGroupTitle', 'updateSelection', 'propagateMenu', 'deleteSelectedTasks', 'duplicateSelectedTasks', 'taskTitleToClipboard', 'linkToClipboard', 'duplicateGroup', 'duplicateTask', 'addColumn'], //emit all types of dynamic cmps events
    props: {
        cmp: {
            type: String,
            required: false,
        },
        users: {
            type: Array,
            required: false,
        },
        filter: {
            type: Object,
            required: false
        },
        id: {
            type: String,
            required: false,
        },
        selectedTasks: {
            type: Array,
            required: false
        },
        selectedColor: {
            type: String,
            required: false,
        },
        colors: {
            type: Object,
            required: false
        },
        idx: {
            type: Number,
            required: false
        },
        cmpsOrder: {
            type: Array,
            required: false
        },
        name: {
            type: String,
            required: false
        }

    },
    methods: {
        closeModal() {
            this.$emit('closeModal')
        },
        openTask() {
            this.$emit('openTask')
            this.$emit('closeModal')

        },
        removeTask() {
            this.$emit('removeTask')
            this.$emit('closeModal')

        },
        duplicateTask() {
            this.$emit('duplicateTask')
            this.$emit('closeModal')

        },
        addGroup() {
            this.$emit('addGroup')
            this.$emit('closeModal')

        },
        removeGroup() {
            this.$emit('removeGroup')
            this.$emit('closeModal')

        },
        setFilter(key, val) {
            this.$emit('setFilter', key, val)
            // this.$emit('closeModal')

        },
        editGroupTitle() {
            this.$emit('editGroupTitle')
            this.$emit('closeModal')

        },
        updateSelection(type, id, title = '', value) {
            this.$emit('updateSelection', type, id, title, value)
        },
        propagateMenu() {
            this.$emit('propagateMenu')
            this.$emit('closeModal')

        },
        deleteSelectedTasks() {
            this.$emit('deleteSelectedTasks')
            this.$emit('closeModal')

        },
        duplicateSelectedTasks() {
            this.$emit('duplicateSelectedTasks')
            this.$emit('closeModal')

        },
        taskTitleToClipboard() {
            this.$emit('taskTitleToClipboard')
            this.$emit('closeModal')

        },
        linkToClipboard() {
            this.$emit('linkToClipboard')
            this.$emit('closeModal')

        },
        duplicateGroup() {
            this.$emit('duplicateGroup')
            this.$emit('closeModal')

        },
        addColumn(cmp) {
            this.$emit('addColumn', cmp)
            this.$emit('closeModal')

        }
    },
    components: { //specify each dynamic cmps thats created
        newItemModal,
        filterPersonModal,
        taskOptModal,
        groupOptModal,
        taskSelectModal,
        colorPickerModal,
        multiFilterModal,
        addColumnModal
    }
}
</script>