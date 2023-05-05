# Typora 主题（仿《超级简历》）

## 背景

1. 超级简历的样式简约优雅、填写引导比较好用，但只能导出 PDF，不支持 MarkDown 文件，数据迁移比较繁琐；

2. 木及简历的私有格式 `:::left`、`:::right`，能简单做到文本居左、居右，但这些语法是木及私有的，Typora 无法解析他。

## 目的

用原生 MD 语法书写简历，模仿超级简历制作主题，简历更新通过 Typora 完成。

## 效果

[详见仓库](https://github.com/engvuchen/super-resume-theme)

<img width="840" alt="image" src="https://user-images.githubusercontent.com/31369318/226601247-8833bef1-abe2-40a6-8b5c-b8d61900bd51.png">

## 具体改动

```css
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

## 拓展

若需在[木及简历](https://www.mujicv.com/)中使用，则需使用[此模版](https://github.com/engvuchen/super-resume-typora-tpl/blob/main/resume-template-muji.md)；

自定义样式如下：

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
