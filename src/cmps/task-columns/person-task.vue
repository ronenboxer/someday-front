<template>
    <section v-if="!isKanban" @click="clickToEdit" class="task-members flex center">
        <div class="add-person-icon" v-svg-icon="'addPerson'"></div>
        <span v-if="formattedPersons.length" class="task-avatar" v-for="person in formattedPersons"
            :style="person.style" :class="{ cover: person.pic }" :title="person.fullname">
            {{ !person.pic ? person.initials : '' }}
        </span>
        <span class="default-person" v-else v-svg-icon="'defaultPerson'"></span>
        <triangle-modal v-if="show" @updateTask="updateTask" :additionalDb="additionalDb" :content="formattedPersons"
            :cmp="'personsModal'" @hideModal="hide" />
    </section>
</template>

<script>
import triangleModal from '../dynamic-modals/triangle-modal.vue'
export default {
    name: 'persons-column',
    emits: ['updateTask', 'editing'],
    props: {
        content: Array,
        additionalDb: Array,
        isKanban: {
            type: Boolean,
            required: true
        }
    },
    data() {
        return {
            show: false
        }
    },
    computed: {
        formattedPersons() {
            if (!this.content?.length) return []
            return this.content.reduce((userArr, person) => {
                const { _id, fullname } = person
                const user = !this.additionalDb?.length
                    ? []
                    : this.additionalDb.find(anyUser => anyUser._id === _id && !anyUser.isGuest)
                if (!user) return userArr
                const style = user.imgUrl
                    ? `background-image: url(${user.imgUrl})`
                    : `background-color: ${user.color || '#fff'}`
                const pic = user.imgUrl
                    ? true
                    : false
                const initials = user.fullname.split(' ').map(name => name.charAt(0).toUpperCase()).join('')
                userArr.push({ _id, style, initials, fullname, pic })
                return userArr

            }, [])
        }
    },
    methods: {
        updateTask(personsObj) {
            console.log(`personsObj:`, personsObj)
            this.$emit('updateTask', personsObj)
        },
        hide() {
            setTimeout(() => this.show = false, 1)
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