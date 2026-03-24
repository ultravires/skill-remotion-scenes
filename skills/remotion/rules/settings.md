---
name: settings
description: Settings for Remotion.
metadata:
  tags: render
---

# Settings for Remotion

Custom Remotion environment configuration for optimized rendering and local browser detection.

## Features

- Auto-detect local chrome-headless-shell in a `~/.remotion`
- Set browser executable path manually if present
- Fallback to Remotion's default browser if not found
- Consistent rendering behavior across environments

## Configuration Example

Check for a local chrome-headless-shell in `~/.remotion`, and use it if available:

```ts
import { Config } from '@remotion/cli/config';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

let chromePath: string;

switch (process.platform) {
  case 'win32':
    chromePath = path.join(
      os.homedir(),
      '.remotion',
      'chrome-headless-shell',
      'win64',
      'chrome-headless-shell-win64',
      'chrome-headless-shell.exe'
    );
    break;
  case 'darwin'
    chromePath = path.join(
      os.homedir(),
      '.remotion',
      'chrome-headless-shell',
      'mac-arm64',
      'chrome-headless-shell-mac-arm64',
      'chrome-headless-shell'
    );
    break;
  default:
    break;
}

Config.setEntryPoint('src/index.tsx');

try {
  fs.accessSync(chromePath, fs.constants.F_OK | fs.constants.X_OK);
  Config.setBrowserExecutable(chromePath);
} catch (_) {}
```

Reference document: [chrome-headless-shell](https://www.remotion.dev/docs/miscellaneous/chrome-headless-shell)
