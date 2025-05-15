import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import dotenv from 'dotenv';

// Load .env from parent directory
dotenv.config({ path: path.resolve(__dirname, '../.env') });

export default defineConfig(({ mode }) => {
  const viteEnv = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    define: {
      'process.env': {
        ...viteEnv,
        ...process.env, // Includes values from ../.env
      },
    },
  };
});
