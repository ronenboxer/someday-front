<template>
    <section  v-if="!isKanban" class="txt flex center" @click="clickToEdit">
        <div v-if="isEditing" class="editing-mode" @key.enter="updateTask" v-click-outside="updateTask">
            <input v-focus type="text" class="edit" v-model="text">
        </div>
        <div v-if="(text && !isEditing)">
            {{ text }}
        </div>
        <div v-else-if="!isEditing" class="not-editing-mode flex center hidden">
            <div v-if="!text" class="hovering flex align-center">
                <span class="plus" v-svg-icon="'plus'"></span>
                <div class="icon" v-svg-icon="'copyText'"></div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    emits: ['updateTask', 'editing'],
    name: 'txt',
    props: {
        content: {
            type: String,
            required: false
        },
        isKanban :{
            type: Boolean,
            required: true
        }
    },
    created() {
        if (this.content) this.text = this.content
    },
    data() {
        return {
            isEditing: false,
            text: null
        }
    },
    methods: {
        setNotEditing() {
            this.isEditing = false
        },
        updateTask() {
            this.setNotEditing()
            if (!this.text) return
            this.$emit('updateTask', { key: 'text', val: this.text })
        },
        clickToEdit() {
            this.isEditing = true
            this.$emit('editing')
        }
    },
    components: {
    }
}
</script>