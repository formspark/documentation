import Lyticus from "lyticus";
import * as Sentry from "@sentry/browser";
import * as Integrations from "@sentry/integrations";

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
        dsn: "https://144d42ce810d469f8b62b024ecc79e45@sentry.io/1475734",
        integrations: [new Integrations.Vue({ Vue, attachProps: true })],
      });
    }
  }
};
