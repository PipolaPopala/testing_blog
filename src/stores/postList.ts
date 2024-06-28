import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

export const usePostListStore = defineStore('postList', () => {
  const postList = ref([])

  const fetchPosts = async () => {
    try {
      const response = await axios.get('https://6382fd8fc5a5d312.mokky.dev/posts?sortBy=-id')
      postList.value = response.data
    } catch (error) {
      console.error('Ошибка при загрузке постов:', error)
    }
  }

  return { postList, fetchPosts }
})
