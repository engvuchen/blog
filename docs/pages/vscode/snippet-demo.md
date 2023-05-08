# 插件模版 - Snippet Demo

快速提取指定本地 snippet，生成 vscode snippet 插件。

## 背景

1. 管理端项目存在大量常用的相似代码；
2. 上手一个模块、项目，往往就是熟悉这些常用代码；
3. 汇总这些代码，开发 vscode snippet 插件，支持在 vscode 中通过键入某些字符从配置中呼出（snippet）；
4. 利于日常开发提速，交接时降低别人的开发成本；方便自己，有利他人。

## 开发思路

[项目详见仓库](https://github.com/engvuchen/snippet-demo)

1. 项目需支持选取本地 snippet 等能力，也需被 `vsce`（插件打包器）打包为插件；

2. 读取 `package.json` 中的 `snippetFilter`，过滤本地 snippet 配置。

结构如下：

```json
...
  "snippetFilter": [
    {
      "language": "javascript",
      "includes": [
        "@util"
      ]
    },
    {
      "language": "vue",
      "includes": []
    },
    {
      "language": "proto3",
      "includes": []
    }
  ]
...
```