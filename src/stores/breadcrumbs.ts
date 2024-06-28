import { ref, watch } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'

export const useBreadcrumbsStore = defineStore('breadcrumbs', () => {
  const router = useRouter()
  const breadcrumbs = ref([
    {
      title: 'Home',
      disabled: false,
      to: '/'
    }
  ])

  // Отслеживаем изменения в маршруте
  watch(
    () => router.currentRoute.value,
    (newRoute) => {
      // Обновляем breadcrumbs в зависимости от маршрута
      if (newRoute.path === '/') {
        breadcrumbs.value = [
          {
            title: 'Home',
            disabled: false,
            to: '/'
          }
        ]
      } else if (newRoute.path.startsWith('/post/')) {
        breadcrumbs.value = [
          {
            title: 'Home',
            disabled: false,
            to: '/'
          },
          {
            title: 'Post',
            disabled: true,
            to: newRoute.path
          }
        ]
      } else if (newRoute.path === '/addPost') {
        breadcrumbs.value = [
          {
            title: 'Home',
            disabled: false,
            to: '/'
          },
          {
            title: 'AddPost',
            disabled: true,
            to: newRoute.path
          }
        ]
      } else if (newRoute.path.startsWith('/editPost/')) {
        breadcrumbs.value = [
          {
            title: 'Home',
            disabled: false,
            to: '/'
          },
          {
            title: 'EditPost',
            disabled: true,
            to: newRoute.path
          }
        ]
      }
    },
    { immediate: true } // Вызываем watch сразу при инициализации
  )

  return { breadcrumbs }
})
