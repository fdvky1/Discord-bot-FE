// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "@nuxtjs/supabase", "@pinia/nuxt", "@vite-pwa/nuxt"],
  css: [
    "@fortawesome/fontawesome-svg-core/styles.css"
  ],
  supabase: {
    redirectOptions: {
      login: "/auth",
      callback: "/confirm",
      exclude: ["/"]
    }
  },
  runtimeConfig: {
    public: {
      serviceUrl: process.env.SERVICE_URL!
    }
  },
  pwa: {
    manifest: {"theme_color":"#8936FF","background_color":"#2EC6FE","orientation":"any","display":"standalone","dir":"auto","lang":"en-US","name":"F-BOT","start_url":"/","short_name":"F","description":"Create your own Discord bot for free. No coding required, just choose the command what do you need"}
  }
})
