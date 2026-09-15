<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useSchedule } from '../composables/useSchedule'

const { state } = useSchedule()
const now = ref(new Date())
let timer
onMounted(() => { timer = setInterval(() => (now.value = new Date()), 15000) })
onUnmounted(() => clearInterval(timer))

const dayMap = { 1: 'ПН', 2: 'ВТ', 3: 'СР', 4: 'ЧТ', 5: 'ПТ' }
const toMinutes = (t) => { const [h, m] = t.split(':').map(Number); return h * 60 + m }

const currentInfo = computed(() => {
  const jsDay = now.value.getDay()
  const day = dayMap[jsDay]
  if (!day) return { status: 'weekend' }
  const nowMin = now.value.getHours() * 60 + now.value.getMinutes()
  for (const bell of state.bells) {
    const start = toMinutes(bell.start)
    const end = toMinutes(bell.end)
    if (nowMin >= start && nowMin <= end) {
      const lesson = state.lessons.find((l) => l.day === day && l.period === bell.period)
      return { status: 'lesson', bell, lesson, day }
    }
  }
  const next = state.bells.find((b) => toMinutes(b.start) > nowMin)
  if (next) {
    const lesson = state.lessons.find((l) => l.day === day && l.period === next.period)
    return { status: 'break', bell: next, lesson, day }
  }
  return { status: 'done', day }
})
</script>

<template>
  <div class="now-banner">
    <div class="clock">{{ now.toLocaleTimeString('uk-UA', { hour: '2-digit', minute: '2-digit' }) }}</div>
    <div v-if="currentInfo.status === 'lesson'">
      Зараз {{ currentInfo.bell.period }} урок ({{ currentInfo.bell.start }}–{{ currentInfo.bell.end }}):
      <strong>{{ currentInfo.lesson ? currentInfo.lesson.text : '—' }}</strong>
    </div>
    <div v-else-if="currentInfo.status === 'break'">
      Перерва. Далі {{ currentInfo.bell.period }} урок о {{ currentInfo.bell.start }}:
      <strong>{{ currentInfo.lesson ? currentInfo.lesson.text : '—' }}</strong>
    </div>
    <div v-else-if="currentInfo.status === 'done'">Уроки на сьогодні завершено</div>
    <div v-else>Сьогодні вихідний</div>
  </div>
</template>

<style scoped>
.now-banner { background:#1e293b; color:#fff; padding:12px 16px; border-radius:8px; display:flex; gap:16px; align-items:center; flex-wrap:wrap; margin-bottom:16px; }
.clock { font-size:1.4rem; font-weight:700; }
</style>