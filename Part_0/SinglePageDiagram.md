```mermaid
      sequenceDiagram

      actor user
      participant browser
      participant server

      user->>browser: fwefw

      browser->>+server: GET https://studies.cs.helsinki.fi/exampleapp/spa
      server-->>-browser: HTML document

```
