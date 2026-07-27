import { defineConfig } from "vitepress";

export const zh = defineConfig({
  lang: "zh",
  title: "安安和同同",
  themeConfig: {
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
            {
              text: "设定稿",
              items: [
                {
                  text: "立绘",
                  link: "/information/design/mascots",
                },
                {
                  text: "Minecraft 人物模型 (Figura)",
                  link: "/information/design/figura",
                },
                {
                  text: "贴图包",
                  link: "/information/design/stickers",
                },
                {
                  text: "Fumo 设计稿",
                  link: "/information/design/fumo",
                },
                {
                  text: "通行证周边设计稿",
                  link: "/information/design/pass",
                },
              ],
            },
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
  },
});
