---
title: Basic setup
lang: en-US
---

# Basic setup

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