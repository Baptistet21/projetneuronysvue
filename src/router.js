import Vue from 'vue'
import Router from 'vue-router'
import ReclamationVue from "@/components/Reclamation.vue";
import RattachementVue from "@/components/Rattachement.vue";
import UpgradeVue from "@/components/Upgrade.vue";

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: "/reclamation",
            component: ReclamationVue
        },
        {
            path: "/rattachement",
            component: RattachementVue
        },
        {
            path: "/upgrade",
            component: UpgradeVue
        }
    ]

})