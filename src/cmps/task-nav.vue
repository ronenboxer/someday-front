<template>
    <nav class="main-nav flex column align-center justify-between">
        <section class="top-nav flex column center">
            <router-link to="/">
                <img class="logo" src="../assets/imgs/logo.svg" alt="G">
            </router-link>
            <router-link :to="('/board/' + board._id)" class="board-btn">
                <span v-svg-icon="'coloredBoard'"></span>
            </router-link>
            <!-- <button class="notification-btn">
                <span v-svg-icon="'notification'"></span>
            </button> -->
        </section>
        <section class="bottom-nav" @click="logout">
            <div class="logout-container">
                <h1>Logout</h1>
            </div>
            <img class="profile" v-if="loggedinUser" :src="loggedinUser.imgUrl" alt="">
        </section>
    </nav>
</template>

<script>
export default {
    name: 'task-nav',
    computed: {
        board() {
            return this.$store.getters.board
        },
        loggedinUser() {
            return this.$store.getters.loggedinUser
        },
        logout() {
            this.$store.dispatch({ type: 'logout' })
            this.$router.push('/')

        }
    },
    created() {
    },
}
</script>

<style>
.icon {
    width: 50px;
    height: 50px;
}
</style>