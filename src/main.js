import {createApp} from "vue"
import App from "./App.vue"
import {applyPolyfills, defineCustomElements} from '@aws-amplify/ui-components/loader';
import router from "@/router";
/* import 'quasar/dist/quasar.css'*/



const app = createApp(App)
app.mount('#app')
app.use(router)


applyPolyfills().then(() => {
    defineCustomElements(window);
});
