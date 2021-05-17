import Lyticus from "lyticus";
import * as Sentry from "@sentry/browser";
import { Vue as VueIntegration } from "@sentry/integrations";
import { Integrations } from "@sentry/tracing";

export default ({ Vue, router }) => {
  if (typeof window !== "undefined") {
    // Lyticus
    const lyticus = new Lyticus("Cxd-1LCX8Lzbe_KSuk0Yy", {
      development: process.env.NODE_ENV === "development",
    });
    lyticus.trackNavigator();
    router.afterEach((to) => {
      lyticus.trackPage(to.fullPath);
    });
    // Sentry
    if (process.env.NODE_ENV !== "development") {
      Sentry.init({
        dsn: "https://d0d1620e3b0e46d2b84cb7a1ce25011a@o456819.ingest.sentry.io/5450322",
        integrations: [
          new VueIntegration({
            Vue,
            tracing: true,
          }),
          new Integrations.BrowserTracing(),
        ],
        tracesSampleRate: 1.0,
      });
    }
  }
};
