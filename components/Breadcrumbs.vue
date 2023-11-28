<template>
    <div class="px-4">
      <div class="text-sm breadcrumbs">
        <ul v-if="$route.name?.toString().includes('-')">
          <li v-for="(item, index) in $route.name?.toString().split('-')" :key="index">
            <nuxt-link :to="'/' + $route.name?.toString().split('-').slice(0, index + 1).join('/')">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="w-4 h-4 stroke-current mr-1"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path></svg>
              {{ item }}
            </nuxt-link>
          </li> 
        </ul>
      </div>
    </div>
</template>