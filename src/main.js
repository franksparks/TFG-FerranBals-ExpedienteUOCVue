import { createApp } from "vue";
import App from "./App.vue";
import "./assets/tailwind.css";

import i18n from "./includes/i18n";

const app = createApp(App);

app.use(i18n);

app.mount("#app");
