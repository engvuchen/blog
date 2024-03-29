import { createWriteStream } from 'node:fs';
import { resolve } from 'node:path';
import { SitemapStream } from 'sitemap';
import { defineConfig } from 'vitepress';

const links = [];

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Engvuchen Blog',
  description: 'Engvuchen Blog',

  srcDir: 'pages',
  outDir: '../dist',
  lastUpdated: true,

  markdown: {
    theme: {
      dark: 'dracula-soft',
      light: 'vitesse-light',
    },
  },

  head: [
    ['meta', { name: 'baidu-site-verification', content: 'codeva-t2788OKrIx' }],
    [
      'meta',
      {
        name: 'google-site-verification',
        content: 'TkndZ8YNuVLeC5gidJEe4A5AQhV37jFDir6xgP0S3QI',
      },
    ],
    ['link', { rel: 'icon', type: 'image/png', href: '/logo.png' }],
  ],
  themeConfig: {
    logo: '/logo.webp',
    outline: {
      label: '本页内容',
    },
    docFooter: {
      prev: '上一页',
      next: '下一页',
    },

    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: 'CSS', link: '/css/super-resume-theme-to-typora.md' },
      { text: 'VSCODE', link: '/vscode/snippet-demo.md' },
      { text: '杂谈', link: '/others/blog/picgo-compress-install.md' },
    ],

    sidebar: {
      '/css/': [
        {
          text: 'CSS',
          collapsed: false,
          items: [
            {
              text: 'Typora 主题 - 仿超级简历',
              link: '/css/super-resume-theme-to-typora.md',
            },
          ],
        },
      ],
      // '/vscode/': [
      //   {
      //     text: 'Visual Studio Code',
      //     collapsed: false,
      //     items: [
      //       {
      //         text: '插件模版 - Snippet Demo',
      //         link: '/vscode/snippet-demo.md',
      //       },
      //     ],
      //   },
      // ],
      // 实现点开杂谈，能看到“博客”、“Git” 分类
      '/others/': [
        {
          text: '博客',
          collapsed: false,
          items: [
            {
              text: 'PicGo 安装 picgo-plugin-compress',
              link: '/others/blog/picgo-compress-install.md',
            },
          ],
        },
        {
          text: '项目复盘',
          collapsed: false,
          items: [
            {
              text: '复盘 - vue 相关系列文档汇总',
              link: '/others/project-review/vue-docs-cn-collection.md',
            },
          ],
        },
        {
          text: 'Git',
          collapsed: false,
          items: [
            {
              text: 'Mac Git 多用户配置',
              link: '/others/git/multi-workspace.md',
            },
          ],
        },
      ],
    },

    footer: {
      // </br>Released under the <a href="https://github.com/vuejs/vitepress/blob/main/LICENSE">MIT License</a>.
      message: [
        '<span style="display: flex; justify-content: center; align-items: center;">本网站由<a href="https://www.upyun.com/?utm_source=lianmeng&utm_medium=referral" target="_blank"><img style="width: 60px;" src="https://engvu.oss-cn-shenzhen.aliyuncs.com/005c5ccdf20ec87040f5a0d810a2261a.webp"/></a>提供CDN加速/云存储服务</span>',
        '<a href="https://beian.miit.gov.cn" target="_blank">粤ICP备2024184877号-1</a><br>',
        '<span ><a style="display: flex; justify-content: center; align-items: center;" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=44030002002597"><img style="width: 22px; display: inline-block;" src="https://engvu.oss-cn-shenzhen.aliyuncs.com/94c12ad29602f4cf7cdb4b46d968ff7d.webp"/>粤公网安备44030002002597号</a></span>',
      ].join(''),
      copyright: 'Copyright ©2024-present Engvuchen',
    },

    socialLinks: [{ icon: 'github', link: 'https://github.com/engvuchen' }],
  },

  // transformHtml is a build hook to transform the content of each page before saving to disk.
  // See: https://github.com/vuejs/vitepress/issues/520
  transformHtml: (_, id, { pageData }) => {
    if (!/[\\/]404\.html$/.test(id)) {
      let { relativePath } = pageData;
      // 4everland 不支持映射 url 到指定文件，访问不带后缀的链接，相当于访问 '链接/index.html'
      // 根目录有 index.html，可以不带后缀
      if (relativePath === 'index.md') relativePath = '';
      links.push({
        // you might need to change this if not using clean urls mode
        // url: pageData.relativePath.replace(/((^|\/)index)?\.md$/, '$2'),
        url: relativePath.replace(/[.]md$/, '.html'),
        lastmod: pageData.lastUpdated,
      });
    }
  },
  // buildEnd is a build CLI hook, it will run after build (SSG) finish but before VitePress CLI process exits.
  buildEnd: async ({ outDir }) => {
    const sitemap = new SitemapStream({
      hostname: 'https://engvu.tech/',
    });
    const writeStream = createWriteStream(resolve(outDir, 'sitemap.xml'));
    sitemap.pipe(writeStream);
    links.forEach((link) => sitemap.write(link));
    sitemap.end();
    await new Promise((r) => writeStream.on('finish', r));
  },
});
