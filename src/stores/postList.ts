import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

interface Post {
  id: number
  title: string
  body: string
  createdAt: Date
}

export const usePostListStore = defineStore('postList', () => {
  const postList = ref<Post[]>([])

  const fetchPosts = async () => {
    try {
      const response = await axios.get('https://6382fd8fc5a5d312.mokky.dev/posts?sortBy=-id')
      postList.value = response.data
      console.log(response.data)
    } catch (error) {
      console.error('Ошибка при загрузке постов:', error)
    }
  }

  return { postList, fetchPosts }
})
