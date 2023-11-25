// For Nuxt 3
import { library, config } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faDiscord } from '@fortawesome/free-brands-svg-icons'
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons'
import { faChevronRight, faChevronDown } from '@fortawesome/free-solid-svg-icons'
// This is important, we are going to let Nuxt worry about the CSS
config.autoAddCss = false

// You can add your icons directly in this plugin. See other examples for how you
// can add other styles or just individual icons.
library.add(faDiscord, faEye, faEyeSlash, faChevronRight, faChevronDown)

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('font-awesome-icon', FontAwesomeIcon)
})