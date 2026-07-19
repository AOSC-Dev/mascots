import { defineConfig } from 'vitepress'
import { resolve } from 'path'
import { fileURLToPath } from 'url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

// https://vitepress.dev/reference/site-config
export default defineConfig({
  vite: {
    resolve: {
      alias: {
        '@': resolve(__dirname, '..')
      }
    }
  },
  title: "安安和同同",
  description: "AOSC Mascots website",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: '关于安安', link: '/about-anan' },
      { text: '关于同同', link: '/about-tongtong' },
      { text: '相册', link: '/gallery' },
      { text: '故事', link: '/stories' },
      { text: '文档中心', link: '/information/' }
    ],

    sidebar: {
      '/information/': [
        {
          text: '文档中心',
          items: [
            { text: '接收稿件', link: '/information/submit-arts' }
          ]
        }
      ],
      '/stories/': [
        {
          text: '故事',
          items: []
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ],

    // outline: false,
    aside: false
  }
})
