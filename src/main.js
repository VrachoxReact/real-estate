import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import "./assets/tailwind.css";

const app = createApp(App);
const pinia = createPinia();

app.config.globalProperties.$style = {
  colors: {
    primary: "#2563eb", // Modern blue
    secondary: "#4f46e5", // Indigo
    accent: "#0ea5e9", // Sky blue
    success: "#059669", // Emerald
    warning: "#eab308", // Yellow
    error: "#dc2626", // Red
    dark: "#1e293b", // Slate
    light: "#f8fafc", // Light gray
  },
  gradients: {
    primary: "bg-gradient-to-r from-blue-600 to-indigo-600",
    secondary: "bg-gradient-to-r from-indigo-600 to-purple-600",
    accent: "bg-gradient-to-r from-sky-500 to-blue-600",
  },
};

app.use(pinia);
app.use(router);
app.mount("#app");
