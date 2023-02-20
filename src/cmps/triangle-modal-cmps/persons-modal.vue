<template>
    <section class='persons-modal'>
        <div v-for="person in content" class="active-persons">
            <div class="person">
                <span :style="person.style" class="task-avatar"></span>
                <p>{{ person.fullname }}</p>
                <span @click="removePerson(person._id)" v-svg-icon="'smallExit'" class="remove-person-btn"></span>
            </div>
        </div>
        <input v-model="txt" v-focus type="text" class="search-filter-persons" placeholder="Search names">
        <p v-if="personsToAdd.length" class="suggested-persons">Suggested people</p>
        <div class="not-active-persons">
            <div @click="addPerson(person._id)" v-for="person in personsToAdd" class="not-active-person">
                <div>
                    <img :src="person.imgUrl" />
                    <p>{{ person.fullname }}</p>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
export default {
    name: 'persons-modal',
    emits: ['updateTask', 'hideModal'],
    props: {
        content: {
            type: Array,
            required: false
        },
        additionalDb: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            usersToAdd: [],
            txt: ''
        }
    },
    computed: {
        personsToAdd() {
            if (!this.content.length && !this.additionalDb.find(user => user.isGuest)) return this.additionalDb
            if (this.additionalDb.length === this.content.length) return []
            const users = this.additionalDb.filter(user => !this.content.find(p => p._id === user._id) && !user.isGuest)
            if (!this.txt) return users
            const regex = new RegExp(this.txt, 'i')
            return users.filter(user => regex.test(user.fullname))
        }
    },
    methods: {
        addPerson(personId) {
            const person = this.additionalDb.find(user => user._id === personId)
            const persons = this.content
                ? this.content
                : []
            persons.push(person)
            this.updateTask(persons)
            this.$emit('hideModal')
        },
        removePerson(personId) {
            const persons = this.content
            const idx = persons.findIndex(person => person._id === personId)
            if (idx === -1) return
            persons.splice(idx, 1)
            this.updateTask(persons)

        },
        updateTask(persons) {
            this.$emit('updateTask', { key: 'person', val: persons })
        },
        filterPersons() {

        }


    },
    created() {

    },
}
</script>