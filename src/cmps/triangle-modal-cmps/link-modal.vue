<template>
    <section class='link-modal flex column center' @keydown.enter="saveLink" v-click-outside.prevent="saveLink">
        
        <div class="address">
            <label for="link-address-url" class="link-title">Web address</label>
            <input v-model="url" id="link-address-url" v-focus type="link" placeholder="www.example.com">
        </div>
        <div class="address">
            <label for="txt-to-display" class="link-title">Text to display</label>
            <input v-model="title" id="txt-to-display" type="text" placeholder="Text to display">
        </div>
        <button type="submit"></button>
    </section>
</template>
<script>
export default {
    name: 'link-modal',
    emits: ['updateTask'],
    props: {
        content: {
            type: Object,
            required: false
        }
    },
    created() {
        if (this.content?.title && this.content?.url) {
            this.url = this.content.url
            this.title = this.content.title
        }
    },
    data() {
        return {
            url: '',
            title: ''
        }
    },
    unmounted() {

    },
    methods: {
        saveLink() {
            const link = { url: this.url, title: this.title }
            this.$emit('updateTask', { key: 'link', val: link })
        }
    }
}
</script>
