<template>
    <section class='new-item-modal'>
        <div class="modal-group">
            <div class="modal-item flex align-center" @click="addGroup">
                <div class="item-title flex align-center">
                    <span v-svg-icon="'board'"></span>
                    <p class="title">New group of items</p>
                </div>
            </div>
        </div>

    </section>
</template>
<script>
export default {
    name: 'new-item-modal',
    emits: ['addGroup'],
    methods: {
        addGroup() {
            this.$emit('addGroup', false)
        }
    }
}
</script>