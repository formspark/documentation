---
title: Pagination
lang: en-US
---

# Pagination

List endpoints return a page and a cursor:

```json
{
  "data": [
    { "id": "sub_1", "formId": "abc123", "data": {}, "createdAt": "..." }
  ],
  "hasMore": true,
  "nextCursor": "MjAyNi0wNy0yOVQwOTo..."
}
```

Branch on `hasMore`. While it is `true`, pass `nextCursor` back as `startingAfter`:

```sh
curl "https://api.formspark.io/public/v1/forms/FORM_ID/submissions?limit=50&startingAfter=CURSOR" \
  -H "Authorization: Bearer $FORMSPARK_TOKEN"
```

`limit` accepts 1 to 100 and defaults to 25.

Treat a cursor as a string to hand back. Its contents will change, and a cursor this API did not issue is rejected.

## Walking every submission

```sh
CURSOR=""
while : ; do
  RESPONSE=$(curl -s \
    "https://api.formspark.io/public/v1/forms/FORM_ID/submissions?limit=100${CURSOR:+&startingAfter=$CURSOR}" \
    -H "Authorization: Bearer $FORMSPARK_TOKEN")
  echo "$RESPONSE" | jq -c '.data[]'
  [ "$(echo "$RESPONSE" | jq -r '.hasMore')" = "true" ] || break
  CURSOR=$(echo "$RESPONSE" | jq -r '.nextCursor')
done
```

Workspaces and forms use the same envelope, so branching on `hasMore` works everywhere.
