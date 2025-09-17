# DECO27-syoukai

这是一个介绍DECO27的个人展示网站项目。

## 项目简介

本项目旨在展示DECO27的相关信息，包括个人介绍、作品展示等内容。网站采用现代前端技术栈构建，具有响应式设计，可在各种设备上良好展示。

## 技术栈

- **前端框架**：Vue.js 3
- **构建工具**：Vite
- **编程语言**：TypeScript
- **路由管理**：Vue Router
- **状态管理**：Pinia
- **样式**：CSS原生样式
- **部署**：GitHub Pages

## 项目结构

```
├── src/                # 源代码目录
│   ├── assets/         # 静态资源文件（样式、图片等）
│   ├── components/     # Vue组件
│   ├── views/          # 页面视图
│   ├── router/         # 路由配置
│   ├── stores/         # Pinia状态管理
│   ├── App.vue         # 应用主组件
│   └── main.ts         # 应用入口文件
├── image/              # 图片资源目录
├── public/             # 静态资源目录
├── vite.config.ts      # Vite配置文件
├── tsconfig.json       # TypeScript配置
└── package.json        # 项目依赖配置
```

## 功能特点

- 个人介绍页面
- 作品展示
- 响应式设计，适配不同屏幕尺寸
- 简洁美观的UI设计

## 如何运行

### 前置要求

- Node.js 14+ 和 npm 6+

### 安装依赖

```bash
npm install
```

### 开发模式运行

```bash
npm run dev
```

项目将在本地开发服务器上运行，默认地址为：http://localhost:5173/

### 构建生产版本

```bash
npm run build
```

构建后的文件将生成在`dist`目录中，可以直接部署到静态网站服务器。

## 部署说明

项目配置了GitHub Actions自动部署流程，当代码推送到`main`分支时，将自动构建并部署到GitHub Pages。

## 注意事项

- 本项目的GitHub Pages基础路径已配置为`/DECO27-syoukai/`，确保与仓库名称一致
- 图片资源较大，请注意加载性能优化

## License

MIT
