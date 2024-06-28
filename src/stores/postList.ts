import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

interface Post {
  id: number
  title: string
  body: string
  createdAt: Date
}
interface PostsMeta {
  current_page: number
  per_page: number
  remaining_count: number
  total_items: number
  total_pages: number
}

export const usePostListStore = defineStore('postList', () => {
  const postList = ref<Post[]>([])
  const postListMeta = ref<PostsMeta>({
    current_page: 0,
    per_page: 0,
    remaining_count: 0,
    total_items: 0,
    total_pages: 0
  })

  const fetchPosts = async (page: number) => {
    try {
      const response = await axios.get(
        `https://6382fd8fc5a5d312.mokky.dev/posts?page=${page}&limit=5&sortBy=-id`
      )
      postList.value = response.data.items
      postListMeta.value = response.data.meta
      console.log(response.data)
    } catch (error) {
      console.error('Ошибка при загрузке постов:', error)
    }
  }

  return { postList, postListMeta, fetchPosts }
})
