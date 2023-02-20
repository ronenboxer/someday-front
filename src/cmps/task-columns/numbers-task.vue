<template>
    <section v-if="!isKanban" class="numbers flex center" @click="clickToEdit">
        <div v-if="isEditing" class="editing-mode" @key.enter="updateTask" v-click-outside="updateTask">

            <input v-focus type="number" class="edit" v-model="numbers">
        </div>
        <div v-if="(numbers && !isEditing)">
            {{ formattedNum }}
        </div>
        <div v-else-if="!isEditing" class="not-editing-mode flex center hidden">
            <div v-if="!numbers" class="hovering flex align-center">
                <span class="plus" v-svg-icon="'plus'"></span>
                <pre>123</pre>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    emits: ['updateTask', 'editing'],
    name: 'numbers',
    props: {
        content: {
            type: Number,
            required: false
        },
        isKanban :{
            type: Boolean,
            required: true
        }
    },
    created() {
        if (this.content) this.numbers = this.content
    },
    data() {
        return {
            isEditing: false,
            numbers: null
        }
    },
    computed: {
        formattedNum() { if (this.numbers) return this.numbers.toLocaleString() },
    },
    methods: {
        setNotEditing() {
            this.isEditing = false
        },
        updateTask() {
            this.setNotEditing()
            if (!this.numbers) return
            this.$emit('updateTask', { key: 'numbers', val: this.numbers })
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