<template>
        <span v-if="!isKanban" @click="clickToEdit" class="task-date">
            <triangle-modal v-if="show" @hideModal="(show = false)" @updateTask="updateTask"
                :content="(content || Date.now())" :cmp="'date-modal'" />
            {{ formattedDate || ' ' }}
        </span>
</template>

<script>
import triangleModal from '../dynamic-modals/triangle-modal.vue'
export default {
    emits: ['updateTask', 'editing'],
    name: 'date-column',
    props: {
        content: Number,
        isKanban :{
            type: Boolean,
            required: true
        }
    },
    data() {
        return {
            months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            show: false
        }
    },
    created() {
        // console.log(`content:`, this.content)
    },
    computed: {
        formattedDate() {
            if (!this.content || isNaN(this.content)) return ''
            const monthIdx = (new Date(this.content)).getMonth()
            return `${this.months[monthIdx]} ${(new Date(this.content)).getDate()}`
        },
    },
    methods: {
        updateTask(timeObj) {
            this.$emit('updateTask', timeObj)
            setTimeout(() => {
                this.show = false
            }, 1)
        },
        clickToEdit() {
            this.show=true
            this.$emit('editing')
        }
    },
    components: {
        triangleModal
    }
}
</script>