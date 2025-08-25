# EPUB 阅读器

一个简洁的EPUB电子书阅读器，支持PWA功能。

## 功能特性

- 📚 支持EPUB格式电子书
- 📱 PWA支持，可安装为应用
- 💾 离线阅读，支持本地存储
- 📖 书架管理，多本书籍管理
- 🔍 目录导航
- 📄 翻页控制
- 🎨 响应式设计，支持移动端

## 快速部署

### 选项1: GitHub Pages (推荐用于开源项目)

1. Fork 或 Clone 此仓库
2. 在仓库设置中启用 GitHub Pages
3. 选择 `gh-pages` 分支作为源
4. 推送代码到 `main` 分支，GitHub Actions 会自动部署

**优化特性:**
- ✅ 启用缓存，避免重复构建
- ✅ 文件压缩 (gzip)
- ✅ 使用 `force_orphan: true` 保持干净的分支历史
- ✅ 智能缓存策略

### 选项2: Vercel (推荐用于快速部署)

1. 注册 [Vercel](https://vercel.com)
2. 导入此仓库
3. 自动部署，通常比 GitHub Pages 快 3-5 倍

**优势:**
- 🚀 全球CDN，访问速度快
- ⚡ 自动HTTPS
- 🔄 自动部署
- 📊 性能分析

### 选项3: Netlify (推荐用于企业项目)

1. 注册 [Netlify](https://netlify.com)
2. 连接Git仓库
3. 自动部署

**优势:**
- 🌍 全球CDN
- 🔒 企业级安全
- 📈 详细分析
- 🔧 强大的构建工具

## 本地开发

```bash
# 克隆仓库
git clone https://github.com/yourusername/epub-reader.git
cd epub-reader

# 启动本地服务器
npm start
# 或者
python -m http.server 8000

# 访问 http://localhost:8000
```

## 部署优化说明

### 1. 减少构建产物体积
- ✅ 移除了所有图标文件
- ✅ 使用 `.gitignore` 排除不必要文件
- ✅ 启用文件压缩

### 2. GitHub Actions 缓存
- ✅ 启用 npm 缓存
- ✅ 缓存优化后的文件
- ✅ 智能缓存键策略

### 3. 使用 force_orphan: true
- ✅ 保持 gh-pages 分支干净
- ✅ 避免历史记录累积
- ✅ 减少部署时间

### 4. 更快的部署方式
- ✅ 提供 Vercel 配置
- ✅ 提供 Netlify 配置
- ✅ 支持多种部署平台

## 文件结构

```
epub-reader/
├── index.html          # 主页面
├── manifest.json       # PWA配置
├── sw.js              # Service Worker
├── epub.min.js        # EPUB解析库
├── jszip.min.js       # ZIP解压库
├── .github/           # GitHub Actions配置
├── vercel.json        # Vercel配置
├── netlify.toml       # Netlify配置
└── README.md          # 说明文档
```

## 性能优化

- 🗜️ 文件压缩 (gzip)
- 📦 智能缓存策略
- 🚀 CDN加速
- 📱 PWA离线支持
- 🎯 响应式设计

## 许可证

MIT License

## 贡献

欢迎提交 Issue 和 Pull Request！
