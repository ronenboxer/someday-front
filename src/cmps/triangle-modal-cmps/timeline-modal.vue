
<template>
    <div class="block">
        <el-date-picker @blur="handleClose" v-model="value2" type="daterange" start-placeholder="Start Date"
            end-placeholder="End Date" />
    </div>
</template>

<script>
import { ref } from 'vue'

export default {
    name: '',
    emits: ['updateTask'],
    props: {
        content: {
            type: Object
        },
    },

    data() {
        return {
            value2: ref('')
        }
    },
    watch: {
        value2: {
            handler() {
                if (this.value2 !== '') {
                    const startTime = this.value2[0]
                    const endTime = this.value2[1]
                    const start = {
                        month: startTime.getMonth(),
                        day: startTime.getDate(),
                        year: startTime.getYear() + 1900,
                    }
                    const end = {
                        month: endTime.getMonth(),
                        day: endTime.getDate(),
                        year: endTime.getYear() + 1900,
                    }
                    const timeline = { start, end }
                    this.$emit('closeModal')
                    this.$emit('updateTask', timeline)
                }
            },
            immediate: true,
        },
    },
}
</script>

<style>
.timeline-modal {
    z-index: 10000;
    left: 50%;
}
</style>
