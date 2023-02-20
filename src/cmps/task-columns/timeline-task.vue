<template>
    <section v-if="!isKanban" @click="clickToEdit" class="timeline">
        <div v-if="content" class="range" @mouseenter="isHovering = true" @mouseleave="isHovering = false">
            <div class="value" :style="style"></div>
            <p v-if="isHovering" class="text">{{ timeDiff }} d</p>
            <p v-else class="text">{{ dateStr }}</p>
        </div>
        <triangle-modal v-if="(showModal)" :cmp="'timelineModal'" :content="content" @closeModal="(showModal = false)"
            @updateTask="updateTask" />
    </section>
</template>

<script>
import triangleModal from '../dynamic-modals/triangle-modal.vue'

export default {
    name: '',
    emits: ['updateTask', 'editing'],
    props: {
        content: {
            type: Object,
            required: false
        },
        color: {
            type: String,
            required: false
        },
        isKanban: {
            type: Boolean,
            required: true
        }
    },
    data() {
        return {
            months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            showModal: false,
            isHovering: false,
        }
    },
    computed: {
        getTimelineBar() {
            if (!this.content?.start || !this.content?.end) return 0
            const start = (new Date([this.content.start.year, this.content.start.month + 1, this.content.start.day])).getTime()
            const end = (new Date([this.content.end.year, this.content.end.month + 1, this.content.end.day])).getTime()
            const diffInDays = this.timeDiff
            const timeElapsed = Math.ceil((Date.now() - start) / (1000 * 60 * 60 * 24))
            const percentage = (100 * (+timeElapsed) / (+diffInDays))
            return percentage > 100
                ? 100 + '%'
                : percentage < 0
                    ? 0 + '%'
                    : percentage + '%'
        },
        style() {
            return {
                width: this.getTimelineBar,
                backgroundColor: this.color
            }
        },
        dateStr() {
            if (!this.content) return ''
            const { start, end } = this.content
            let str = `${this.months[start.month]} ${start.day}, '${+start.year % 100} - '`
            str += `${this.months[end.month]} ${end.day}, '${+end.year % 100}`
            return str
        },
        timeDiff() {
            const start = (new Date([this.content.start.year, this.content.start.month + 1, this.content.start.day])).getTime()
            const end = (new Date([this.content.end.year, this.content.end.month + 1, this.content.end.day])).getTime()
            return Math.ceil((end - start) / (1000 * 60 * 60 * 24))
        }
    },
    methods: {
        clickToEdit() {
            // const startDateString = `${this.content.start.year}` + '-' + `${this.content.start.month}` + '-' + `${this.content.start.day}`
            // const endDateString = `${this.content.end.year}` + '-' + `${this.content.end.month}` + '-' + `${this.content.end.day}`
            // const startTimeStamp = new Date(startDateString).getTime()
            // const endTimeStamp = new Date(endDateString).getTime()
            this.showModal = true
            this.$emit('editing')
        },
        // getTimeStampFromDates(dates) {
        getTimeFromDates(dates) {
            if (!dates) return ''
            // const dateString = `${dates.year}` + '-' + `${dates.month}` + '-' + `${dates.day}`
            return new Date(dates.year, dates.month, dates.day)
            // return new Date(dateString).getTime()
        },
        updateTask(timeline) {s
            this.$emit('updateTask', { key: 'timeline', val: timeline })
        }
    },
    components: {
        triangleModal
    },
}
</script>
