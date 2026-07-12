export default {
  lang: "en-US",
  title: "Formspark Documentation",
  description: "Formspark documentation",
  cleanUrls: true,
  sitemap: {
    hostname: "https://documentation.formspark.io",
  },
  head: [
    [
      "link",
      {
        rel: "icon",
        href: "https://cdn.formspark.io/images/formspark/logos/formspark.ico",
      },
    ],
    [
      "meta",
      {
        property: "og:title",
        content: "Formspark Documentation",
      },
    ],
    [
      "meta",
      {
        property: "og:url",
        content: "https://documentation.formspark.io",
      },
    ],
    [
      "meta",
      {
        property: "og:image",
        content:
          "https://cdn.formspark.io/images/formspark/logos/formspark--1200x630.png",
      },
    ],
    ["meta", { property: "og:image:type", content: "image/png" }],
    ["meta", { property: "og:image:width", content: "1200" }],
    ["meta", { property: "og:image:height", content: "630" }],
    ["meta", { name: "theme-color", content: "#707ee7" }],
    ["meta", { name: "mobile-web-app-capable", content: "yes" }],
    ["meta", { name: "apple-mobile-web-app-capable", content: "yes" }],
    [
      "meta",
      { name: "apple-mobile-web-app-status-bar-style", content: "black" },
    ],
  ],
  themeConfig: {
    logo: "https://cdn.formspark.io/images/formspark/logos/formspark.svg",
    outline: [2, 3],
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
    sidebar: [
      {
        text: "Introduction",
        items: [{ text: "About", link: "/" }],
      },
      {
        text: "Setup",
        items: [
          { text: "Installation", link: "/setup/" },
          { text: "Spam protection", link: "/setup/spam-protection" },
          { text: "File uploads", link: "/setup/file-uploads" },
          { text: "Arrays and objects", link: "/setup/arrays-and-objects" },
        ],
      },
      {
        text: "Customization",
        items: [
          { text: "Redirection", link: "/customization/redirection" },
          { text: "Feedback page", link: "/customization/feedback-page" },
          {
            text: "Notification email",
            link: "/customization/notification-email",
          },
          { text: "Direct replies", link: "/customization/direct-replies" },
          { text: "Custom routing", link: "/customization/custom-routing" },
        ],
      },
      {
        text: "Dashboard",
        items: [
          {
            text: "Inviting team members",
            link: "/dashboard/inviting-team-members",
          },
          {
            text: "Additional workspaces",
            link: "/dashboard/additional-workspaces",
          },
          {
            text: "Redeeming vouchers",
            link: "/dashboard/redeeming-vouchers",
          },
          {
            text: "Email notification settings",
            link: "/dashboard/email-notification-settings",
          },
          {
            text: "Autoresponder",
            link: "/dashboard/autoresponder",
          },
          {
            text: "Exporting submissions",
            link: "/dashboard/exporting-submissions",
          },
        ],
      },
      {
        text: "HTML form",
        items: [
          { text: "Form validation", link: "/html-form/form-validation" },
          { text: "Form styling", link: "/html-form/form-styling" },
          {
            text: "Special input types",
            link: "/html-form/special-input-types",
          },
          { text: "Drop-down list", link: "/html-form/drop-down-list" },
          {
            text: "Submit in different tab",
            link: "/html-form/submit-in-different-tab",
          },
        ],
      },
      {
        text: "Examples",
        items: [
          { text: "AJAX submissions", link: "/examples/ajax" },
          { text: "Alpine.js", link: "/examples/alpinejs" },
          { text: "Astro", link: "/examples/astro" },
          { text: "Framer", link: "/examples/framer" },
          { text: "Gatsby", link: "/examples/gatsby" },
          { text: "HTMX", link: "/examples/htmx" },
          { text: "Hugo", link: "/examples/hugo" },
          { text: "Jekyll", link: "/examples/jekyll" },
          { text: "Next.js", link: "/examples/nextjs" },
          { text: "Nuxt", link: "/examples/nuxtjs" },
          { text: "React", link: "/examples/react" },
          { text: "React Native", link: "/examples/react-native" },
          { text: "Svelte", link: "/examples/svelte" },
          { text: "SvelteKit", link: "/examples/sveltekit" },
          { text: "Vue", link: "/examples/vue" },
          { text: "Webflow", link: "/examples/webflow" },
          { text: "WordPress", link: "/examples/wordpress" },
        ],
      },
      {
        text: "Integrations",
        items: [
          { text: "Airtable", link: "/integration/airtable" },
          { text: "Google Sheets", link: "/integration/google-sheets" },
          { text: "Make", link: "/integration/make" },
          { text: "Notion", link: "/integration/notion" },
          { text: "Slack", link: "/integration/slack" },
          { text: "UTM parameters", link: "/integration/utm-parameters" },
          { text: "Webhooks", link: "/integration/webhooks" },
          { text: "Zapier", link: "/integration/zapier" },
        ],
      },
      {
        text: "Troubleshooting",
        items: [
          {
            text: "Common issues",
            link: "/troubleshooting/common-issues",
          },
          {
            text: "Email reception",
            link: "/troubleshooting/email-reception",
          },
        ],
      },
    ],
  },
};
