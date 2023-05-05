import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Engvuchen Blog",
  description: "A VitePress Site",
  lastUpdatedText: true,
  head: [["link", { rel: "icon", type: "image/png", href: "/logo.png" }]],
  themeConfig: {
    logo: "/logo.png",

    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "首页", link: "/" },
      { text: "CSS", link: "/pages/css/super-resume-theme-to-typora.md" },
    ],

    sidebar: [
      {
        text: "CSS",
        items: [
          {
            text: "Typora 主题（仿《超级简历》）",
            link: "/pages/css/super-resume-theme-to-typora.md",
          },
        ],
      },
    ],

    footer: {
      message: 'Released under the <a href="https://github.com/vuejs/vitepress/blob/main/LICENSE">MIT License</a>.',
      copyright: [`<div>Copyright ©2023-present MyName</div>`],
    },

    socialLinks: [{ icon: "github", link: "https://github.com/engvuchen" }],
  },
});
