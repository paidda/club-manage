import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
export const constantRouterMap = [
  {
    path: '/',
    component: resolve => require(['../pages/Login.vue'], resolve)
  },
  {
    path: '/Home',
    component: resolve => require(['../components/Home.vue'], resolve),
    children:[
      {
        path: '/Info',
        component: resolve => require(['../pages/InfoPage.vue'], resolve)
      },
      {
        path: '/Consumer',
        permission: 'admin',
        component: resolve => require(['../pages/club/ConsumerPage.vue'], resolve)
      },
      {
        path: '/Notice',
        permission: 'admin',
        component: resolve => require(['../pages/club/NoticePage.vue'], resolve)
      },
      {
        path: '/Club',
        permission: 'admin',
        component: resolve => require(['../pages/club/ClubPage.vue'], resolve)
      },
      {
        path: '/ClubList',
        component: resolve => require(['../pages/user/ClubListPage.vue'], resolve)
      },
      {
        path: '/myClubList',
        component: resolve => require(['../pages/user/MyClubListPage.vue'], resolve)
      },
      {
        path: '/Active',
        permission: 'admin',
        component: resolve => require(['../pages/active/ActivePage.vue'], resolve)
      },
      {
        path: '/ActiveList',
        component: resolve => require(['../pages/user/ActiveListPage.vue'], resolve)
      },
      {
        path: '/MyActiveList',
        component: resolve => require(['../pages/user/MyActiveListPage.vue'], resolve)
      }

    ]
  }
]
export default new Router({
  routes: constantRouterMap
})
