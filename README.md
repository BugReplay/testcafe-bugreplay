# BugReplay TestCafe Integration
The BugReplay TestCafe integration records screencasts of your automated TestCafe tests including timesynced JavaScript Console and Network logs

## Installation
Install the package

```sh
npm install testcafe-bugreplay --save-dev
```

## Configuration

### Adding the BugReplay Integration
In .testcaferc.json you'll need to tell Chrome to use the BugReplay Automation extension:

```json
// .testcaferc.json
{
  "browsers": {
    "path": "/path/to/google-chrome",
    "cmd": "--no-first-run --no-default-browser-check --user-data-dir=/tmp/testcafe-chrome-profile --load-extension=./node_modules/bugreplay-automation/extension/ --auto-select-desktop-capture-source='Chrome'"
  }
}
```

After setting up this configuration you can have BugReplay record a fixture of tests by importing bugReplay and wrapping your fixture around this function and supplying an API key. For instance:

```js
// test.js
import bugReplay from 'testcafe-bugreplay'

bugReplay(
  fixture `Getting Started`
    .page `http://devexpress.github.io/testcafe/example`,
  { apiKey: "YOUR API KEY GOES HERE"}
)
// ... your tests go here
```

All tests in this file would be recorded to BugReplay.

## Limitations
This currently only works for Chrome. We're looking to expand to other browsers in the future.
