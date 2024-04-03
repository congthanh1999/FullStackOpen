```mermaid
      sequenceDiagram

      actor user
      participant browser
      participant server

      user->>browser: enter URL: https://studies.cs.helsinki.fi/exampleapp/spa

      browser->>+server: send HTTP GET request
      server-->>-browser: SPA (includes html, css, js files)

      browser->>user: display SPA

      note over user, browser: user interact with SPA

```
