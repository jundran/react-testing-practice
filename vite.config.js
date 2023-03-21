import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	test: {
		globals: true, // don't need to import functions from vitest
		environment: 'jsdom',
		setupFiles: './tests/setup.js'
	}
})
