// See all configuration options: https://remotion.dev/docs/config
// Each option also is available as a CLI flag: https://remotion.dev/docs/cli

// Note: When using the Node.JS APIs, the config file doesn't apply. Instead, pass options directly to the APIs

import { Config } from "@remotion/cli/config";
import { enableTailwind } from '@remotion/tailwind-v4';
import path from 'path';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

Config.setVideoImageFormat("jpeg");
Config.setOverwriteOutput(true);

// Chain Tailwind config with path alias
Config.overrideWebpackConfig((currentConfiguration) => {
  // First apply Tailwind
  const configWithTailwind = enableTailwind(currentConfiguration);

  // Then add path alias
  return {
    ...configWithTailwind,
    resolve: {
      ...configWithTailwind.resolve,
      alias: {
        ...configWithTailwind.resolve?.alias,
        '@': path.resolve(__dirname, 'src'),
      },
    },
  };
});
