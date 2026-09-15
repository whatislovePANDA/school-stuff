import { reactive, watch } from 'vue'

const STORAGE_KEY_BELLS = 'schedule-app-bells'
const STORAGE_KEY_LESSONS = 'schedule-app-lessons'

export const DAYS = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ']

const defaultBells = [
  { period: 1, start: '08:30', end: '09:15' },
  { period: 2, start: '09:25', end: '10:10' },
  { period: 3, start: '10:20', end: '11:05' },
  { period: 4, start: '11:25', end: '12:10' },
  { period: 5, start: '12:20', end: '13:05' },
  { period: 6, start: '13:15', end: '14:00' },
  { period: 7, start: '14:05', end: '14:50' },
  { period: 8, start: '14:55', end: '15:40' },
]

const defaultLessons = [
  { id: 1, day: 'ПН', period: 1, text: '5А математика' },
  { id: 2, day: 'ПН', period: 4, text: '8Б інформатика' },
  { id: 3, day: 'ПН', period: 5, text: '11Б інформатика' },
  { id: 4, day: 'ПН', period: 6, text: '11Б інформатика' },
  { id: 5, day: 'ВТ', period: 1, text: '11А інформатика' },
  { id: 6, day: 'ВТ', period: 6, text: '5А математика' },
  { id: 7, day: 'ВТ', period: 7, text: '10А інформатика' },
  { id: 8, day: 'СР', period: 5, text: '5А математика' },
  { id: 9, day: 'СР', period: 6, text: '10Б інформатика' },
  { id: 10, day: 'СР', period: 7, text: '7Б інформатика' },
  { id: 11, day: 'ЧТ', period: 2, text: '5А математика' },
  { id: 12, day: 'ЧТ', period: 7, text: '9Б інформатика' },
  { id: 13, day: 'ПТ', period: 3, text: '5А математика' },
  { id: 14, day: 'ПТ', period: 6, text: '11Б інформатика' },
]

function load(key, fallback) {
  const raw = localStorage.getItem(key)
  if (!raw) return fallback
  try {
    return JSON.parse(raw)
  } catch {
    return fallback
  }
}

const state = reactive({
  bells: load(STORAGE_KEY_BELLS, defaultBells),
  lessons: load(STORAGE_KEY_LESSONS, defaultLessons),
})

watch(() => state.bells, (v) => localStorage.setItem(STORAGE_KEY_BELLS, JSON.stringify(v)), { deep: true })
watch(() => state.lessons, (v) => localStorage.setItem(STORAGE_KEY_LESSONS, JSON.stringify(v)), { deep: true })

let nextId = Math.max(0, ...state.lessons.map((l) => l.id)) + 1

export function useSchedule() {
  function addLesson({ day, period, text }) {
    state.lessons.push({ id: nextId++, day, period: Number(period), text })
  }
  function updateLesson(id, patch) {
    const l = state.lessons.find((l) => l.id === id)
    if (l) Object.assign(l, patch)
  }
  function removeLesson(id) {
    const idx = state.lessons.findIndex((l) => l.id === id)
    if (idx !== -1) state.lessons.splice(idx, 1)
  }
  function lessonAt(day, period) {
    return state.lessons.find((l) => l.day === day && l.period === period)
  }
  function resetAll() {
    state.bells.splice(0, state.bells.length, ...defaultBells.map((b) => ({ ...b })))
    state.lessons.splice(0, state.lessons.length, ...defaultLessons.map((l) => ({ ...l })))
  }
  function clearAll() {
    state.lessons.splice(0, state.lessons.length)
  }
  return { state, addLesson, updateLesson, removeLesson, lessonAt, resetAll, clearAll }
}