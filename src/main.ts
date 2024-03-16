import { createApp } from "vue";
import { FMessage } from "@fesjs/fes-design";
import "./style.css";
import App from "./App.vue";

FMessage.info("hello world");

createApp(App).mount("#app");
