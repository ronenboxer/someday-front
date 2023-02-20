<template>
    <section class='triangle-modal' @keydown.escape="hide" v-click-outside="hide">
        <span class="top-bot"></span>
        <component :is="cmp" :content="content" :name="name" :additionalDb="additionalDb" @updateTask="updateTask"
            @hideModal="hide" :colors="colors" @closeModal="$emit('closeModal')">
        </component>
    </section>
</template>

<script>
import timelineModal from '../triangle-modal-cmps/timeline-modal.vue'
import personsModal from '../triangle-modal-cmps/persons-modal.vue'
import taskLabelModal from '../triangle-modal-cmps/task-label-modal.vue'
import dateModal from '../triangle-modal-cmps/date-modal.vue'
import linkModal from '../triangle-modal-cmps/link-modal.vue'
export default {
    name: 'triangle-modal',
    emits: ['updateTask', 'hideModal'],
    props: {
        cmp: String,
        additionalDb: {
            type: Array,
            required: false
        },
        content: {
            type: [Object, Array, String, Number],
            required: false
        },
        colors: {
            type: Object,
            required: false
        },
        name: String
    },

    methods: {
        hide() {
            this.$emit('hideModal')
        },
        updateTask(field) {
            this.$emit('updateTask', field)
        },

    },
    components: {
        personsModal,
        taskLabelModal,
        dateModal,
        linkModal,
        timelineModal,
    }
}
</script>