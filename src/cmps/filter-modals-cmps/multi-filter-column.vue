<template>
    <section class='multi-filter-column'>
        <div class="filter-col">
            <div class="title">{{ column }}</div>
            <div class="content flex column">
                <div v-if="column === 'person'" v-for="item in formattedData" class="filter-item person"
                    @click="setFilter(item)" :class="{ selected: getFormattedFilterArray.includes(item._id)}" >
                    <div class="filter-option">
                        <img :src="item.imgUrl" alt="" >
                        <span>{{ item.fullname }}</span>
                    </div>
                    <div class="filter-counter">
                        {{}}
                    </div>
                </div>
                <div v-else v-for="item in formattedData" class="filter-item" @click="setFilter(item)"
                :class="{ selected: getFormattedFilterArray.includes(item) }">
                    <div class="filter-option">
                        <span v-if="column === 'date'">{{ getFormattedDate(item) }}</span>
                        <div v-else-if="column === 'status' || column === 'priority'">
                            <span class="label-color" :style="getFormattedLabelStyle(item)"></span>{{
                                    getFormattedLabel(item)
                            }}
                        </div>
                        <span v-else-if="column === 'numbers'">{{ item.toLocaleString() }}</span>
                        <span v-else>{{ item }}</span>
                    </div>
                    <div class="filter-counter">
                        <span> {{ }}</span>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
import { colorService } from '../../services/color.service'
export default {
    name: 'multi-filter-column',
    emits: ['setFilter'],
    props: {
        column: {
            type: String,
            required: true
        },
        data: {
            type: Array,
            required: true
        },
        stats: {
            type: Object,
            required: true
        },
        filter: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        }
    },
    computed: {
        formattedData() {
            return this.data.filter(item => this.column === 'person' 
                ?   !item.isGuest
                :   item)
        },
        getFormattedFilterArray(){
            if (this.column === 'group') return this.filter.group || []
            return this.filter.tasks?.[this.column] || []
        }
    },
    methods: {
        setFilter(item) {
            let filter = JSON.parse(JSON.stringify(this.filter || {}))
            if (!filter.group) filter.group = []
            if (!filter.tasks) filter.tasks = {}
            let vals
            if (this.column === 'group') vals = filter.group
            else vals = filter.tasks[this.column] || []
            const idx = vals.findIndex(val => this.column === 'person'
                ? val === item._id
                : val === item)

            if (idx === -1) vals.push(this.column === 'person'
                ? item._id
                : item)
            else vals.splice(idx, 1)
            this.$emit('setFilter', this.column, vals)
        },
        getFormattedDate(item) {
            const monthIdx = (new Date(item)).getMonth()
            return `${this.months[monthIdx]} ${(new Date(item)).getDate()}`
        },
        getFormattedNumber(item) {
            return item.toLocaleString()
        },
        getFormattedLabel(item) {
            return colorService.getLabelById(this.column, item)?.title || ''
        },
        getFormattedLabelStyle(item) {
            const color = colorService.getLabelById(this.column, item)?.value || '#c4c4c4'
            return `background-color: ${color};`
        },
    },
    components: {}
}
</script>
