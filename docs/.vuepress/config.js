const { description } = require("../../package");

module.exports = {
  title: "Formspark Documentation",
  description: description,
  head: [
    [
      "link",
      {
        rel: "icon",
        href: "https://cdn.byteboomers.com/img/logo/ico/formspark.ico",
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
          "https://cdn.byteboomers.com/img/logo/png/formspark--1200x630.png",
      },
    ],
    [
      "meta",
      {
        property: "og:image:type",
        content: "image/png",
      },
    ],
    [
      "meta",
      {
        property: "og:image:width",
        content: "1200",
      },
    ],
    [
      "meta",
      {
        property: "og:image:height",
        content: "630",
      },
    ],
    ["meta", { name: "theme-color", content: "#707ee7" }],
    ["meta", { name: "apple-mobile-web-app-capable", content: "yes" }],
    [
      "meta",
      { name: "apple-mobile-web-app-status-bar-style", content: "black" },
    ],
  ],
  themeConfig: {
    logo: "https://cdn.byteboomers.com/img/logo/svg/formspark.svg",
    repo: "formspark/documentation",
    docsDir: "docs",
    editLinks: true,
    nav: [
      { text: "Home", link: "/" },
      { text: "Formspark", link: "https://formspark.io" },
    ],
    sidebar: [
      {
        title: "Introduction",
        collapsable: false,
        children: [["/", "About"]],
      },
      {
        title: "Setup",
        collapsable: false,
        children: [
          ["/setup/", "Installation"],
          ["/setup/spam-protection", "Spam protection"],
        ],
      },
      {
        title: "Customization",
        collapsable: false,
        children: [
          ["/customization/redirection", "Redirection"],
          ["/customization/direct-replies", "Direct replies"],
          ["/customization/email", "Email"],
        ],
      },
      {
        title: "Dashboard",
        collapsable: false,
        children: [
          [
            "/dashboard/email-notification-settings",
            "Email notification settings",
          ],
          ["/dashboard/inviting-team-members", "Inviting team members"],
          ["/dashboard/additional-workspaces", "Additional workspaces"],
          ["/dashboard/exporting-submissions", "Exporting submissions"],
        ],
      },
      {
        title: "HTML form",
        collapsable: false,
        children: [
          ["/html-form/form-validation", "Form validation"],
          ["/html-form/special-input-types", "Special input types"],
          ["/html-form/submit-in-different-tab", "Submit in different tab"],
        ],
      },
      {
        title: "Examples",
        collapsable: false,
        children: [
          ["/examples/ajax", "AJAX submissions"],
          ["/examples/react", "React"],
          ["/examples/gatsby", "Gatsby"],
          ["/examples/nextjs", "Next.js"],
          ["/examples/nuxtjs", "Nuxt.js"],
        ],
      },
      {
        title: "Integration",
        collapsable: false,
        children: [
          ["/integration/slack", "Slack"],
          ["/integration/webhooks", "Webhooks"],
        ],
      },
    ],
  },
  plugins: ["@vuepress/plugin-back-to-top"],
};
