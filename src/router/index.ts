import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PostView from '../views/PostView.vue'
import AddPostView from '../views/AddPostView.vue'
import EditPostView from '../views/EditPostView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/post/:id',
      name: 'post',
      component: PostView,
      props: true
    },
    {
      path: '/addPost',
      name: 'addPost',
      component: AddPostView
    },
    {
      path: '/editPost/:id',
      name: 'editPost',
      component: EditPostView
    }
  ]
})

export default router
