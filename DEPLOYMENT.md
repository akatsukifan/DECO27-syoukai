# GitHub 部署指南

本指南将帮助您将项目部署到 GitHub 上。

## 前提条件

1. 已安装 Git
2. 已在 GitHub 上创建了账号
3. 已在 GitHub 上创建了一个新的仓库

## 步骤 1: 初始化 Git 仓库（如果尚未初始化）

如果您的项目尚未初始化为 Git 仓库，请执行以下命令：

```bash
# 在项目根目录下执行
git init
```

## 步骤 2: 添加所有文件到暂存区

```bash
git add .
```

## 步骤 3: 提交更改

```bash
git commit -m "Initial commit"
```

## 步骤 4: 关联远程仓库

将您的本地仓库与 GitHub 上的远程仓库关联起来：

```bash
git remote add origin https://github.com/您的用户名/您的仓库名.git
```

## 步骤 5: 推送到 GitHub

将您的本地提交推送到 GitHub 上的远程仓库：

```bash
git push -u origin main
```

> 注意：如果您的默认分支名称是 master 而不是 main，请使用以下命令：
> ```bash
> git push -u origin master
> ```

## 步骤 6: 验证部署

前往 GitHub 上您的仓库页面，检查所有文件是否已成功上传。

## 额外提示

### 更新项目

当您对项目进行更改后，使用以下命令将更新推送到 GitHub：

```bash
git add .
git commit -m "描述您的更改"
git push
```

### 图片大小限制

GitHub 对单个文件有 100MB 的大小限制。如果您的图片文件较大，可以考虑以下解决方案：
1. 压缩图片文件
2. 使用 Git Large File Storage (Git LFS) 来管理大型文件

## 使用 GitHub Pages 部署静态网站（可选）

如果您想通过 GitHub Pages 托管这个 Vue 应用，可以按照以下步骤操作：

1. 确保项目能够正常构建：

```bash
npm run build
```

2. 安装 `gh-pages` 包：

```bash
npm install -D gh-pages
```

3. 在 `package.json` 中添加以下脚本：

```json
"scripts": {
  "deploy": "gh-pages -d dist"
}
```

4. 执行部署命令：

```bash
npm run deploy
```

5. 几分钟后，您的网站将可以通过 `https://您的用户名.github.io/您的仓库名/` 访问。

更多详细信息，请参考 GitHub 的官方文档。