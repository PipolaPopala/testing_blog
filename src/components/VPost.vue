<script setup lang="ts">
import { useRouter } from 'vue-router'
import axios from 'axios'
import { usePostListStore } from '@/stores/postList'

defineProps({
  post: { type: Object, required: true }
})

const router = useRouter()
const postListStore = usePostListStore()

const handleDelete = async (id: number) => {
  await axios.delete(`https://6382fd8fc5a5d312.mokky.dev/posts/${id}`)
  postListStore.fetchPosts(1)
  router.push('/')
}

const handleEdit = (id: number) => {
  router.push('/editPost/' + id)
}
</script>

<template>
  <v-card class="mx-auto" prepend-icon="$vuetify" :subtitle="post.createdAt" width="700">
    <template v-slot:title>
      <span class="font-weight-black">{{ post.id }} {{ post.title }}</span>
    </template>

    <v-card-text class="bg-surface-light pt-4">
      {{ post.body }}
    </v-card-text>

    <template v-slot:actions>
      <v-btn text="Удалить" color="red" @click.stop="handleDelete(post.id)"></v-btn>
      <v-btn text="Редактировать" color="blue" @click.stop="handleEdit(post.id)"></v-btn>
    </template>
  </v-card>
</template>

<style lang="scss" scoped></style>
