---
title: Special input types
lang: en-US
---

# Special input types

## Radio

Radio buttons let a user select ONLY ONE of a limited number of choices.

Only the value of the checked choice will be sent to the destination.

All choices should share the same "name" attribute.

``` html
<form action="https://submit-form.com/<your-destination-id>">
  <input type="radio" name="color" value="blue" checked> Blue
  <input type="radio" name="color" value="red"> Red
  <input type="radio" name="color" value="green"> Green
  <button type="submit">Submit</button>
</form>
```

## Checkbox

Checkboxes let a user select ZERO or MORE options of a limited number of choices.

The value of each checked choice will be sent to the destination.

All choices should have a unique "name" attribute.

``` html
<form action="https://submit-form.com/<your-destination-id>">
  <input type="checkbox" name="hasBike" value="Bike"> I have a bike
  <input type="checkbox" name="hasCar" value="Car"> I have a car 
  <button type="submit">Submit</button>
</form>
```