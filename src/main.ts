import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import "./assets/main.css";

// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
const app = createApp(App);

app.use(router);

app.mount("#app");
