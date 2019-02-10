module.exports = {
  title: 'Formspark Documentation',
  description: 'Documentation for Formspark',
  head: [['link', { rel: 'icon', href: '/logo.png' }]],
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Formspark', link: 'https://formspark.io' }
    ],
    sidebar: [
      '/',
      'advanced-features',
      'special-input-types',
      'form-validation',
      'ajax-submissions'
    ]
  }
};
