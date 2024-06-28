<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import VPost from '@/components/VPost.vue'

const route = useRoute()
const post = ref({
  id: undefined,
  title: undefined,
  content: undefined
})

onMounted(async () => {
  const postId = route.params.id
  const response = await axios.get(`https://6382fd8fc5a5d312.mokky.dev/posts/${postId}`)
  post.value = response.data
})
</script>

<template>
  <v-post :post="post" />
</template>

<style lang="scss" scoped></style>
