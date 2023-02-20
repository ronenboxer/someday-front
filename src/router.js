import { createRouter, createWebHashHistory } from 'vue-router'

import home from './views/home.vue'
import homeLogin from './views/home-login.vue'
import boardApp from './views/board-app.vue'
import userDetails from './views/user-details.vue'
import taskDetails from './views/task-details.vue'
import kanbanApp from './views/kanban-app.vue'
import dashboardApp from './views/dashboard-app.vue'
const routes = [
  {
    path: '/',
    name: 'home',
    component: home
  },
  {
    path: '/login',
    name: 'home-login',
    component: homeLogin
  },
  {
    path: '/board/:id/',
    name: 'board-app',
    component: boardApp,
    children: [
      {
        path: 'task/:taskId',
        component: taskDetails
      }
    ]
  },
  {
    path: '/board/:id/kanban',
    name: 'board-kanban',
    component: kanbanApp
  },
  {
    path: '/board/:id/dashboard',
    name: 'board-dashboard',
    component: dashboardApp
  },
  {
    path: '/user/:id',
    name: 'user-details',
    component: userDetails
  }
]


export const router = createRouter({
  routes,
  history: createWebHashHistory()
  // base: process.env.BASE_URL,
})

