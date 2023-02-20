<template>
    <section v-if="!isKanban" class="labels" @click="clickToEdit">
        <span class="label-name" :style="getLabel.style">{{ getLabel.title === 'Default' ? '' : getLabel.title }}
            <div class="container" :class="{ 'animate': isConfetti }">
                <i v-for="i in 50"></i>
            </div>
            <span class="fold"></span>
        </span>
        <triangle-modal v-if="getLabel && show" :content="content" :name="name" @updateTask="updateTask"
            @hideModal="(show=false)" :cmp="'task-label-modal'" :colors="colors" />
    </section>
</template>

<script>
import triangleModal from '../dynamic-modals/triangle-modal.vue'
export default {
    name: 'labels',
    emits: ['updateTask', 'editing'],
    props: {
        content: String,
        name: String,
        colors: {
            type: Object,
            required: true
        },
        isKanban: {
            type: Boolean,
            required: true
        }
    },
    data() {
        return {
            show: false,
            isConfetti: false,
        }
    },
    methods: {
        updateTask(labelObj) {
            if (labelObj.val === 'sdc34') this.startConfetti()
            this.$emit('updateTask', labelObj)
            setTimeout(() => this.show = false, 1)
        },
        clickToEdit() {
            this.show = true
            this.$emit('editing')
        },
        startConfetti() {
            setTimeout(() => this.isConfetti = true, 500)
            setTimeout(() => this.isConfetti = false, 2500)
        }
    },
    computed: {
        getLabel() {
            if (!this.colors[this.name]) return {

                style: {
                    'background-color': 'white',
                    'color': 'white'
                },
                title: ''
            }
            const label = this.colors[this.name].find(label => label._id === this.content)
            return {
                style: {

                    'background-color': label?.value || '#c4c4c4',
                    color: 'white'
                },
                title: label?.title || '',

            }
        }
    },
    components: {
        triangleModal
    }
}
</script>