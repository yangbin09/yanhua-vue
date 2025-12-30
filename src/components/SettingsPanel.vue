<template>
  <div class="settings" :class="{ open: isOpen }">
    <button class="toggle-btn" @click="isOpen = !isOpen">⚙️</button>
    <div class="panel">
      <h3>配置选项</h3>
      <div class="control-group">
        <label>主音量: {{ Math.round(Config.volume * 100) }}%</label>
        <input type="range" min="0" max="1" step="0.1" v-model.number="Config.volume">
      </div>
      <div class="control-group">
        <label>发射密度: {{ Config.density }}</label>
        <input type="range" min="1" max="10" step="1" v-model.number="Config.density">
      </div>
      <div class="control-group row">
        <label>自动发射</label>
        <input type="checkbox" v-model="Config.autoFire">
      </div>
      <div class="control-group row">
        <label>显示城市背景</label>
        <input type="checkbox" v-model="Config.showCity">
      </div>
      <div class="control-group row">
        <label>显示星空</label>
        <input type="checkbox" v-model="Config.showStars">
      </div>
      
      <div class="control-group">
        <label>标题文字</label>
        <input type="text" v-model="Config.titleText" class="text-input">
      </div>
      <div class="control-group">
        <label>副标题</label>
        <input type="text" v-model="Config.subtitleText" class="text-input">
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { Config } from '../composables/useGameSettings';

const isOpen = ref(false);
</script>

<style scoped>
.settings {
  position: fixed;
  top: 20px;
  right: -300px;
  width: 300px;
  transition: right 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 100;
  font-family: 'Segoe UI', sans-serif;
  color: #fff;
}
.settings.open {
  right: 0;
}
.toggle-btn {
  position: absolute;
  left: -50px;
  top: 0;
  width: 50px;
  height: 50px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: none;
  border-radius: 8px 0 0 8px;
  cursor: pointer;
  font-size: 24px;
  color: #fff;
  transition: background 0.2s;
}
.toggle-btn:hover {
  background: rgba(255, 255, 255, 0.2);
}
.panel {
  background: rgba(15, 23, 42, 0.85);
  backdrop-filter: blur(12px);
  padding: 20px;
  border-radius: 0 0 0 8px;
  border-left: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: -10px 10px 30px rgba(0, 0, 0, 0.3);
  height: 90vh;
  overflow-y: auto;
}
h3 {
  margin: 0 0 20px 0;
  font-size: 18px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding-bottom: 10px;
}
.control-group {
  margin-bottom: 15px;
}
.control-group.row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
label {
  display: block;
  font-size: 14px;
  margin-bottom: 5px;
  color: #94a3b8;
}
input[type="range"] {
  width: 100%;
  accent-color: #60a5fa;
}
input[type="checkbox"] {
  width: 18px;
  height: 18px;
  accent-color: #60a5fa;
}
.text-input {
  width: 100%;
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #fff;
  padding: 8px;
  border-radius: 4px;
  font-size: 14px;
  box-sizing: border-box;
}
.text-input:focus {
  outline: none;
  border-color: #60a5fa;
  background: rgba(0, 0, 0, 0.5);
}
</style>
