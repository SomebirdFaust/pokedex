import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PokeDetail from '../components/PokeDetail.vue'
import TypeDetail from '../components/TypeDetail.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path:'/pokedex',
      name:'pokedex',
      component: () => import('../views/PokeView.vue')
    },
    {
      path:'/legendaires',
      name:'legendaires',
      component: () => import('../views/LegendairesView.vue')
    },
    {
      path: '/pokemon/:id',
      name:'pokemon-details',
      component: PokeDetail,
      props: true,
    },
    {
      path: '/type/:id',
      name:'type-detail',
      component: TypeDetail,
      props: true,
    },
    {
      path:'/404', 
      component: () => import('../components/NotFound.vue'),
    },
    {
      // permet de rediriger automatiquement si une page n'est pas trouvée
      path:'/:catchAll(.*)',
      redirect:'/404'
    },
    {
    path:"/types",
    name:"types",
    component: () => import('../views/TypesView.vue'),
    }
  ]
})

export default router
