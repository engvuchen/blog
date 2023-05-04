import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Engvuchen Blog',
  description: 'A VitePress Site',
  head: [['link', { rel: 'icon', type: 'image/png', href: '/logo.png' }]],
  themeConfig: {
    logo: '/logo.png',

    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/markdown-examples' },
    ],

    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' },
        ],
      },
    ],

    footer: {
      message: ['Released under the <a href="https://github.com/vuejs/vitepress/blob/main/LICENSE">MIT License</a>.'],
      copyright: [
        'Copyright ©2023-present <a href="https://github.com/engvuchen">Engvuchen</a><br><div style="display: flex; justify-content: center; align-items: center;">本网站由 <a style="display: inline-block; line-height: 0;" href="https://www.upyun.com/?utm_source=lianmeng&utm_medium=referral"><img style="width: 60px; display: inline-block" alt="cloud.png" src="../cloud.png"/></a> 提供 CDN 加速/云存储服务</div>',
      ],
    },

    socialLinks: [{ icon: 'github', link: 'https://github.com/engvuchen' }],
  },
});
