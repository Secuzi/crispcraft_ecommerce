import "./assets/main.css";
import "primeicons/primeicons.css";
import { createApp } from "vue";
import App from "./App.vue";
import axios from "axios";
import router from "./router/route";
import PrimeVue from "primevue/config";
import { definePreset } from "@primevue/themes";
import { createPinia } from "pinia";
import Aura from "@primevue/themes/aura";
import ToastService from "primevue/toastservice";
import { useOrderItemStore } from "./stores/orderItem";
const pinia = createPinia();

const app = createApp(App);
axios.defaults.baseURL = "http://localhost:3000";
axios.defaults.withCredentials = true;

router.beforeEach((to, from, next) => {
  const orderItemStore = useOrderItemStore();
  const isAnyProductActive = orderItemStore.products.some((p) => p.active);

  if (to.meta.requiresActiveProduct && !isAnyProductActive) {
    next("/order"); // Redirect back to the current page
  } else {
    next(); // Allow navigation
  }
});

app.use(router);
app.use(ToastService);

const MyPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: "{indigo.50}",
      100: "{indigo.100}",
      200: "{indigo.200}",
      300: "{indigo.300}",
      400: "{indigo.400}",
      500: "{indigo.500}",
      600: "{indigo.600}",
      700: "{indigo.700}",
      800: "{indigo.800}",
      900: "{indigo.900}",
      950: "{indigo.950}",
    },
    text: {
      color: "black",
    },

    inputtext: {
      color: "black",
    },
  },
  components: {
    inputtext: {
      background: "white",
      border: {
        radius: "25px",
      },
    },
    inputnumber: {
      button: {
        active: "#527c55",
        width: "20px",
        active: {
          border: {
            color: "#527c55",
          },
        },
      },

      border: {
        radius: "5px",
      },
    },
  },
});

// app.use(PrimeVue, {
//   unstyled: true,
//   pt: Aura,
// });
app.use(PrimeVue, {
  theme: {
    preset: MyPreset,
    options: {
      darkModeSelector: ".app-dark",
    },
  },
});
app.use(pinia);
app.mount("#app");
