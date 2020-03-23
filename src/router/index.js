import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

export default new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'calendar',
      component: () => import('@/views/Calendar.vue')
    }, {
      path: '/list',
      name: 'userlist',
      component: () => import('@/views/List.vue')
    }, {
      path: '/view/:id',
      name: 'userview',
      props: route => ({
        id: Number(route.params.id)
      }),
      component: () => import('@/views/View.vue')
    }, {
      path: '/turning',
      name: 'turning',
      component: () => import('@/views/Turning.vue')
    }, {
      path: '/analysis',
      name: 'analysis',
      component: () => import('@/views/Analysis.vue')
    }, {
      path: '/setting',
      name: 'setting',
      component: () => import('@/views/Setting.vue')
    }
  ]
});
