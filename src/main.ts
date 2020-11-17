import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { library } from '@fortawesome/fontawesome-svg-core'
import { faArrowsAltH } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";


library.add(faArrowsAltH)

createApp(App)
  .use(router)
  .component("fa", FontAwesomeIcon)
  .mount("#app");
