<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import { useBreadcrumbsStore } from '@/stores/breadcrumbs'

const breadcrumbsStore = useBreadcrumbsStore()

onMounted(() => {
  // Принудительно запускаем обновление breadcrumbs при монтировании
  breadcrumbsStore.$patch(() => {})
})
</script>

<template>
  <header>
    <v-breadcrumbs bg-color="info" divider="-" :items="breadcrumbsStore.breadcrumbs">
      <template v-slot:prepend>
        <v-icon icon="$vuetify" size="small"></v-icon>
      </template>
    </v-breadcrumbs>
  </header>
  <main>
    <RouterView />
  </main>
</template>

<style lang="scss" scoped>
header {
  position: sticky;
  top: 0;
  z-index: 1;
}

main {
  max-width: 1200px;
  margin: 0 auto;
  padding-top: 3rem;
}
</style>
