```mermaid
      sequenceDiagram

      actor user
      participant browser
      participant server

      user->>browser: enter URL: https://studies.cs.helsinki.fi/exampleapp/spa

      browser->>+server: GET https://studies.cs.helsinki.fi/exampleapp/spa
      server-->>-browser: single page app (includes html, css, js files)

      note over user, browser: user interact with SPA

```
