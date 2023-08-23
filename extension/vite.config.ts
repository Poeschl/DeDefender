import {defineConfig} from "vite";
import vue from "@vitejs/plugin-vue";
import webExtension, {readJsonFile} from "vite-plugin-web-extension";

function generateManifest() {
  const manifest = readJsonFile("src/manifest.json");
  const pkg = readJsonFile("package.json");
  return {
    name: pkg.name,
    description: pkg.description,
    version: pkg.version,
    ...manifest,
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    minify: true
  },
  plugins: [
    vue(),
    webExtension({
      manifest: generateManifest,
      watchFilePaths: ["package.json", "manifest.json"],
      browser: process.env.TARGET || "chrome"
    }),
  ],
});
