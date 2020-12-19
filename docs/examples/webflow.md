---
title: Webflow
lang: en-US
---

# Webflow

1. Copy your form's action URL.
2. Paste the action URL into Webflow's `action` field in the form element’s settings in the Designer.
3. Copy-paste the code below into `Project Settings > Custom Code > Footer Code`.

![Webflow action](../.vuepress/public/webflow-action.jpeg)

```html
<!-- Project Settings > Custom Code > Footer Code -->
<script type="text/javascript">
    $('form[action^="https://submit-form.com"]').each(function (i, el) {
        form = $(el);
        form.submit(function (e) {
            e.preventDefault();
            form = $(e.target);
            action = form.attr("action");
            $.ajax({
                url: action,
                method: "POST",
                data: form.serialize(),
                dataType: "json",
                success: function () {
                    parent = $(form.parent());
                    parent.children("form").css("display", "none");
                    parent.children(".w-form-done").css("display", "block");
                },
                error: function () {
                    parent.find(".w-form-fail").css("display", "block");
                },
            });
        });
    });
</script>
```
