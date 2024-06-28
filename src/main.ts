import './assets/main.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
// в продакшен приложении для оптимизации здесь подключаем не вообще все компоненты из vuetify а только то, что фактически используем, соответственно вынося этот список в отдельный файл, по аналогии с тем, как настройка router находится в отдельном файле.

const vuetify = createVuetify({
  components,
  directives
})

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(vuetify)
app.use(router)

app.mount('#app')
