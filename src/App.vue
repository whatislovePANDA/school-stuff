<script setup>
import NowBanner from './components/NowBanner.vue'
import BellTimes from './components/BellTimes.vue'
import ScheduleTable from './components/ScheduleTable.vue'
</script>

<template>
  <div class="app">
    <h1>Мій розклад уроків</h1>
    <NowBanner />
    <BellTimes />
    <ScheduleTable />
  </div>
</template>

<style>
* { box-sizing: border-box; }
body { margin:0; font-family: system-ui, sans-serif; background:#f1f5f9; }
.app { max-width:960px; margin:0 auto; padding:20px; }
h1 { font-size:1.4rem; }
button { border:1px solid #cbd5e1; background:#fff; border-radius:6px; padding:6px 10px; cursor:pointer; }
</style>