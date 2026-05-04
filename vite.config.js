import { defineConfig } from 'vite';

function removeModuleAttrs() {
    return {
        name: 'remove-module-attrs',
        enforce: 'post',
        transformIndexHtml(html) {
            return html
                .replace(/ type="module"/g, '')
                .replace(/ crossorigin/g, '');
        }
    };
}

export default defineConfig({
    base: './',
    plugins: [removeModuleAttrs()],
    build: {
        cssCodeSplit: false,
        modulePreload: false,
        minify: false,
        rollupOptions: {
            output: {
                format: 'iife',
                entryFileNames: 'script.js',
                assetFileNames: 'styles.css'
            }
        }
    }
});
