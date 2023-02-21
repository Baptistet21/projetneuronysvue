import { createApp } from 'vue'
import App from './App.vue'
import {Amplify} from 'aws-amplify';
import awsconfig from './aws-exports';
import {applyPolyfills, defineCustomElements} from '@aws-amplify/ui-components/loader';
import 'quasar/dist/quasar.css'

Amplify.configure(awsconfig);


createApp(App).mount('#app')
applyPolyfills().then(() => {
    defineCustomElements(window);
});
