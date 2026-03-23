---
name: settings
description: Settings for Remotion.
metadata:
  tags: render
---

# Settings for Remotion

Custom Remotion environment configuration for optimized rendering and local browser detection.

## Features

- Auto-detect local chrome-headless-shell in a custom directory
- Set browser executable path manually if present
- Fallback to Remotion's default browser if not found
- Consistent rendering behavior across environments

## Configuration Example

Check for a local chrome-headless-shell in `~/.remotion`, and use it if available:

```ts
import { Config } from '@remotion/cli/config';

Config.setEntryPoint('src/index.tsx');
Config.setBrowserExecutable('/Users/ultravires/.remotion/chrome-headless-shell/mac-arm64/chrome-headless-shell-mac-arm64/chrome-headless-shell'); // Only exist chrome-headless-shell in `~/.remotion`
```

Reference document: [chrome-headless-shell](https://www.remotion.dev/docs/miscellaneous/chrome-headless-shell)
