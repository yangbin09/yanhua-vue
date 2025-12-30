<template>
  <div class="app-container" @click="handleLaunch" @touchstart.prevent="handleLaunch">
    <canvas ref="canvasRef"></canvas>
    <HeroOverlay />
    <SettingsPanel />
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue';
import { Engine } from './game/Engine';
import { Config } from './composables/useGameSettings';
import HeroOverlay from './components/HeroOverlay.vue';
import SettingsPanel from './components/SettingsPanel.vue';

const canvasRef = ref(null);
let engine = null;

const handleLaunch = (e) => {
  if (!engine) return;
  
  // Initialize sound on first user interaction
  engine.sound.init();
  
  const rect = canvasRef.value.getBoundingClientRect();
  const clientX = e.clientX ?? e.touches?.[0]?.clientX;
  const clientY = e.clientY ?? e.touches?.[0]?.clientY;
  
  if (clientX === undefined || clientY === undefined) return;
  
  const x = clientX - rect.left;
  const y = clientY - rect.top;
  
  // Launch multiple for effect
  engine.launch(x, y);
  
  // Optional: burst
  if (Math.random() > 0.7) {
    setTimeout(() => engine.launch(x + (Math.random()-0.5)*100, y + (Math.random()-0.5)*100), 100);
    setTimeout(() => engine.launch(x + (Math.random()-0.5)*100, y + (Math.random()-0.5)*100), 200);
  }
};

// Sync Volume
watch(() => Config.volume, (val) => {
  if (engine && engine.sound) {
    engine.sound.setVolume(val);
  }
});

onMounted(() => {
  if (canvasRef.value) {
    engine = new Engine(canvasRef.value);
    
    // Initial sync
    engine.sound.setVolume(Config.volume);
  }
});

onBeforeUnmount(() => {
  if (engine) {
    engine.destroy();
  }
});
</script>

<style>
body {
  margin: 0;
  overflow: hidden;
  background: #020617;
}
canvas {
  display: block;
  width: 100%;
  height: 100%;
}
.app-container {
  width: 100vw;
  height: 100vh;
  position: relative;
}
</style>
