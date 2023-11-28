<template>
    <div class="navbar bg-base-100 dark:bg-base-200 px-6">
        <div class="flex-1">
            <nuxt-link to="/" class="btn btn-ghost text-xl">F-BOT</nuxt-link>
        </div>
        <div class="flex-none gap-3">
            <div class="max-w-[10em] sm:max-w-none w-full overflow-x-auto overflow-y-hidden">
                <Breadcrumbs/>
            </div>
            <div class="dropdown dropdown-end" v-if="user?.id">
                <label tabindex="0" class="btn btn-ghost btn-circle avatar">
                    <div class="w-8 rounded-full">
                    <img alt="Tailwind CSS Navbar component" :src="user?.user_metadata.avatar_url" />
                    </div>
                </label>
                <ul tabindex="0" class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-200 rounded-box w-40">
                    <li><nuxt-link to="/dashboard/setting">Settings</nuxt-link></li>
                    <li><nuxt-link to="#" @click.native="logoutModal = true">Logout</nuxt-link></li>
                </ul>
            </div>
        </div>
    </div>
    <input type="checkbox" v-model="logoutModal" class="modal-toggle hidden" />
    <div class="modal" v-if="user?.id">
        <div class="modal-box">
            <button @click="logoutModal = false" class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
            <span>Are you sure?</span>
            <div class="mt-5 flex items-center w-full space-x-1.5 justify-end">
                <button class="btn btn-error capitalize" @click="logout">Yes, logout</button>
                <button class="btn btn-accent capitalize" @click="logoutModal = false">Cancel</button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const user = useSupabaseUser()
const client = useSupabaseClient()
const logoutModal = ref<boolean>(false)
const logout = async () => {
    await client.auth.signOut();
    navigateTo("/")
}
</script>