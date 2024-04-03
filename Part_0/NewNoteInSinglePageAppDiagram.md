```mermaid
      sequenceDiagram
      actor user
      participant browser
      participant server

      user->>browser: write some content in the text field
      user->>browser: click the "Save" button

      browser->>+server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
      server-->>-browser: {"message":"note created"}

      browser->>user: display SPA with the updated note list

```
