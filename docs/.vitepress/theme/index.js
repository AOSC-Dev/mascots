import { h } from 'vue'
import { useData } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import Home from './layouts/Home.vue'
import { openExternalLinksInBrowser } from './external-links.js'
import './style.css'

export default {
  extends: DefaultTheme,
  Layout: {
    setup() {
      const { frontmatter } = useData()
      return () => {
        if (frontmatter.value.layout === 'home') {
          return h(Home)
        }
        return h(DefaultTheme.Layout)
      }
    }
  },
  enhanceApp({ app, router, siteData }) {
    openExternalLinksInBrowser()
  }
}
