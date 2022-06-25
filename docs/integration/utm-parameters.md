---
title: UTM parameters
lang: en-US
---

# UTM parameters

Marketers use UTM parameters to track the effectiveness of online campaigns across traffic sources and publishing media.
The parameters identify the campaign that refers traffic to a specific website and can be parsed by analytics tools and used to populate reports.

Copying these parameters and injecting them into your form submissions manually is tedious and error-prone, we built Formtrack to automate this integration.

## Installation & usage

Add the Formtrack script.

```html
<script src="https://unpkg.com/@formspark/formtrack" async></script>
```

Add a `data-formtrack` attribute to your form element.

```html
<form action="https://submit-form.com" data-formtrack>
  <input type="text" name="message" />
  <button type="submit">Send</button>
</form>
```

Formtrack will now automatically inject the supported parameters into your HTML form submissions.

## Supported parameters

| Parameter    | Purpose                                                                                                                                                                | Example                                      |
| ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| ref          | Identifies which site sent the traffic, not an official parameter.                                                                                                     |                                              |
| referrer     | Identifies which site sent the traffic, not an official parameter.                                                                                                     | referrer=producthunt                         |
| utm_source   | Identifies which site sent the traffic, and is a required parameter.                                                                                                   | utm_source=google                            |
| utm_medium   | Identifies what type of link was used, such as cost per click or email.                                                                                                | utm_medium=cpc                               |
| utm_campaign | Identifies a specific product promotion or strategic campaign.                                                                                                         | utm_campaign=spring_sale                     |
| utm_term     | Identifies search terms.                                                                                                                                               | utm_term=running+shoes                       |
| utm_content  | Identifies what specifically was clicked to bring the user to the site, such as a banner ad or a text link. It is often used for A/B testing and content-targeted ads. | utm_content=logolink or utm_content=textlink |
