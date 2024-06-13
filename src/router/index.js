import {createRouter, createWebHistory} from 'vue-router'
import LoginView from "@/views/LoginView.vue";
import HomeView from "@/views/HomeView.vue";
import AdminLoginView from "@/views/admin/AdminLoginView.vue";
import AdminHomeView from "@/views/admin/AdminHomeView.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'default',
            component: HomeView
        },
        {
            path: '/home',
            name: 'home',
            component: HomeView
        },
        {
            path: '/login',
            name: 'login',
            component: LoginView
        },
        {
            path: '/admin/login',
            name: 'admin-login',
            component: AdminLoginView
        },
        {
            path: '/admin/home',
            name: 'admin-home',
            component: AdminHomeView
        },
    ]
})

export default router
