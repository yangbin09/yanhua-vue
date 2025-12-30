<template>
  <div class="hero">
    <div class="title-container">
      <h1 class="glow-text" :data-text="Config.titleText">{{ Config.titleText }}</h1>
    </div>
    <p class="subtitle">{{ Config.subtitleText }}</p>
  </div>
</template>

<script setup>
import { Config } from '../composables/useGameSettings';
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Ma+Shan+Zheng&family=Noto+Serif+SC:wght@700&display=swap');

.hero {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  pointer-events: none;
  z-index: 10;
  user-select: none;
  mix-blend-mode: screen; /* 混合模式改为 screen 增强亮度 */
  width: 100%;
}

.title-container {
  perspective: 500px;
}

h1 {
  font-family: 'Ma Shan Zheng', 'Noto Serif SC', serif; /* 使用艺术字体 */
  font-weight: 700;
  font-size: clamp(3rem, 12vw, 8rem);
  line-height: 1.2;
  margin: 0;
  color: #fff;
  letter-spacing: 0.1em;
  white-space: nowrap;
  
  /* 多重阴影打造立体发光感 */
  text-shadow: 
    0 0 10px rgba(255, 215, 0, 0.5),
    0 0 20px rgba(255, 215, 0, 0.3),
    0 0 40px rgba(255, 100, 100, 0.3),
    0 0 80px rgba(255, 0, 0, 0.3);
    
  animation: float 6s ease-in-out infinite, glow 3s ease-in-out infinite alternate;
}

/* 霓虹描边效果 */
.glow-text {
  position: relative;
  background: linear-gradient(to bottom, #fff5d6 0%, #ffc482 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  filter: drop-shadow(0 0 15px rgba(255, 200, 100, 0.6));
}

.subtitle {
  color: rgba(255, 255, 255, 0.9);
  margin-top: 30px;
  font-family: 'Noto Serif SC', serif;
  letter-spacing: 4px;
  text-transform: uppercase;
  font-size: clamp(1rem, 2vw, 1.5rem);
  text-shadow: 0 2px 4px rgba(0,0,0,0.8);
  opacity: 0.8;
  animation: fadeIn 2s ease-out;
}

@keyframes float {
  0%, 100% { transform: translateY(0) rotateX(0deg); }
  50% { transform: translateY(-15px) rotateX(5deg); }
}

@keyframes glow {
  from { 
    filter: drop-shadow(0 0 10px rgba(255, 200, 100, 0.4));
  }
  to { 
    filter: drop-shadow(0 0 25px rgba(255, 200, 100, 0.9));
  }
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 0.8; transform: translateY(0); }
}
</style>
