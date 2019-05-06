module.exports = {
  title: "Formspark Documentation",
  description: "Documentation for Formspark",
  head: [
    [
      "link",
      {
        rel: "icon",
        href: "https://cdn.byteboomers.com/img/logo/ico/formspark.ico"
      }
    ],
    [
      "meta",
      {
        property: "og:image",
        content: "https://cdn.byteboomers.com/img/logo/png/formspark--512x512.png"
      }
    ]
  ],
  themeConfig: {
    nav: [
      { text: "Home", link: "/" },
      { text: "Formspark", link: "https://formspark.io" }
    ],
    sidebar: [
      "/",
      "anti-spam",
      "advanced-features",
      "special-input-types",
      "form-validation",
      "ajax-submissions"
    ]
  }
};
