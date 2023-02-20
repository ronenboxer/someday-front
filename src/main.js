import { createApp } from 'vue'

window.handleCredentialResponse = (response) => {
    // decodeJwtResponse() is a custom function defined by you
    // to decode the credential response.
    // const responsePayload = getDecodedOAuthJwtGoogle(response.credential);
    // console.log(responsePayload.then(console.log));
    httpService.post('auth/login', response)
    // console.log("ID: " + responsePayload.sub);
    // console.log('Full Name: ' + responsePayload.name);
    // console.log('Given Name: ' + responsePayload.given_name);
    // console.log('Family Name: ' + responsePayload.family_name);
    // console.log("Image URL: " + responsePayload.picture);
    // console.log("Email: " + responsePayload.email);
}

import { router } from './router.js'
import { store } from './store/store.js'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import copyText from "@meforma/vue-copy-to-clipboard"
import vue3GoogleLogin from 'vue3-google-login'




import {
    focusDirective,
    condFocusDirective,
    customOnDirective,
    clickOutsideDirective,
    svgIconDirective,
} from './directives'

import './assets/styles/main.scss'
// import '../dist/assets/index.45718cf5.css'
import App from './App.vue'
import { httpService } from './services/http.service.js';

const app = createApp(App)

app.directive('focus', focusDirective)
app.directive('cond-focus', condFocusDirective)
app.directive('custom-on', customOnDirective)
app.directive('click-outside', clickOutsideDirective)
app.directive('svg-icon', svgIconDirective)

app.use(router)
app.use(store)
app.use(copyText)
app.use(ElementPlus)
app.use(vue3GoogleLogin, {
    clientId: '236832301303-68cdrgocpc5a0p08350mo4dnhmb1lihl.apps.googleusercontent.com'
})

app.mount('#app')

