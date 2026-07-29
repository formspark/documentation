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

Branch on `hasMore`. When it is `true`, pass `nextCursor` back as
`startingAfter` to get the following page:

```sh
curl "https://api.formspark.io/public/v1/forms/FORM_ID/submissions?limit=50&startingAfter=CURSOR" \
  -H "Authorization: Bearer $FORMSPARK_TOKEN"
```

`limit` accepts 1 to 100 and defaults to 25.

## Why cursors rather than page numbers

Submissions arrive while you are reading them. With page numbers, a submission
that arrives between two requests shifts everything down, so you see one row
twice and miss another. A cursor points at a position in the list rather than
counting from the start, so a walk stays correct no matter what arrives during
it.

## Treat cursors as opaque

A cursor is a string to hand back, not a value to construct or decode. Its
contents will change. A cursor this API did not issue is rejected with a
`validation_error` rather than quietly restarting from the beginning.

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

Workspaces and forms are returned in the same envelope, but are not paginated
today: `hasMore` is always `false` for them. Branching on `hasMore` rather than
special-casing those endpoints means your code keeps working if that changes.
