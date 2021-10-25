---
title: Working with arrays and objects
lang: en-US
---

# Working with arrays and objects

## Arrays

> An array is a collection of similar data elements.

### HTML

You can submit an array by using the `name[index]` syntax:

```html
<form action="https://submit-form.com/your-form-id">
  <input type="text" name="ingredients[0]" placeholder="Ingredient 1" />
  <input type="text" name="ingredients[1]" placeholder="Ingredient 2" />
  <input type="text" name="ingredients[2]" placeholder="Ingredient 3" />
  <input type="text" name="ingredients[3]" placeholder="Ingredient 4" />
  <button type="submit">Send</button>
</form>
```

### AJAX

```javascript
axios.post("https://submit-form.com/your-form-id", {
  ingredients: ["anchovies", "cheese", "flour", "tomato", "water"],
});
```

## Objects

> An object is a standalone entity with properties.

### HTML

You can submit an object by using the `name.property` syntax:

```html
<form action="https://submit-form.com/your-form-id">
  <input type="text" name="car.manufacturer" />
  <input type="text" name="car.color" />
  <button type="submit">Send</button>
</form>
```

To submit an array of objects:

```html
<form action="https://submit-form.com/ooi35S5Z">
  <input type="text" name="car[0].manufacturer" />
  <input type="text" name="car[0].color" />

  <input type="text" name="car[1].manufacturer" />
  <input type="text" name="car[1].color" />

  <button type="submit">Send</button>
</form>
```

### AJAX

To submit an object:

```javascript
axios.post("https://submit-form.com/your-form-id", {
  car: {
    manufacturer: "Ferrari",
    color: "Red",
  },
});
```

To submit an array of objects:

```javascript
axios.post("https://submit-form.com/your-form-id", {
  cars: [
    {
      manufacturer: "Ferrari",
      color: "Red",
    },
  ],
});
```
