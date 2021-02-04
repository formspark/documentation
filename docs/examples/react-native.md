---
title: React Native
lang: en-US
---

# React Native

## use-formspark

:::tip
Check out our official React hooks: [use-formspark](https://github.com/formspark/use-formspark).
:::

```jsx
import React, { useState } from "react";
import { Alert, Button, Text, TextInput, View } from "react-native";
import { useFormspark } from "@formspark/use-formspark";

const FORMSPARK_FORM_ID = "your-form-id";

function ContactScreen() {
  const [submit, submitting] = useFormspark({
    formId: FORMSPARK_FORM_ID,
  });

  const [message, setMessage] = useState("");

  const onPress = async () => {
    await submit({ message });
    Alert.alert("Form submitted");
  };

  return (
    <View>
      <View>
        <Text>Message</Text>
        <TextInput
          value={message}
          onChangeText={(message) => setMessage(message)}
          multiline={true}
        />
      </View>
      <View>
        <Button title="Send" onPress={onPress} disabled={submitting} />
      </View>
    </View>
  );
}

export default ContactScreen;
```

## Fetch

```jsx
import React, { useState } from "react";
import { Alert, Button, Text, TextInput, View } from "react-native";

const FORMSPARK_ACTION_URL = "https://submit-form.com/your-form-id";

function ContactScreen() {
  const [message, setMessage] = useState("");

  const onPress = async () => {
    await fetch(FORMSPARK_ACTION_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        message,
      }),
    });
    Alert.alert("Form submitted");
  };

  return (
    <View>
      <View>
        <Text>Message</Text>
        <TextInput
          value={message}
          onChangeText={(message) => setMessage(message)}
          multiline={true}
        />
      </View>
      <View>
        <Button title="Send" onPress={onPress} />
      </View>
    </View>
  );
}

export default ContactScreen;
```
