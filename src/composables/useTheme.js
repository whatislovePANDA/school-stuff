import { ref, watch } from 'vue'

const STORAGE_KEY = 'schedule-app-theme'

function getInitialTheme() {
  const stored = localStorage.getItem(STORAGE_KEY)
  return stored === 'light' || stored === 'dark' ? stored : 'dark' // темна за замовчуванням
}

const theme = ref(getInitialTheme())

function apply(t) {
  document.documentElement.setAttribute('data-theme', t)
}
apply(theme.value)

watch(theme, (t) => {
  localStorage.setItem(STORAGE_KEY, t)
  apply(t)
})

export function useTheme() {
  function toggle() {
    theme.value = theme.value === 'dark' ? 'light' : 'dark'
  }
  return { theme, toggle }
}