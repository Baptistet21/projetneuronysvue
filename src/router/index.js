import {createRouter, createWebHistory} from "vue-router"
import Reclamation from "@/components/Reclamation.vue";
import Rattachement from "@/components/Rattachement.vue";
import Upgrade from "@/components/Upgrade.vue";


const router = createRouter ({
    history: createWebHistory(),
    routes: [
        { path: '/reclamation', component: Reclamation },
        { path: '/rattachement', component: Rattachement },
        { path: '/upgrade', component: Upgrade }
    ]
})

export default router;