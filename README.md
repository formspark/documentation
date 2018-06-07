---
title: Basic setup
lang: en-US
---

# About

Formspark is a simple way to save information from your website via forms.

Formspark works great when you want the simplicity of a static website, but don't want to setup a server for a form or two. Capture leads on landing pages, use for contact forms, collecting emails for a newsletter, polls, surveys, etc...

Formspark works anywhere you can put an HTML form. It works with any static site generator e.g. Jekyll, Hugo, Hexo, GitBook, Gatsby and all others. Formspark also works on any hosting provider, from blog hosting providers like Wordpress, to static hosting providers like GitHub Pages or S3, to Platform-as-a-Service providers like Heroku and Docker, and any other method of hosting you have up your sleeve.

# Basic setup

[Create a new Formspark account](https://formspark.io/register) if you haven't already. Once you have created an account.

## Create a new destination

[Create a new destination](https://formspark.io/new-destination)

![](https://formspark.io/new-destination.png?74ae43bff54ec1244139b3f3eaa8e117)

## Adapt your form

Set your form's action attribute to the destination's action URL

``` html
<form action="https://submit-form.com/<your-destination-id>">
  <input type="email" name="email">
  <button type="submit">Subscribe</button>
</form>
```

* Ensure all input, select and textarea elements inside your form have a name attribute, otherwise you will not receive the data filled in these fields.
* Make sure your form contains a button element of type submit.