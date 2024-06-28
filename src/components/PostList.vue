<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { usePostListStore } from '@/stores/postList'
import VPost from '@/components/VPost.vue'

interface Post {
  id: number
  title: string
  body: string
  createdAt: date
}

const router = useRouter()
const postListStore = usePostListStore()
const postList = ref<Post[]>([])

const handleAddPost = () => {
  router.push('/addPost')
}

const toPost = (id: number) => {
  router.push('/post/' + id)
}

onMounted(async () => {
  await postListStore.fetchPosts()
  postList.value = postListStore.postList as Post[]
})
</script>

<template>
  <div class="create-post">
    <v-btn size="x-large" elevation="12" color="green" @click="handleAddPost">
      Создать новый пост
    </v-btn>
  </div>
  <div class="post-list">
    <v-post
      v-for="post in postListStore.postList"
      :key="post.id"
      :post="post"
      @click="toPost(post.id)"
    ></v-post>
  </div>
</template>

<style lang="scss" scoped>
.create-post {
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
}
.post-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
