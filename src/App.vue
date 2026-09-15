<script setup>
import NowBanner from './components/NowBanner.vue'
import BellTimes from './components/BellTimes.vue'
import ScheduleTable from './components/ScheduleTable.vue'
import { useTheme } from './composables/useTheme'

const { theme, toggle } = useTheme()
</script>

<template>
  <div class="app">
    <div class="header">
      <h1>Мій розклад уроків</h1>
      <button class="theme-toggle" @click="toggle">
        {{ theme === 'dark' ? '☀️ Світла тема' : '🌙 Темна тема' }}
      </button>
    </div>
    <NowBanner />
    <BellTimes />
    <ScheduleTable />
  </div>
</template>

<style>
:root[data-theme="dark"] {
  --bg:#0f172a;
  --surface:#1e293b;
  --surface-strong:#111827;
  --border:#334155;
  --text:#e2e8f0;
  --text-muted:#94a3b8;
  --accent:#3b82f6;
  --accent-soft:#1e3a5f;
  --accent-soft-hover:#254a72;
  --danger:#f87171;
  --danger-soft:#3f1d1d;
}
:root[data-theme="light"] {
  --bg:#f1f5f9;
  --surface:#ffffff;
  --surface-strong:#f1f5f9;
  --border:#cbd5e1;
  --text:#0f172a;
  --text-muted:#64748b;
  --accent:#2563eb;
  --accent-soft:#dbeafe;
  --accent-soft-hover:#bfdbfe;
  --danger:#ef4444;
  --danger-soft:#fee2e2;
}

* { box-sizing: border-box; }
body { margin:0; font-family: system-ui, sans-serif; background:var(--bg); color:var(--text); transition: background .15s, color .15s; }
.app { max-width:960px; margin:0 auto; padding:20px; }
.header { display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:10px; }
h1 { font-size:1.4rem; margin:0; }
button { border:1px solid var(--border); background:var(--surface); color:var(--text); border-radius:6px; padding:6px 10px; cursor:pointer; }
.theme-toggle { white-space:nowrap; }
</style>