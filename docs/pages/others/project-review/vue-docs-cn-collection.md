# 复盘 - `vue` 生态相关文档汇总

## 前言

最近在看 Vue 以及周边生态库的文档，打算过一遍，发现：

1. **阅读进度不好把握**。侧栏的每一章节都是闭合的，没有点开前不知道剩下多少内容未读；
2. **归纳知识点较为繁琐**。每一篇文章都是独立的，阅读压力较小，但当需要归纳某一个知识点时，往往需要查阅多篇文章，整理不易；
3. **文档结构较统一**。文档基本都由 vitepress 搭建，原始文件均为 MD 文件，配置结构较为统一；

遂萌生出“整合文档”的想法：用 node.js 合并仓库中的所有文档为单个 MD 文件，把控阅读进度、整理内容的需求应该都能满足。

下文以 `vuex@4.1.0` 为例，分享下具体思路。

## 成果

1. [vue-router 文档汇总](https://github.com/engvuchen/vue-docs-cn-collection/blob/main/vue-router-all-zh-docs.md)
2. [vuex 文档汇总](https://github.com/engvuchen/vue-docs-cn-collection/blob/main/vuex-all-zh-docs.md)
3. [pinia 文档汇总](https://github.com/engvuchen/vue-docs-cn-collection/blob/main/%40pinia-root-all-zh-docs.md)

[仓库地址](https://github.com/engvuchen/vue-docs-cn-collection)

## 项目需求

1. 汇总文档范围是项目文档的《指南》部分；
2. 汇总文档大纲结构，应和线上官方文档大纲一致；
3. 提供命令行界面，供用户选择具体项目；
4. 仅获取文档，不变更文档项目，这样获取文档最新内容时无需再次修改；

综上，思路如下（4）：

**（1）寻找在线文档、文档配置之间的映射**

配置文件位置：这个比较简单，配置文件都在 `.vuepress` 或 `.vitepress` 文件夹中，例 `vuex/docs/.vitepress/config.js`。

配置项结构：可能是对象，也可能是字符串：

1. `text`：一般是文档标题（侧栏显示的，和 MD 文档内容的标题不一样）；
2. `link`：一般是文档路径；
3. `children`、`items`：一般包含嵌套文档项；

```javascript
// 对象: { text: '', link: '', children: [], items: [] }
let conf1 = { text: '', children: [] } 
let conf2 = { text: '', items: [] }
let conf3 = { text: '', link: '' }
let conf4 = '/zh/installation.md'
```

> ❗️注意：`item.link` 的判断不可靠。
> 例当遇到 `item` 为 `{ link: '/zh/guide/state' }`，`item.link` 是字符串，它会被包装成对象，它的原型上有 [link 函数](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/link)！

**（2）大纲匹配**

对于 `vuex` 的这个配置，“介绍”需要是一级标题。碰到这种结构，被读取文章的标题都需要递进一级；

处理：匹配出 MD 语法的标题，加多一个 '#'。

```javascript
{
  text: '介绍',
  children: [
    { text: 'Vuex 是什么?', link: '/zh/' },
    { text: '安装', link: '/zh/installation' },
    { text: '开始', link: '/zh/guide/' },
  ],
},
```

**（3）方便获取文档项目的远程修改**

使用 [Git - 子模块](https://git-scm.com/book/zh/v2/Git-%E5%B7%A5%E5%85%B7-%E5%AD%90%E6%A8%A1%E5%9D%97) 实现此需求。

**（4）命令行界面**

使用 `@clack/prompts` 进行开发。

以下详细说说遇到的 2 个难点：

1. 兼容不同文档配置的读写；
2. 处理单篇文档中相对引用的部分；

## 难点突破

### 兼容不同文档配置的读写

vue 系列（vuex、vue-router 等）的文档基本由 `vitepress`（JS、TS）、`vuepress` 配置；

比较棘手的是存在 2 种不同文件类型（JS、TS）的配置：

（1）**对于 JS 文件**，理想状态是对应文档项目安装好依赖（`npm install`）后，使用 `require(配置路径)` 即可读取配置；

但实际调研发现，不同文档的包管理器存在出入，安装依赖的包管理器有 2 种（npm、pnpm）。

（2）**为导入一个 TS 文件**，在不增加项目复杂度的情况下（TS编译器等），一开始的做法是给`package.json` 添加 `type: 'module'`，还要将对应被读取配置文件重命名为 `.mjs`；

但这种处理和项目需求的第 4 点冲突。

一番思考之后想到了用正则“逃课”：用 node.js readFile 读取配置文件内容，通过正则匹配出对应配置（字符串），再通过 `eval(字符串)` 获取 JSON 格式的配置；

奈何试了好几次之后，没能把这个正则做出来。。。

但字符串的“逃课”又不是只有正则，还有万能的 [AST](https://astexplorer.net/) 大法！

思路：读取文件为字符串，使用 AST 工具获取到配置在文件中的开始、结束索引，用 `slice` 裁出来这个配置（字符串）；

但这种方法，开始、结束索引都写死了，一旦文档配置有增删，索引还需要更新，不灵活；

如下图，自行处理这个 AST 解析结果还挺麻烦的，要经过一大堆的访问符才能找到 `sidebar` 配置：

![image-20230612220200107](https://engvu.oss-cn-shenzhen.aliyuncs.com/6fd7620fb6cbd6a83a8391a75cc204d4.webp)

开始在 github 上寻找工具包，最后找到了 [GoGoCode](https://gogocode.io/zh/docs/specification/introduction) 这个宝藏仓库，它支持选择器语法，处理 AST 比自己搞访问符简单很多。

![image-20230612220223391](https://engvu.oss-cn-shenzhen.aliyuncs.com/5eca0c24f5e92ef8a90967e9f94a8793.webp)

顺利爆破一个难点。

### 处理单篇文档中相对引用的部分

以下是一段 vuex 中的配置：

```javascript
{
  // ...
  '/zh/': {
   // ...
    sidebar: [
      {
        text: '介绍',
        children: [
          { text: 'Vuex 是什么?', link: '/zh/' },
          { text: '安装', link: '/zh/installation' },
          { text: '开始', link: '/zh/guide/' }
        ]
      },
      // ...
    ]
  }
  // ...
}
```

看配置可知，`/zh/` 不是实际文件读写路径，而是以 `/zh/` 文件夹起始的相对路径；

完整的路径是 `d:/vue-docs-cn-collection/vuex/docs/zh/index.md`；

另外相对路径不仅仅在配置文件中，文档中也可能存在；

综上，有以下几种情况（这里踩了好几个坑）：

1. `link` 属性对应的是 `zh` 开头的路径，需要处理成文件实际路径；
2. 在单篇文档中，引用路径包括其他文章、锚点、图片、http 链接：
   1. 引用文档路径是相对的，例：`[插件（Plugin）](plugins.md)`，需要根据相对关系补全路径；
   2. 锚点用作定位到本篇文章标题；处理是拼接在线文档域名、相对路径、锚点，获取可跳转路径
      1. 带锚点的标题：`### 定义 Store %{#defining-a-store}%`
      2. 引用锚点 `[定义 store](#defining-a-store)`
      3. 处理结果案例：[https://pinia.vuejs.org/zh/core-concepts/#defining-a-store](https://pinia.vuejs.org/zh/core-concepts/#defining-a-store)
   3. 本地资源图片，需换成在线链接
   4. 使用 `img` 标签引用的图片，需要另外写正则匹配

相关逻辑在[此处](https://github.com/engvuchen/vue-docs-cn-collection/blob/main/lib/handle-relative-links.js)。

## 小结

前期没有调研好，导致项目经历了几次比较大的修改，花费了出乎意料的时间，多少有点背离“减少阅读成本”的初衷。

但能实践新技术点（git 子项目、GoGoCode 等），也不算亏。

细心的同学应该能发现项目里面有 vue@3，vite 的合并文档，它们还没被完善，故成果部分未列出。

1. 一方面是校对汇总文档所需时间比较长，这两个文档后续有时间才能完善；
2. 另一方面 vue@3 有大量的自定义组件（例切换 2 种API案例），汇总文档效果是不如官方文档的。
