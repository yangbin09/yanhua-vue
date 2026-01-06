<template>
  <div class="hero">
    <div class="title-container">
      <h1 class="glow-text" :data-text="Config.titleText">{{ Config.titleText }}</h1>
    </div>
    <p class="subtitle">{{ Config.subtitleText }}</p>

    <!-- Envelope Button -->
    <div class="envelope-container">
      <button class="envelope-btn" @click="showLetter = true" title="打开信件">
        <span class="icon">✉️</span>
      </button>
    </div>

    <!-- Letter Modal -->
    <Transition name="fade">
      <div v-if="showLetter" class="letter-overlay" @click.self="showLetter = false">
        <div class="letter-paper">
          <button class="close-btn" @click="showLetter = false">×</button>
          <div class="letter-content">
            <h2>致 2026 的你</h2>
            <div class="divider"></div>
            <p>
              愿你在新的一年里，<br>
              如烟花般绚烂，<br>
              如星空般璀璨。<br>
              <br>
              所求皆如愿，<br>
              所行化坦途。<br>
              <br>
              岁岁常欢愉，<br>
              年年皆胜意。
            </p>
            <p class="signature">—— 小阳</p>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { Config } from '../composables/useGameSettings';

const showLetter = ref(false);
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

/* Envelope Button Styles */
.envelope-container {
  margin-top: 60px;
  pointer-events: auto; /* Enable interaction */
  display: flex;
  justify-content: center;
}

.envelope-btn {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 215, 0, 0.4);
  width: 60px;
  height: 60px;
  border-radius: 50%;
  font-size: 30px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  animation: pulse 3s infinite;
  backdrop-filter: blur(4px);
}

.envelope-btn:hover {
  background: rgba(255, 215, 0, 0.2);
  transform: scale(1.15) rotate(5deg);
  box-shadow: 0 0 20px rgba(255, 215, 0, 0.4);
}

.icon {
  filter: drop-shadow(0 2px 4px rgba(0,0,0,0.5));
}

@keyframes pulse {
  0% { box-shadow: 0 0 0 0 rgba(255, 215, 0, 0.4); }
  70% { box-shadow: 0 0 0 15px rgba(255, 215, 0, 0); }
  100% { box-shadow: 0 0 0 0 rgba(255, 215, 0, 0); }
}

/* Letter Modal Styles */
.letter-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(8px);
  z-index: 1000; /* High z-index */
  display: flex;
  align-items: flex-start; /* Align to top */
  justify-content: center;
  pointer-events: auto;
  padding-top: 4vh; /* Adjusted to be higher up near the red box */
}

.letter-paper {
  background: linear-gradient(to bottom right, #fffdf5, #f5e6d3);
  padding: 50px 40px;
  border-radius: 8px;
  max-width: 90%;
  width: 420px;
  max-height: 85vh; /* Ensure it fits on screen */
  overflow-y: auto; /* Enable scrolling for long content */
  display: flex;
  flex-direction: column;
  box-shadow: 
    0 1px 1px rgba(0,0,0,0.15), 
    0 10px 0 -5px #eee, 
    0 10px 1px -4px rgba(0,0,0,0.15), 
    0 20px 0 -10px #eee, 
    0 20px 1px -9px rgba(0,0,0,0.15),
    0 30px 50px rgba(0,0,0,0.7);
  position: relative;
  font-family: 'Ma Shan Zheng', cursive;
  color: #5d4037;
  text-align: left;
  transform-origin: center top; /* Animation origin */
  border: 1px solid #eecfa1;
}

/* Custom Scrollbar for letter */
.letter-paper::-webkit-scrollbar {
  width: 6px;
}
.letter-paper::-webkit-scrollbar-track {
  background: transparent;
}
.letter-paper::-webkit-scrollbar-thumb {
  background: rgba(93, 64, 55, 0.2);
  border-radius: 3px;
}


.close-btn {
  position: sticky; /* Sticky close button */
  top: 0;
  float: right;
  margin-top: -35px; /* Pull it up into padding */
  margin-right: -20px;
  z-index: 10;
  background: none;
  border: none;
  font-size: 32px; /* Larger hit area */
  line-height: 1;
  cursor: pointer;
  color: #8d6e63;
  transition: color 0.3s;
  padding: 10px; /* Larger hit area */
}

.close-btn:hover {
  color: #3e2723;
  transform: scale(1.1);
}

.letter-content {
  margin-top: 10px;
}

.letter-content h2 {
  text-align: center;
  margin: 0 0 15px 0;
  font-size: 2rem;
  color: #3e2723;
}

.divider {
  height: 2px;
  background: radial-gradient(circle, #d7ccc8 0%, transparent 100%);
  margin-bottom: 25px;
}

.letter-content p {
  font-size: 1.3rem;
  line-height: 2;
  margin-bottom: 1.5rem;
}

.signature {
  text-align: right;
  margin-top: 40px;
  font-size: 1.2rem;
  font-weight: bold;
}

/* Mobile Optimizations */
@media (max-width: 768px) {
  .letter-paper {
    padding: 30px 20px; /* Reduced padding on mobile */
    width: 85%;
    max-height: 80vh;
  }
  
  .letter-content h2 {
    font-size: 1.6rem;
  }
  
  .letter-content p {
    font-size: 1.1rem; /* Smaller font for mobile readability */
    line-height: 1.8;
  }
  
  .close-btn {
    font-size: 28px;
    margin-top: -20px;
    margin-right: -10px;
  }
  
  .signature {
    margin-top: 20px;
    font-size: 1.1rem;
  }
}

/* Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: all 0.6s cubic-bezier(0.22, 1, 0.36, 1);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-from .letter-paper {
  transform: translateY(50px) scale(0.9) rotateX(-20deg);
}

.fade-leave-to .letter-paper {
  transform: translateY(50px) scale(0.9) rotateX(-20deg);
}

.fade-enter-active .letter-paper,
.fade-leave-active .letter-paper {
  transition: all 0.6s cubic-bezier(0.22, 1, 0.36, 1);
}
</style>
