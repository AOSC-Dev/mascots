import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
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
    ]
  }
})
