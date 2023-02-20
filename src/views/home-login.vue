<template>
    <section class="login-signup-modal flex column">

        <header class="main-header">
            <router-link to="/" class="logo-container">
                <img class="logo" src="/src/assets/imgs/logo.svg" alt="">
                <h1>someday<span>.com</span></h1>
            </router-link>
        </header>

        <section class="login-signup">
            <form class="signup-form flex column" @submit.prevent="loginSignup">
                <h1 class="login-title">Log in to your account</h1>
                <p class="login-subtitle">Enter your details</p>
                <label>
                    <input required type="text" v-model="creds.username" placeholder="Username">
                </label>
                <label>
                    <input required type="password" v-model="creds.password" placeholder="Password">
                </label>
                <label v-if="isSignup">
                    <input required type="text" v-model="creds.fullname" placeholder="Full name">
                </label>
                <label v-if="isSignup">
                    <input required type="email" v-model="creds.email" placeholder="Email">
                </label>
                <label v-if="isSignup">
                    <div class="add-img-btn flex center" @click="(uploadingImg = !uploadingImg)">
                        <span v-svg-icon="'file'"></span>
                        <p>Upload a picture</p>
                        <input type="file" @change="handleFile" />
                    </div>
                </label>
                <button class="cta-login-btn" type="submit">
                    {{ isSignup ? 'Sign up' : 'Login' }}
                </button>

                <h2 class="signup-cta-btn">{{ isSignup ? `Already have an account?` : `Don't have an account yet?` }}
                    <span @click="isSignup = !isSignup">{{ isSignup ? 'Login' : 'Sign up' }}</span>
                </h2>
            </form>
        </section>


    </section>
</template>
  
<script>
import { uploadImg } from '../services/img-upload.service.js'
export default {
    name: 'home-login',

    props: {
    },
    computed: {
        board() {
            return this.$store.getters.board
        }
    },
    data() {
        return {
            isSignup: false,
            creds: {},
            uploadingImg: false
        }
    },
    methods: {
        async loginSignup() {
            const userCreds = this.creds
            if (!userCreds.email) {
                try {
                    await this.$store.dispatch({ type: 'login', userCreds })
                    this.$router.push('/board/' + this.board._id)
                }
                catch (err) {
                    console.log('Wrong details', err);
                }
            }
            else {
                try {
                    await this.$store.dispatch({ type: 'signup', userCreds })
                    this.$router.push('/board/' + this.board._id)
                }
                catch (err) {
                    console.log('Could not sign up', err);
                }
            }
        },

        handleFile(ev) {
            let file
            file = ev.target.files[0]
            this.onUploadFile(file)
        },
        async onUploadFile(file) {
            const res = await uploadImg(file)
            this.creds.imgUrl = res.url
        },

    },
    async created() {
        await this.$store.dispatch({ type: 'queryBoard', filter: {} })
    }

}
</script>