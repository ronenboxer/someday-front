<template>
    <section v-for="(imgUrl, idx) in imgUrls" :key="idx" class="img-preview">
        <img :src="imgUrl"  alt="img..." />
        <span class="remove-img" @click="removeImg(idx)" v-svg-icon="'exit'"></span>
    </section>
</template>

<script>
export default {
    name: 'img-preview',
    emits: ['removeImg'],
    props: {
        imgUrls: {
            type: Array,
            required: true
        }
    },
    methods: {
            removeImg(imgIdx) {
                this.$emit('removeImg', imgIdx)
            }
    }
}
</script>

