import { defineConfig } from 'vite';

export default defineConfig({
    root: '.',
    base: '/Fajne-prompty-web/',
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
