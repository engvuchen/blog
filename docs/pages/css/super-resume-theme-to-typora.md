# Typora 主题 - 仿超级简历

用原生 MD 语法书写简历，模仿超级简历制作主题，简历更新通过 Typora 完成。

[仓库地址](https://github.com/engvuchen/super-resume-theme)

## 背景

1. 超级简历的样式简约优雅、填写引导比较好用，但只能导出 PDF，不支持 MarkDown 文件，数据迁移比较繁琐；
2. 木及简历的私有格式 `:::left`、`:::right`，能简单做到文本居左、居右，但这些语法是木及私有的，Typora 无法解析他。

## 效果

1. 在 typora 设置页面打中，打开 typora 主题文件夹；
2. 把仓库中的 super-resume 文件夹、super-resume.css 文件复制到 typora 主题文件夹中；
3. 在 typora 设置中切换主题为 Super Resume；
4. 使用简历模版 [resume-template.md](https://github.com/engvuchen/super-resume-typora-tpl/blob/main/resume-template%20copy.md)，成功应用 Super Resume 后，如下图：

![简历效果](https://engvu.oss-cn-shenzhen.aliyuncs.com/bc0b0436b89a0497b1892da3a87bccec.webp)

## 具体改动

基于 Typora 自带的 Github 主题修改：

1. html 设置字体改为 13px，
2. 修改 h2 样式；
3. 简历模版 MD 文件添加 html 标签，以实现居中、两端对齐效果；

```javascript
html {
  font-size: 13px;
  -webkit-font-smoothing: antialiased;
}

a {
  color: #0969da;
  text-decoration: none;
}
a:hover {
  text-decoration: underline;
}

h1 {
  font-size: 1.3rem;
  line-height: 1.5;
  border-bottom: 1px solid #000;
}
h2 {
  font-size: 1.1rem;
  line-height: 1.5;
  padding-bottom: 8px;
  border-bottom: 1px solid #000;
}

/* 多处修改字体引用的文件夹等 */
@font-face {
  font-family: "Open Sans";
  font-style: italic;
  font-weight: normal;
  src: local("Open Sans Italic"), local("OpenSans-Italic"),
    url("./super-resume/open-sans-v17-latin-ext_latin-italic.woff2") format("woff2");
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA,
    U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215,
    U+FEFF, U+FFFD, U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB,
    U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
```

## 拓展：木及简历

若需在[木及简历](https://www.mujicv.com/)中使用，则需：

1. 使用此[简历模版](https://github.com/engvuchen/super-resume-typora-tpl/blob/main/resume-template-muji.md)；
2. 自定义样式如下：

```css
.rs-view h2 {
  font-size: 1.2rem;
  line-height: 1.5;
  padding-bottom: 8px;
  border-bottom: 1px solid #000;
}
.rs-view ul li {
  list-style-type: disc;
}
```