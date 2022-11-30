import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'DashboardHome',
        component: () => import('../views/DashboardHome.vue'),
    },
    {
        path: '/admin/',
        name: 'DashboardAdmin',
        component: () => import('../views/DashboardAdmin.vue'),
    },
    {
        path: '/admin/user/new',
        name: 'AdminUserNew',
        component: () => import('../views/AdminUserNew.vue'),
    },
    {
        path: '/admin/user/all',
        name: 'AdminUserViewAll',
        component: () => import('../views/AdminUserViewAll.vue'),
    },
    {
        path: '/app/select-user',
        name: 'SelectUser',
        component: () => import('../views/SelectUser.vue'),
    },
    {
        path: '/app/dashboard',
        name: 'DashboardUser',
        component: () => import('../views/DashboardUser.vue'),
    },
    {
        path: '/app/answers',
        name: 'AnswerList',
        component: () => import('../views/AnswerList.vue'),
    },
    {
        path: '/app/answers/:answerSet',
        name: 'AnswerSingle',
        component: () => import('../views/AnswerSingle.vue'),
    },
    {
        path: '/app/question/',
        name: 'Question',
        component: () => import('../views/QuestionSet.vue'),
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes: routes,
})

export { routes }

export default router
