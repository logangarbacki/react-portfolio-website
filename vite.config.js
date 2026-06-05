import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from 'vite-plugin-singlefile'

// Set SINGLE_FILE=1 to emit one self-contained index.html (for sharing /
// offline review). Normal `npm run build` is unaffected and deploys as usual.
const single = process.env.SINGLE_FILE === '1'

export default defineConfig({
  base: single ? './' : '/',
  plugins: [react(), ...(single ? [viteSingleFile()] : [])],
})
