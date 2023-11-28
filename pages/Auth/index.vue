<template>
    <div class="w-full min-h-[calc(100vh-12rem)] grid place-items-center">
        <button type="button" @click="signWithDiscord" class="btn">
            <span>Continue with </span>
            <ClientOnly>
                <font-awesome-icon icon="fab fa-discord" class="max-h-5"/>        
            </ClientOnly>
        </button>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    middleware: () => {
        const user = useSupabaseUser();
        if(user.value) return navigateTo('/dashboard')
    }
})

const supabase = useSupabaseClient()

const signWithDiscord = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
        provider: 'discord',
    });

    if (error) {
        console.error(error);
    }
}
</script>