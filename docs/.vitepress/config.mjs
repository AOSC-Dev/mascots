import { defineConfig } from "vitepress";
import { resolve } from "path";
import { fileURLToPath } from "url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

// https://vitepress.dev/reference/site-config
export default defineConfig({
  vite: {
    resolve: {
      alias: {
        "@": resolve(__dirname, ".."),
      },
    },
  },
  title: "安安和同同",
  description: "AOSC Mascots website",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "首页", link: "/" },
      { text: "关于安安", link: "/about-anan" },
      { text: "关于同同", link: "/about-tongtong" },
      { text: "相册", link: "/gallery" },
      // { text: '故事', link: '/stories' },
      { text: "文档中心", link: "/information/" },
    ],

    sidebar: {
      "/information/": [
        {
          text: "文档中心",
          items: [
            { text: "接收稿件", link: "/information/submit-arts" },
            {
              text: "导出作品",
              items: [
                {
                  text: "CLIP STUDIO PAINT / 优动漫 PAINT",
                  link: "/information/export/from-csp",
                },
                { text: "PaintTool SAI", link: "/information/export/from-sai" },
                { text: "openCanvas", link: "/information/export/from-oc" },
                {
                  text: "FireAlpaca / MediBang Paint",
                  link: "/information/export/from-mdp",
                },
                {
                  text: "Corel Painter",
                  link: "/information/export/from-corel",
                },
                {
                  text: "Procreate",
                  link: "/information/export/from-procreate",
                },
                { text: "画世界", link: "/information/export/from-hsj" },
                { text: "天生会画", link: "/information/export/from-gopaint" },
              ],
            },
          ],
        },
      ],
      "/stories/": [
        {
          text: "故事",
          items: [],
        },
      ],
    },

    socialLinks: [
      {
        icon: {
          svg: '<svg viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg"><g transform="translate(0,-50)"><circle cx="501.58" cy="552.36" r="475.19" fill="#000"/><circle cx="524" cy="550.36" r="54.07" fill="#fff"/><path d="M513.84 176.91A373.65 373.65 0 0 0 140.19 550.57 373.65 373.65 0 0 0 513.84 924.22v-182.5a191.87 191.87 0 0 1-181.71-191.36 191.87 191.87 0 0 1 181.71-191.51z" fill="#c00000"/><path d="M514.77 394.05a156.09 156.09 0 0 0-156.09 156.09 156.09 156.09 0 0 0 156.09 156.08v-74.27a82.15 82.15 0 0 1-72.92-81.59 82.15 82.15 0 0 1 72.92-81.53z" fill="#0070c0"/><path d="M531.57 230.53v160.87a159.34 159.34 0 0 1 151.77 158.96 159.34 159.34 0 0 1-151.77 159.07v160.87a319.89 319.89 0 0 0 319.88-319.9 319.89 319.89 0 0 0-319.88-319.87z" fill="#ffc000"/></g></svg>',
        },
        link: "https://aosc.io",
      },
    ],

    // outline: false,
    aside: false,
  },
});
