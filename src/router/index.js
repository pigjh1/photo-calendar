import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

export default new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior(to, from, savedPosition) {
    return {
      x: 0,
      y: 0
    };
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/Home.vue')
    }, {
      path: '/list',
      name: 'userlist',
      component: () => import('@/views/UserList.vue')
    }, {
      path: '/filter',
      name: 'userfilter',
      component: () => import('@/views/UserFilter.vue')
    }, {
      path: '/view/:id',
      name: 'userview',
      props: route => ({
        id: Number(route.params.id)
      }),
      component: () => import('@/views/UserView.vue')
    }, {
      path: '/actor/:name',
      name: 'actorview',
      props: route => ({
        name: route.params.name
      }),
      component: () => import('@/views/ViewActor.vue')
    }, {
      path: '/place/:name',
      name: 'placeview',
      props: route => ({
        name: route.params.name
      }),
      component: () => import('@/views/ViewPlace.vue')
    }, {
      path: '/turning',
      name: 'turning',
      component: () => import('@/views/TurningList.vue')
    }, {
      path: '/turning/:name',
      name: 'turningview',
      props: route => ({
        name: route.params.name
      }),
      component: () => import('@/views/TurningView.vue')
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
