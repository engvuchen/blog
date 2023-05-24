# Mac Git 多用户配置

## 场景

个人电脑里同时有公司项目源码、个人项目源码，公司使用的 name 和 email 配置跟个人项目配置不同。

期望：在公司项目目录 git commit 时使用公司邮箱、名称，而在个人项目目录时则使用个人邮箱、名称。

解决方案：Git Conditional Includes

## 解决方案：Git Conditional Includes

设个人项目目录为 `/Users/yourName/Documents/02-my-code`，公司项目目录为 `/Users/yourName/Documents/01-office-code`；

1. 在 `01-office-code` 下新建 `.gitconfig`；

2. 修改全局用户设置，路径在 `~/.gitconfig`；

```git
# 私人配置全局起效
[user]
  name = youName
  email = youEmail@example.com

## 公司项目针对此文件夹起效
[includeIf "gitdir:/Users/yourName/Documents/01-office-code/"]
  path = /Users/yourName/Documents/01-office-code/.gitconfig
```

使用以下 Git 指令快速查询、修改配置：

```git
# 查询
git config --global user.name // 查询全局用户名
git config --global user.email // 查询全局邮箱

# 设置
git config --global user.name youName // 修改全局用户名
git config --global user.email youEmail@example.com // 修改全局邮箱

# 验证
git config user.name // 获取目录下最终生效的用户名
git config user.email // 获取目录下最终生效的邮箱
```

本文参考

1. [git config 多用户配置](https://zhuanlan.zhihu.com/p/379982981)
