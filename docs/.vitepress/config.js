import { sidebar } from "./sidebar.js";

const SITE_URL = "https://documentation.formspark.io";
const TITLE = "Formspark Documentation";
const CDN = "https://cdn.formspark.io/images/formspark/logos";

const meta = (entries) =>
  Object.entries(entries).map(([key, content]) => [
    "meta",
    // og:* is an Open Graph property, everything else is a plain meta name.
    { [key.startsWith("og:") ? "property" : "name"]: key, content },
  ]);

export default {
  lang: "en-US",
  title: TITLE,
  description: "Formspark documentation",
  // The bucket serves the built files by exact key and rewrites nothing, so
  // only .html paths and directory indexes resolve. Keep this false unless the
  // hosting gains an extensionless rewrite: with it on, every deep link and
  // sitemap entry misses, and the CloudFront error page answers with the home
  // page under the requested page's title instead of a visible failure.
  cleanUrls: false,
  sitemap: {
    hostname: SITE_URL,
  },
  head: [
    ["link", { rel: "icon", href: `${CDN}/formspark.ico` }],
    ...meta({
      "og:title": TITLE,
      "og:url": SITE_URL,
      "og:image": `${CDN}/formspark--1200x630.png`,
      "og:image:type": "image/png",
      "og:image:width": "1200",
      "og:image:height": "630",
      "theme-color": "#707ee7",
      "mobile-web-app-capable": "yes",
      "apple-mobile-web-app-capable": "yes",
      "apple-mobile-web-app-status-bar-style": "black",
    }),
  ],
  themeConfig: {
    logo: `${CDN}/formspark.svg`,
    outline: [2, 3],
    // Overrides the theme's stock copy, which offers a proverb rather than the
    // two things a visitor here needs: why the page is missing, and where to go.
    notFound: {
      title: "Page not found",
      quote:
        "This page may have moved, or the link that brought you here may be out of date. Search above, or start from the documentation home.",
      linkLabel: "Go to the documentation home",
      linkText: "Documentation home",
    },
    editLink: {
      pattern:
        "https://github.com/formspark/documentation/edit/master/docs/:path",
    },
    nav: [
      { text: "Home", link: "/" },
      { text: "Formspark", link: "https://formspark.io" },
    ],
    socialLinks: [
      { icon: "github", link: "https://github.com/formspark/documentation" },
    ],
    search: {
      provider: "local",
    },
    sidebar,
  },
};
