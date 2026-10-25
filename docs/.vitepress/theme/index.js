import { sanitizeSentryEvent } from "./sentry-privacy.js";
import DefaultTheme from "vitepress/theme";
import * as Sentry from "@sentry/vue";
import { h } from "vue";
import CopyForAgents from "./CopyForAgents.vue";
import "./style.css";

export default {
  extends: DefaultTheme,
  Layout: () =>
    h(DefaultTheme.Layout, null, { "doc-before": () => h(CopyForAgents) }),
  enhanceApp({ app }) {
    if (typeof window !== "undefined" && import.meta.env.PROD) {
      Sentry.init({
        app,
        dsn: "https://d0d1620e3b0e46d2b84cb7a1ce25011a@o456819.ingest.sentry.io/5450322",
        sendDefaultPii: false,
        beforeSend: sanitizeSentryEvent,
        beforeBreadcrumb: () => null,
      });
    }
  },
};
