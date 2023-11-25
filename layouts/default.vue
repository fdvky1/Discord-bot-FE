<template>
    <section class="dark:bg-base-300 h-[calc(100vh-1.5rem)]">
    <Header />
    <slot />
    <div class="toast toast-top toast-end" v-if="toastState.message.length > 0">
      <div class="alert " :class="'alert-' + toastState.type">
        <span>{{ toastState.message }}</span>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useMyToastStore } from '@/stores/toast';
const toastState = useMyToastStore()
</script>