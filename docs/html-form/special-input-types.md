---
title: Special input types
lang: en-US
---

# Special input types

## Radio

Radio buttons let a user select ONLY ONE of a limited number of choices.

Only the value of the checked choice will be forwarded.

All choices should share the SAME `name` attribute.

```html
<!DOCTYPE html>
<html>
<head>
<title>Enquiry Form</title>
<style>
  body{
    font-family: Arial;
    background:#f3f3f3;
  }
  .form-box{
    width:380px;
    background:#fff;
    padding:25px;
    margin:50px auto;
    border-radius:8px;
    box-shadow:0 0 10px rgba(0,0,0,0.1);
  }
  .form-box h2{
    text-align:center;
  }
  label{
    margin-top:10px;
    display:block;
  }
  input, select{
    width:100%;
    padding:8px;
    margin-top:5px;
    border:1px solid #ccc;
    border-radius:5px;
  }
  button{
    width:100%;
    padding:10px;
    margin-top:15px;
    border:none;
    background:#007bff;
    color:white;
    font-size:16px;
    cursor:pointer;
    border-radius:5px;
  }
</style>
</head>

<body>

<div class="form-box">
  <h2>Enquiry Form</h2>

  <form>

    <label>First Name *</label>
    <input type="text" name="firstname" required>

    <label>Last Name *</label>
    <input type="text" name="lastname" required>

    <label>Email ID *</label>
    <input type="email" name="email" required>

    <label>Course Looking For *</label>
    <select name="course" required>
      <option value="">--Select--</option>
      <option value="ug">UG</option>
      <option value="pg">PG</option>
    </select>

    <button type="submit">Submit</button>
  </form>
</div>

</body>
</html>

## Checkbox

Checkboxes let a user select ZERO or MORE options of a limited number of choices.

The value of each checked choice will be forwarded.

When unchecked, the browser does not send the input in the request, so a checkbox value will either be true, or the key
will not exist at all.

All choices should have a UNIQUE `name` attribute.

```html
<form action="https://submit-form.com/your-form-id">
  <input type="checkbox" name="has-bike" value="Bike" /> I have a bike
  <input type="checkbox" name="has-car" value="Car" /> I have a car
  <button type="submit">Submit</button>
</form>
```

## Hidden field

A hidden field lets you include data that cannot be seen or modified by users when a form is submitted.

```html
<!DOCTYPE html>
<html>
<head>
<title>Enquiry Form</title>
<style>
  body{
    font-family: Arial;
    background:#f3f3f3;
  }
  .form-box{
    width:380px;
    background:#fff;
    padding:25px;
    margin:50px auto;
    border-radius:8px;
    box-shadow:0 0 10px rgba(0,0,0,0.1);
  }
  .form-box h2{
    text-align:center;
  }
  label{
    margin-top:10px;
    display:block;
  }
  input, select{
    width:100%;
    padding:8px;
    margin-top:5px;
    border:1px solid #ccc;
    border-radius:5px;
  }
  button{
    width:100%;
    padding:10px;
    margin-top:15px;
    border:none;
    background:#007bff;
    color:white;
    font-size:16px;
    cursor:pointer;
    border-radius:5px;
  }
</style>
</head>

<body>

<div class="form-box">
  <h2>Enquiry Form</h2>

  <form>

    <label>First Name *</label>
    <input type="text" name="firstname" required>

    <label>Last Name *</label>
    <input type="text" name="lastname" required>

    <label>Email ID *</label>
    <input type="email" name="email" required>

    <label>Course Looking For *</label>
    <select name="course" required>
      <option value="">--Select--</option>
      <option value="ug">UG</option>
      <option value="pg">PG</option>
    </select>

    <button type="submit">Submit</button>
  </form>
</div>

</body>
</html>

```
