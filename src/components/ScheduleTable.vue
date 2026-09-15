<script setup>
import { ref } from 'vue'
import { useSchedule, DAYS } from '../composables/useSchedule'

const { state, addLesson, updateLesson, removeLesson, lessonAt } = useSchedule()

const editing = ref(null)
const text = ref('')

function openAdd(day, period) { editing.value = { day, period, id: null }; text.value = '' }
function openEdit(lesson) { editing.value = { day: lesson.day, period: lesson.period, id: lesson.id }; text.value = lesson.text }
function save() {
  if (!text.value.trim()) return
  if (editing.value.id) updateLesson(editing.value.id, { text: text.value.trim() })
  else addLesson({ day: editing.value.day, period: editing.value.period, text: text.value.trim() })
  editing.value = null
}
function remove() { if (editing.value?.id) removeLesson(editing.value.id); editing.value = null }
function cancel() { editing.value = null }
</script>

<template>
  <div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th>Урок</th>
          <th v-for="d in DAYS" :key="d">{{ d }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="bell in state.bells" :key="bell.period">
          <td class="period-cell">
            <div>{{ bell.period }}</div>
            <div class="time">{{ bell.start }}–{{ bell.end }}</div>
          </td>
          <td v-for="d in DAYS" :key="d" class="lesson-cell">
            <div v-if="lessonAt(d, bell.period)" class="lesson" @click="openEdit(lessonAt(d, bell.period))">
              {{ lessonAt(d, bell.period).text }}
            </div>
            <button v-else class="add-btn" @click="openAdd(d, bell.period)">+</button>
          </td>
        </tr>
      </tbody>
    </table>

    <div v-if="editing" class="modal-backdrop" @click.self="cancel">
      <div class="modal">
        <h3>{{ editing.id ? 'Редагувати урок' : 'Додати урок' }}</h3>
        <p>{{ editing.day }}, {{ editing.period }} урок</p>
        <input v-model="text" placeholder="Напр. 5А математика" @keyup.enter="save" autofocus />
        <div class="modal-actions">
          <button @click="save">Зберегти</button>
          <button v-if="editing.id" class="danger" @click="remove">Видалити</button>
          <button @click="cancel">Скасувати</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.table-wrap { overflow-x:auto; }
table { border-collapse: collapse; width:100%; min-width:700px; color:var(--text); }
th, td { border:1px solid var(--border); padding:6px; text-align:center; vertical-align: middle; }
th { background:var(--surface-strong); }
.period-cell { background:var(--surface); font-weight:600; }
.time { font-size:.75rem; color:var(--text-muted); font-weight:400; }
.lesson-cell { min-width:110px; height:48px; background:var(--bg); }
.lesson { cursor:pointer; background:var(--accent-soft); color:var(--text); border-radius:6px; padding:4px; font-size:.85rem; }
.lesson:hover { background:var(--accent-soft-hover); }
.add-btn { width:28px; height:28px; border-radius:50%; border:1px dashed var(--text-muted); background:transparent; color:var(--text-muted); cursor:pointer; }
.add-btn:hover { background:var(--surface-strong); }
.modal-backdrop { position:fixed; inset:0; background:rgba(0,0,0,.55); display:flex; align-items:center; justify-content:center; }
.modal { background:var(--surface); color:var(--text); padding:20px; border-radius:10px; width:280px; border:1px solid var(--border); }
.modal input { width:100%; padding:8px; margin:10px 0; box-sizing:border-box; background:var(--bg); color:var(--text); border:1px solid var(--border); border-radius:6px; }
.modal-actions { display:flex; gap:8px; }
.modal-actions button { flex:1; padding:6px; cursor:pointer; }
.danger { background:var(--danger-soft); border-color:var(--danger); }
</style>