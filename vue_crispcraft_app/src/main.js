import "./assets/main.css";
import "primeicons/primeicons.css";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/route";
import PrimeVue from "primevue/config";
const app = createApp(App);
app.use(router);
app.use(PrimeVue, {
  theme: "none",
});
app.mount("#app");
