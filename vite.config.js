import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Vercel expects the app to be served at the root ('/').
// Set base to '/' for all modes and output to the standard 'dist' folder.
export default defineConfig({
    plugins: [react()],
    base: '/',
    build: { outDir: 'dist' }
})