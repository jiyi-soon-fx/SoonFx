import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
    root: '.',
    build: {
        outDir: 'dist',
        lib: {
            entry: resolve(__dirname, 'src/battle-demo.ts'),
            name: 'SeerEngineTest',
            fileName: 'test',
            formats: ['es', 'umd']
        },
        rollupOptions: {
            external: [],
            output: {
                globals: {}
            }
        }
    },
    resolve: {
        alias: {
            '@': resolve(__dirname, 'src')
        }
    },
    server: {
        port: 3009,
        host:"0.0.0.0",
        open: true
    },
    optimizeDeps: {
        include: ['@soonfx/fx']
    }
})
