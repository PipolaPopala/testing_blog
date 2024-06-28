<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import axios from 'axios'
import { useForm } from 'vee-validate'
import * as yup from 'yup'
import { usePostListStore } from '@/stores/postList'

const schema = yup.object({
  title: yup.string().min(1).max(12).required(),
  body: yup.string().min(1).max(50).required()
})

const { defineField, errors, handleSubmit } = useForm({
  validationSchema: schema
})

const [title, titleAttrs] = defineField('title')
const [body, bodyAttrs] = defineField('body')

const router = useRouter()
const route = useRoute()

const postListStore = usePostListStore()

const post = ref<{ id: number; title: string; body: string }>({
  id: 0,
  title: '',
  body: ''
})

const editPost = async () => {
  post.value = { id: post.value.id, title: title.value, body: body.value }
  try {
    await axios.patch(`https://6382fd8fc5a5d312.mokky.dev/posts/${post.value.id}`, post.value)
    router.push('/')
  } catch (error) {
    console.error(error)
  }
}

const onSubmit = handleSubmit(() => {
  editPost()
})

onMounted(() => {
  const postId = Number(route.params.id)
  const existingPost = postListStore.postList.find((post) => post.id === postId)
  if (existingPost) {
    title.value = existingPost.title
    body.value = existingPost.body
    post.value = {
      id: existingPost.id,
      title: existingPost.title,
      body: existingPost.body
    }
  }
})
</script>

<template>
  <div>
    <v-form class="form" @submit.prevent="onSubmit">
      <h1 class="title">Редактирование поста</h1>
      <v-text-field
        bg-color="grey-lighten-2"
        label="Заголовок:"
        v-model="title"
        v-bind="titleAttrs"
      ></v-text-field>
      <span>{{ errors.title }}</span>
      <v-textarea
        bg-color="grey-lighten-2"
        label="Содержание:"
        v-model="body"
        v-bind="bodyAttrs"
      ></v-textarea>
      <span>{{ errors.body }}</span>
      <div class="create-post">
        <v-btn size="x-large" elevation="12" color="green" type="submit">
          Редактировать пост
        </v-btn>
      </div>
    </v-form>
  </div>
</template>

<style lang="scss" scoped>
.title {
  color: #cecece;
  font-weight: 600;
  font-size: 22px;
}

.form {
  width: 100%;
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
}

.create-post {
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
}
</style>
