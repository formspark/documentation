import { sanitizeSentryEvent } from "./sentry-privacy.js";
import DefaultTheme from "vitepress/theme";
import * as Sentry from "@sentry/vue";
import "./style.css";

export default {
  extends: DefaultTheme,
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
