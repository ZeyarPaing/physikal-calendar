import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import path from "path";
import devtools from "solid-devtools/vite";

export default defineConfig({
  plugins: [
    devtools({
      autoname: true,
      locator: {
        targetIDE: "vscode",
        key: "Ctrl",
        jsxLocation: true,
        componentLocation: true,
      },
    }),
    solidPlugin(),
  ],
  server: {
    port: 3000,
    open: true,
    host: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    target: "esnext",
  },
});
