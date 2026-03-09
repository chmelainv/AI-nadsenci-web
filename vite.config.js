import { defineConfig } from 'vite';

export default defineConfig({
    root: '.',
    base: '/',
    build: {
        outDir: 'out',
        rollupOptions: {
            input: {
                main: 'index.html',
                akce: 'akce/index.html',
                'akce-detail': 'akce/detail.html',
            },
        },
    },
});
