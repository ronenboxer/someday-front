<template>
    <section class="color-picker">
        <span v-for="color in formattedColors" class="color-box" :style="color.style" @click="select(color.title)"
            :title="color.title">
        </span>
    </section>
</template>

<script>
export default {
    name: '',
    emits: ['updateSelection'],
    props: {
        selectedColor: {
            type: String,
            required: false,
        },
        idx: Number,
        colors: {
            type: Object,
            required: true
        },
        name: {
            type: String,
            required: false
        },
        id: {
            type: String,
            required: false
        }
    },
    data() {
        return {
        }
    },
    created() {
    },
    methods: {
        select(value) {

            const color = this.colors.color[value]
            if (this.name === 'group') return this.$emit('updateSelection', 'style', { color, light: color + '99' }, this.idx)
            const label = this.colors[this.name].find(label => label._id === this.id)
            this.$emit('updateSelection', this.name, label._id, label.title, color)
        }
    },
    computed: {
        formattedColors() {
            if (!this.name) return
            const type = this.name === 'group'
                ? 'group'
                : 'label'
            const titles = Object.keys(this.colors[type])
            return titles.map(title => ({
                style: { backgroundColor: this.colors[type][title] },
                title
            }))
        }
    },
    components: {
    },
}

</script>