import { ViteSSG } from 'vite-ssg'
import { setupLayouts } from 'virtual:generated-layouts'
import App from './App.vue'
import generatedRoutes from '~pages'
import QrCode from 'qrcode.vue'
import '@unocss/reset/tailwind.css'
import 'element-plus/dist/index.css'
import './styles/main.css'
import 'uno.css'

const routes = setupLayouts(generatedRoutes)
// https://github.com/antfu/vite-ssg
export const createApp = ViteSSG(
  App,
  { routes, base: import.meta.env.BASE_URL },
  (ctx) => {
    // install all modules under `modules/`
    ctx.router.beforeEach((to, from, next) => {
      if (to.path !== '/') {
        if (localStorage.getItem("token"))
          next()
        else {
          alert("请登录")
          ctx.router.push('/')
          next()
        }
      }
      else {
        if (localStorage.getItem("token")) {
          ctx.router.push('/manage')
        }
      }
      next()
    })
    ctx.app.component('qr-code', QrCode)
    Object.values(import.meta.globEager('./modules/*.ts')).forEach(i => i.install?.(ctx))
  },

)

