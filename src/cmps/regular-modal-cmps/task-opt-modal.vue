<template>
    <section class='task-opt-modal more-options-modal' :class="{'workspace-collapsed-pos': $store.getters.isWorkspaceCollapsed}">

        <div class="modal-group upper-group">
            <div class="modal-item flex align-center" @click="openTask">
                <div class="item-title flex align-center">
                    <span v-svg-icon="'open'"></span>
                    <p class="title">Open</p>
                </div>
            </div>
            <div class="modal-item flex align-center justify-between" @click="duplicateTask">
                <div class="item-title flex align-center">
                    <span v-svg-icon="'duplicate'"></span>
                    <p>Duplicate</p>
                </div>
            </div>
            <div class="modal-item flex align-center" @click="taskTitleToClipboard">
                <div class="item-title flex align-center">
                    <span v-svg-icon="'copyText'"></span>
                    <p>Copy Name</p>
                </div>
            </div>

            <div class="modal-item flex align-center justify-between" @click="linkToClipboard">
                <div class="item-title flex align-center">
                    <span v-svg-icon="'link'"></span>
                    <p>Copy item link</p>
                </div>
            </div>
        </div>

        <div class="modal-group middle-group">
            <div class="modal-item flex align-center" @click="removeTask">
                <div class="item-title flex align-center">
                    <span v-svg-icon="'delete'"></span>
                    <p class="title">Delete</p>
                </div>
            </div>
        </div>

    </section>
</template>
<script>
export default {
    name: 'task-opt-modal',
    emits: ['openTask', 'removeTask', 'linkToClipboard', 'taskTitleToClipboard', 'duplicateTask'],
    props: {},
    data() {
        return {}
    },
    created() { },
    computed: {},
    methods: {
        openTask() {
            this.$emit('openTask')
        },
        removeTask() {
            this.$emit('removeTask')
        },
        taskTitleToClipboard() {
            this.$emit('taskTitleToClipboard')
        },
        linkToClipboard() {
            this.$emit('linkToClipboard')
        },
        duplicateTask() {
            this.$emit('duplicateTask')
        }

    },
    components: {}
}
</script>