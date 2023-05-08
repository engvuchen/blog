import { createWriteStream } from "node:fs";
import { resolve } from "node:path";
import { SitemapStream } from "sitemap";
import { defineConfig } from "vitepress";

const links = [];

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Engvuchen Blog",
  description: "Engvuchen Blog",

  markdown: {
    theme: {
      dark: "dracula-soft",
      light: "vitesse-light",
    },
  },

  lastUpdated: true,

  head: [
    ["meta", { name: "baidu-site-verification", content: "codeva-t2788OKrIx" }],
    [
      "meta",
      {
        name: "google-site-verification",
        content: "TkndZ8YNuVLeC5gidJEe4A5AQhV37jFDir6xgP0S3QI",
      },
    ],
    ["link", { rel: "icon", type: "image/png", href: "/logo.png" }],
  ],
  themeConfig: {
    logo: "/logo.webp",

    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "首页", link: "/" },
      { text: "CSS", link: "/pages/css/super-resume-theme-to-typora.md" },
    ],

    sidebar: [
      {
        text: "CSS",
        collapsed: false,
        items: [
          {
            text: "Typora 主题 - 仿超级简历",
            link: "/pages/css/super-resume-theme-to-typora.md",
          },
        ],
      },
      {
        text: "Visual Studio Code",
        collapsed: false,
        items: [
          {
            text: "插件模版 - Snippet Demo",
            link: "/pages/vscode/snippet-demo.md",
          },
        ],
      },
    ],

    footer: {
      message:
        'Released under the <a href="https://github.com/vuejs/vitepress/blob/main/LICENSE">MIT License</a>.',
      copyright: "Copyright ©2023-present Engvuchen",
    },

    socialLinks: [{ icon: "github", link: "https://github.com/engvuchen" }],
  },

  // transformHtml is a build hook to transform the content of each page before saving to disk.
  transformHtml: (_, id, { pageData }) => {
    if (!/[\\/]404\.html$/.test(id))
      links.push({
        // you might need to change this if not using clean urls mode
        url: pageData.relativePath.replace(/((^|\/)index)?\.md$/, "$2"),
        lastmod: pageData.lastUpdated,
      });
  },
  // buildEnd is a build CLI hook, it will run after build (SSG) finish but before VitePress CLI process exits.
  buildEnd: async ({ outDir }) => {
    const sitemap = new SitemapStream({
      hostname: "https://engvu.tech/",
    });
    const writeStream = createWriteStream(resolve(outDir, "sitemap.xml"));
    sitemap.pipe(writeStream);
    links.forEach((link) => sitemap.write(link));
    sitemap.end();
    await new Promise((r) => writeStream.on("finish", r));
  },
});
