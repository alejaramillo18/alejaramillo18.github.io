import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // IMPORTANTE: Cambia 'tu-repositorio' por el nombre real de tu repo en GitHub
  // Si tu repo se llama "portfolio", sería: base: '/portfolio/'
  // Si usas username.github.io (sin subrepo), deja: base: '/'
  base: '/',
})