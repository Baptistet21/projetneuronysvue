import {createApp} from "vue"
import App from "./App.vue"
import {applyPolyfills, defineCustomElements} from '@aws-amplify/ui-components/loader';
import router from "@/router";
/*
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
*/
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default-dark.css'






const app = createApp(App)
app.mount('#app')
app.use(router)


applyPolyfills().then(() => {
    defineCustomElements(window);
});
