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
        content:
          "https://cdn.byteboomers.com/img/logo/png/formspark--512x512.png"
      }
    ]
  ],
  themeConfig: {
    nav: [
      { text: "Home", link: "/" },
      { text: "Formspark", link: "https://formspark.io" }
    ],
    sidebar: [
      {
        title: "Introduction",
        collapsable: false,
        children: [["/", "About"]]
      },
      {
        title: "Setup",
        collapsable: false,
        children: [
          ["/setup/", "Installation"],
          ["/setup/spam-protection", "Spam protection"]
        ]
      },
      {
        title: "Customization",
        collapsable: false,
        children: [
          ["/customization/custom-redirect", "Custom redirect"],
          ["/customization/direct-replies", "Direct replies"]
        ]
      },
      {
        title: "HTML form",
        collapsable: false,
        children: [
          ["/html-form/form-validation", "Form validation"],
          ["/html-form/special-input-types", "Special input types"],
          ["/html-form/submit-in-different-tab", "Submit in different tab"]
        ]
      },
      {
        title: "Javascript",
        collapsable: false,
        children: [["/javascript/ajax-submissions", "AJAX submissions"]]
      }
    ]
  }
};
