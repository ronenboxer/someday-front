<template>
    <section v-if="!isKanban" class="link flex center" @click="clickToEdit">
        <a @click.stop="" v-if="content?.url" :href="`//${content.url}`" target="_blank">{{ content.title }}</a>
        <triangle-modal :cmp="'linkModal'" :content="content" @hideModal="(show = false)" v-if="show"
            @updateTask="updateTask" />
        <!-- <span v-else class="empty-span"></span> -->
    </section>
</template>

<script>
import triangleModal from '../dynamic-modals/triangle-modal.vue';
export default {
    emits: ['updateTask', 'editing'],
    name: 'link-column',
    props: {
        content: Object,
        isKanban :{
            type: Boolean,
            required: true
        }
    },
    data() {
        return {
            show: false,

        }
    },
    methods: {
        openModal() {
        },
        updateTask(linkObj) {
            this.$emit('updateTask', linkObj)
        },
        clickToEdit() {
            this.show = true
            this.$emit('editing')
        }
    },
    components: {
        triangleModal
    }
}
</script>