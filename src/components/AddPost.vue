<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import { useForm } from 'vee-validate'
import * as yup from 'yup'
import { usePostListStore } from '@/stores/postList'

interface Post {
  id: number
  title: string
  body: string
  createdAt?: string
}

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

const postListStore = usePostListStore()

const newPost = ref<{ title: string; body: string }>({
  title: '',
  body: ''
})

const addPost = async () => {
  newPost.value = { title: title.value, body: body.value }
  const posts = postListStore.postList
  const maxId = posts.length > 0 ? Math.max(...posts.map((post) => post.id)) : 0
  const newId = maxId + 1
  const currentDate = new Date().toISOString()

  const postToAdd: Post = {
    id: newId,
    title: newPost.value.title,
    body: newPost.value.body,
    createdAt: currentDate
  }

  try {
    await axios.post('https://6382fd8fc5a5d312.mokky.dev/posts', postToAdd)
    router.push('/')
  } catch (error) {
    console.error(error)
  }
}

const onSubmit = handleSubmit(() => {
  addPost()
})
</script>

<template>
  <div>
    <v-form class="form" @submit.prevent="onSubmit">
      <h1 class="title">Добавление нового поста</h1>
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
        <v-btn size="x-large" elevation="12" color="green" type="submit"> Опубликовать пост </v-btn>
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
