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
  pwa:{
    manifest: {
      "theme_color": "#fff",
      "background_color": "#fff",
      "display": "standalone",
      "scope": "/",
      "start_url": "/",
      "name": "Discord Bot",
      "short_name": "D25",
      "icons": [
          {
              "purpose": "maskable",
              "src": "images/icon512_maskable.png",
              "sizes": "512x512",
              "type": "image/png"
          },
          {
              "purpose": "any",
              "src": "images/icon512_rounded.png",
              "sizes": "512x512",
              "type": "image/png"
          },
      ]
    },
    devOptions: {
      enabled: true
    }
  }
})
