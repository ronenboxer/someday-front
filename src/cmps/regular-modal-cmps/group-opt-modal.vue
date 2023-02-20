<template>

    <section class='group-opt-modal more-options-modal'
        :class="{ 'workspace-collapsed-pos': $store.getters.isWorkspaceCollapsed }">

        <div class="modal-group upper-group flex column justify-center">
            <div class="modal-item flex align-center" @click="collapseGroup">
                <div class="flex align-center">
                    <span v-svg-icon="'collapse'"></span>
                    <p class="title">Collapse this group</p>
                </div>
            </div>
            <div class="modal-item flex align-center" @click="collapseAllGroups">
                <div class="flex align-center">
                    <span v-svg-icon="'collapse'"></span>
                    <p class="title">Collapse all groups</p>
                </div>
            </div>
        </div>

        <div class="modal-group upper-group flex column justify-center">
            <div class="modal-item flex align-center" @click="addGroup">
                <div class="flex align-center">
                    <span v-svg-icon="'add'"></span>
                    <p class="title">Add group</p>
                </div>
            </div>
            <div class="modal-item flex align-center" @click="duplicateGroup">
                <div class="flex align-center">
                    <span v-svg-icon="'duplicate'"></span>
                    <p class="title">Duplicate this group</p>
                </div>
            </div>
        </div>

        <div class="modal-group lowest-group flex column justify-center">
            <div class="modal-item flex align-center" @click="editGroupTitle">
                <div class="flex align-center">
                    <span v-svg-icon="'rename'"></span>
                    <p class="title">Rename group</p>
                </div>
            </div>
            <div class="modal-item flex align-center" @click="propagateMenu">
                <div class="flex align-center">
                    <span class="group-color" :style="{ backgroundColor: selectedColor }"></span>
                    <p class="title color-title">Change group color</p>
                </div>
            </div>
            <div class="modal-item flex align-center delete-group" @click="removeGroup">
                <div class="flex align-center">
                    <span v-svg-icon="'delete'"></span>
                    <p class="title">Delete</p>
                </div>
            </div>
        </div>

    </section>

</template>
<script>
import { eventBus } from '../../services/event-bus.service';
export default {
    name: 'group-opt-modal',
    emits: ['addGroup', 'editGroupTitle', 'removeGroup', 'propagateMenu', 'duplicateGroup'],
    props: {
        id: String,
        selectedColor: String,
        name: String,
    },
    data() {
        return {}
    },
    created() {
    },
    computed: {},
    methods: {
        addGroup() {
            this.$emit('addGroup', false)
        },
        collapseAllGroups() {
            eventBus.emit('collapse-groups', true)
        },
        collapseGroup() {
            eventBus.emit('collapse-single-group', { _id: this.id, collapseGroup: true })
        },
        editGroupTitle() {
            this.$emit('editGroupTitle')
        },
        removeGroup() {
            this.$emit('removeGroup')
        },
        propagateMenu() {
            this.$emit('propagateMenu')
        },
        duplicateGroup() {
            this.$emit('duplicateGroup')
        }
    },
    components: {}
}
</script>