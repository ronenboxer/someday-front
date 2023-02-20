<template>
    <section class="task-preview">
        <div class="top-sec">
            <p>{{ task.title }}</p>
        </div>
        <div class="persons">
            <span v-svg-icon="'smallPerson'" class="person-icon"></span>
            <p class="person-text">Person</p>
            <div class="task-persons">
                <span v-if="task.person?.length" v-for="person in task.person" class="task-avatar">
                    <img :src="person.imgUrl" alt="">
                </span>
                <span v-else v-svg-icon="'smallPerson'" class="task-avatar default"></span>
            </div>
        </div>
        <div class="label">
            <span v-svg-icon="'status'"></span>
            <p class="label-text">{{ kanbanType === 'status' ? 'Priority' : 'Status' }} </p>
            <div :style="{ backgroundColor: getLabel.value }" class="inner-label">{{ getLabel.title }}
            </div>
        </div>
    </section>
</template>

<script>
import { colorService } from '../services/color.service.js'
export default {

    name: '',
    props: {
        task: {
            type: Object,
            required: true
        },
        kanbanType: {
            type: String,
            required: true
        },
        labelId: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            show: false,
            beingDragged: false,
        }
    },
    methods: {
        saveBoard() {
            const board1 = JSON.parse(JSON.stringify(this.$store.getters.board))
        },
        updateTask(personsObj) {
            this.$emit('updateTask', personsObj)
        },
        hide() {
            setTimeout(() => this.show = false, 1)
        },
        clickToEdit() {
            this.show = true
            this.$emit('editing')
        },
    },
    created() {

    },
    computed: {
        getLabel() {
            const label = this.kanbanType === 'status'
                ? 'priority'
                : 'status'
            return colorService.getLabelById(label, (this.task[label] || 'qwdlk'))
        }
    },
    components: {
    },
}
</script>