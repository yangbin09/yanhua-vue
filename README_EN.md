# 🎆 Fireworks Simulation (Vue 3 + Canvas)

English | [简体中文](./README.md)

A beautiful, interactive fireworks simulation built with **Vue 3**, **TypeScript**, and **HTML5 Canvas**. Experience realistic physics, stunning visual effects, and immersive soundscapes directly in your browser.

## 📺 Demo Video

[Click to watch demo video (assets/demo.mp4)](assets/demo.mp4)

> Note: GitHub may not play repository video files directly inline. Please click the link above to watch.

## ✨ Features

- **Interactive Gameplay**: Click or touch anywhere on the screen to launch fireworks.
- **Diverse Firework Types**: Includes 10+ distinct styles such as Peony, Chrysanthemum, Willow, Strobe, Ring, Heart, Crossette, and more.
- **Realistic Physics**: Custom physics engine for gravity, drag, and particle dispersion.
- **Immersive Audio**: Dynamic sound engine with launch and explosion effects synchronized with visuals.
- **Atmospheric Visuals**: Dynamic backgrounds featuring skylines, star fields, and cloud layers.
- **Responsive Design**: Optimized for both desktop and mobile devices.
- **Customizable Settings**: Adjust volume and other parameters via the settings panel.

## 🛠️ Tech Stack

- **Framework**: [Vue 3](https://vuejs.org/) (Composition API)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Rendering**: HTML5 Canvas 2D API
- **Styling**: CSS3

## 🚀 Getting Started

Follow these steps to set up the project locally.

### Prerequisites

- Node.js (v14.0.0 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yangbin09/yanhua-vue.git
   cd yanhua-vue
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Development

Start the development server:

```bash
npm run dev
```

Open your browser and navigate to `http://localhost:5173` (or the URL shown in your terminal).

### Production Build

Build the project for production:

```bash
npm run build
```

The output files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## 📂 Project Structure

```
src/
├── components/      # Vue components (Overlay, Settings, etc.)
├── composables/     # Shared state and logic
├── game/           # Core game logic
│   ├── Engine.js       # Main game loop and coordinator
│   ├── Physics.js      # Particle and Firework physics
│   ├── SoundEngine.js  # Audio management
│   └── Visuals.js      # Background elements (Stars, Skyline)
├── App.vue         # Main application entry
└── main.ts         # App initialization
```

## 📄 License

[MIT](LICENSE)
