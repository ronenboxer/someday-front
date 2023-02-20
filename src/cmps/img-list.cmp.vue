<template>
    <section class="img-list">
        <hr />
        <div v-html="listHeader"></div>
        <div class="img-list-container">
            <img v-for="(imgUrl, idx) in imgUrls" :src="imgUrl" :key="idx" alt="img..." @click="setAsAvatar(imgUrl)" />
            <p>{{imgUrls[0]}}</p>
        </div>
    </section>
</template>

<script>
export default {
    name: 'img-list',
    props: {
        imgUrls: Array,
    },
    methods: {
        setAsAvatar(imgUrl) {
            this.$emit('setAvatar', imgUrl)
        },
    },
    computed: {
        listHeader() {
            return this.imgUrls && this.imgUrls.length
                ? '<h2>Images List</h2><h3>Click an image to set as profile picture</h3>'
                : '<h2>No Images</h2>'
        },
    },
}
</script>

<style>
.img-list-container {
    margin: 8px;
    display: flex;
    flex-wrap: wrap;
}

.img-list-container img {
    height: 150px;
    margin-inline-end: 4px;
    cursor: pointer;
}
</style>
