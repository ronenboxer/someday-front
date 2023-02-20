<template>
    <section class='add-column-modal'>
        <div @click="addColumn(cmp)" v-for="cmp in missingCmps" class="add-column-item">
            <div class="icon" :style="`background-color:${getColor(cmp)}`">
                <span>{{ getIcon(cmp) }}</span>
            </div>
            <p>{{ cmp }}</p>
        </div>
        <div v-if="!missingCmps.length">
            <p class="no-columns">
                No columns to add
            </p>
        </div>
    </section>
</template>
<script>
import { cmps } from '../../services/board.service.js'
export default {
    name: 'add-column-modal',
    emits: ['addColumn'],
    props: {
        cmpsOrder: {
            type: Array,
            required: false
        }
    },
    computed: {
        cmps() {
            return cmps
        },
        missingCmps() {
            return this.cmps.filter(cmp => {
                return !(this.cmpsOrder.includes(cmp))
            })
        }
    },
    methods: {
        getIcon(cmp) {
            switch (cmp) {
                case 'status': return '⚌'
                case 'priority': return '⚌'
                case 'text': return '☩'
                case 'numbers': return '№'
                case 'person': return '☺'
                case 'link': return '↗'
                case 'timeline': return '☈'
                case 'date': return 'U+1F557'
            }
        },
        getColor(cmp) {
            switch (cmp) {
                case 'status': return `rgb(17, 221, 128)`
                case 'priority': return `rgb(255, 203, 0)`
                case 'text': return `rgb(0, 169, 255)`
                case 'numbers': return `rgb(255, 203, 0)`
                case 'person': return `rgb(0, 207, 244)`
                case 'link': return `rgb(0, 169, 255)`
                case 'timeline': return `rgb(163, 88, 223)`
                case 'date': return `rgb(17, 221, 128)`
            }
        },
        addColumn(cmp) {
            this.$emit('addColumn', cmp)
        }
    }
}
</script>