# PicGo 安装 `picgo-plugin-compress`

[`picgo-plugin-compress`](https://github.com/juzisang/picgo-plugin-compress) 是 PicGo 的图片压缩插件，使用此插件可极大减少图床储存、服务器流量。

该插件支持多种压缩方法，但其中 `image2webp` 中的 `cwebp-bin` 需要使用不同平台上的特定终端（例 window 是 cmd），其执行时可能报错，导致插件安装失败。

`cwebp-bin` 运行失败图例：

![image-20230514234322419](https://engvu.oss-cn-shenzhen.aliyuncs.com/88b444b2dc830550c547a7f1a3bd09bb.webp)

## 解决步骤

以下是解决 window 版 PicGo 安装 `picgo-plugin-compress` 失败的可行解（需科学上网）步骤：

1. 环境：window10，node v18，picgo v2.3.0；

2. 打开 PicGo 的安装目录。例 `C:\Users<用户名>\AppData\Roaming\picgo`；

3. 清空 `node_modules` 文件夹；

4. 打开根目录下的 `package.json`，改动 `dependencies`：

```json
{
  "dependencies": {
    "picgo-plugin-compress": "^1.4.0",
  }
}
```

5. 使用 `cmd`、`powershell` （❗ 不要用 [terminal](https://learn.microsoft.com/en-us/windows/terminal/) 套壳连接），在根目录下执行：

```cmd
npm i --registry=https://registry.npm.taobao.org
```

6. 安装成功后，重启 PicGo。

其他安装失败的解决方法可见[此插件 ISSUE](https://github.com/juzisang/picgo-plugin-compress/issues/2)。