<template>
    <div class="min-h-[calc(100vh-24rem)] grid place-items-center w-full">
        <div class="container mx-auto px-2 pt-10">
            <h1 class="text-xl md:text-2xl lg:text-4xl font-medium text-center">Create your own Discord Bot</h1>
            <p class="text-center mt-4 text-sm md:text-lg">Create your own Discord bot for free. <br class="hidden lg:block"/>No coding required, <br class="block lg:hidden"/>just choose the command what do you need</p>
            <div class="w-full flex justify-center mt-2.5 lg:mt-4">
                <nuxt-link to="/Dashboard" class="btn dark:bg-base-100 lg:text-lg">Create a bot</nuxt-link>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const user = useSupabaseUser()
const route = useRoute()
if(user.value?.id && route.query["code"]) navigateTo("/dashboard")
</script>