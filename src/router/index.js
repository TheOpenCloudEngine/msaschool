import Vue from 'vue'
import VueRouter from 'vue-router'
import Overview from '../views/EventStorming/Overview'
import Contents from '../views/EventStorming/Contents'
import TreeMain from '../views/EventStorming/TreeMain'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'home',
        redirect: '/소개/01_MSA School 이란'
    },
    {
        path: '/:menu1/01_*',
        name: 'overview',
        component: Overview,
    },
    {
        path: '/:menu1/:menu2',
        name: 'contents',
        component: Contents,
    },
    {
        path: '/:menu1/:menu2/index',
        name: 'treemain',
        component: TreeMain,
    },
    {
        path: '/:menu1/:menu2/:menu3',
        name: 'contents',
        component: Contents,
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
