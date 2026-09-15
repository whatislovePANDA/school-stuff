<script setup>
import { ref } from 'vue'
import { useSchedule } from '../composables/useSchedule'
const { state, resetAll, clearAll } = useSchedule()
const open = ref(false)
</script>

<template>
  <div class="bell-times">
    <button @click="open = !open">{{ open ? 'Сховати' : 'Налаштувати' }} розклад дзвінків</button>
    <div v-if="open" class="panel">
      <div v-for="bell in state.bells" :key="bell.period" class="row">
        <span>{{ bell.period }} урок</span>
        <input type="time" v-model="bell.start" />
        <span>–</span>
        <input type="time" v-model="bell.end" />
      </div>
      <div class="actions">
        <button @click="resetAll">Скинути до типового розкладу</button>
        <button class="danger" @click="clearAll">Очистити всі уроки</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bell-times { margin-bottom:16px; }
.panel { margin-top:10px; background:var(--surface); border:1px solid var(--border); padding:12px; border-radius:8px; }
.row { display:flex; align-items:center; gap:8px; margin-bottom:6px; color:var(--text); }
.row span:first-child { width:70px; }
.actions { margin-top:10px; display:flex; gap:8px; }
.danger { background:var(--danger-soft); border-color:var(--danger); color:var(--text); }
input[type="time"] { background:var(--surface); color:var(--text); border:1px solid var(--border); border-radius:6px; padding:4px 6px; }
</style>