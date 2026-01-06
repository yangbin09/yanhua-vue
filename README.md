# 🎆 烟花模拟器 (Vue 3 + Canvas)

[English](./README_EN.md) | 简体中文

基于 **Vue 3**、**TypeScript** 和 **HTML5 Canvas** 构建的精美交互式烟花模拟项目。在浏览器中体验真实的物理引擎、绚丽的视觉特效和沉浸式的音效。

## 📺 演示视频

[点击观看演示视频 (assets/demo.mp4)](assets/demo.mp4)

> 注意：GitHub 可能无法直接在页面内播放仓库中的视频文件，请点击上方链接查看。

## ✨ 功能特性

- **交互式体验**：点击或触摸屏幕任意位置即可发射烟花。
- **丰富的烟花类型**：包含 10+ 种独特风格，如牡丹、菊花、柳树、频闪、环形、心形、十字等。
- **真实物理引擎**：自定义物理引擎，模拟重力、空气阻力和粒子扩散效果。
- **沉浸式音效**：动态声音引擎，发射和爆炸音效与视觉完美同步。
- **氛围感视觉**：动态背景，包含城市天际线、星空和云层。
- **响应式设计**：完美适配桌面端和移动端设备。
- **自定义设置**：通过设置面板调整音量和其他参数。

## 🛠️ 技术栈

- **框架**: [Vue 3](https://vuejs.org/) (Composition API)
- **语言**: [TypeScript](https://www.typescriptlang.org/)
- **构建工具**: [Vite](https://vitejs.dev/)
- **渲染**: HTML5 Canvas 2D API
- **样式**: CSS3

## 🚀 快速开始

按照以下步骤在本地运行项目。

### 前置要求

- Node.js (v14.0.0 或更高版本)
- npm 或 yarn

### 安装

1. 克隆仓库：
   ```bash
   git clone https://github.com/yangbin09/yanhua-vue.git
   cd yanhua-vue
   ```

2. 安装依赖：
   ```bash
   npm install
   ```

### 开发

启动开发服务器：

```bash
npm run dev
```

打开浏览器访问 `http://localhost:5173`（或终端中显示的 URL）。

### 生产环境构建

构建生产环境版本：

```bash
npm run build
```

构建产物将输出到 `dist` 目录。

### 预览生产构建

```bash
npm run preview
```

## 📂 项目结构

```
src/
├── components/      # Vue 组件 (遮罩层, 设置面板等)
├── composables/     # 组合式函数 (状态逻辑)
├── game/           # 游戏核心逻辑
│   ├── Engine.js       # 主循环和协调器
│   ├── Physics.js      # 粒子和烟花物理
│   ├── SoundEngine.js  # 音频管理
│   └── Visuals.js      # 背景元素 (星空, 天际线)
├── App.vue         # 应用入口组件
└── main.ts         # 应用初始化
```

## 📄 许可证

[MIT](LICENSE)
