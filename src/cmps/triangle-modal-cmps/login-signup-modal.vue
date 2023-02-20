<template>
    <section class="login-signup-modal flex column">

        <div class="nav-btns">
            <button :class="{ 'selected': isLogin }" @click="(isLogin = true)">Login</button>
            <button :class="{ 'selected': !isLogin }" @click="(isLogin = false)">Signup</button>
        </div>

        <section class="signup login">
            <form class="signup-form flex column" @submit.prevent="loginSignup">
                <label>
                    <p>Username</p>
                    <input required type="text" v-model="creds.username" placeholder="Username">
                </label>
                <label>
                    <p>Password</p>
                    <input required type="password" v-model="creds.password" placeholder="Password">
                </label>
                <label v-if="!isLogin">
                    <p>Full name</p>
                    <input required type="text" v-model="creds.fullname" placeholder="Full name">
                </label>
                <label v-if="!isLogin">
                    <p>Email</p>
                    <input required type="email" v-model="creds.email" placeholder="Email">
                </label>
                <label v-if="!isLogin">
                    <p>Upload image</p>
                    <div class="add-img-btn flex center" @click="(uploadingImg = !uploadingImg)">
                        <input type="file" @change="handleFile" />
                        <span v-svg-icon="'outlinePlus'"></span>
                        Add file
                    </div>
                </label>
                <button type="submit">
                    {{ isLogin ? 'Login' : 'Signup' }}
                </button>
            </form>
        </section>



    </section>
</template>
  
<script>
import { userService } from '../../services/user.service';
import { uploadImg } from '../../services/img-upload.service';
export default {
    name: 'signup-modal',
    emits: ['hideModal', 'loginSignup'],
    props: {
    },
    data() {
        return {
            isLogin: false,
            creds: {},
            uploadingImg: false
        }
    },
    methods: {
        loginSignup() {
            const userCreds = this.creds
            console.log(`userCreds:`, userCreds)
            this.$emit('loginSignup', userCreds)
            this.$emit('hideModal')
            this.creds = {}
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
    created() {
        // this.users = userService.getUsers()

        this.isLogin = true
    }

}
</script>