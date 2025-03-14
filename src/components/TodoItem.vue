<template>
  <div class="todo-item" :class="{ 'completed': todo.completed }">
    <div class="todo-content">
      <label class="checkbox-container">
        <input 
          type="checkbox" 
          :checked="todo.completed"
          @change="$emit('toggle', todo.id)"
        >
        <span class="checkmark"></span>
      </label>
      <div v-if="!isEditing" class="todo-text" @dblclick="startEdit">
        {{ todo.text }}
      </div>
      <input
        v-else
        type="text"
        class="edit-input"
        v-model="editText"
        @blur="finishEdit"
        @keyup.enter="finishEdit"
        @keyup.esc="cancelEdit"
        ref="editInput"
      >
    </div>
    <div class="actions">
      <button v-if="!isEditing" class="edit-btn" @click="startEdit">
        <svg viewBox="0 0 24 24" width="16" height="16">
          <path fill="currentColor" d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
        </svg>
      </button>
      <button class="delete-btn" @click="$emit('delete', todo.id)">
        <svg viewBox="0 0 24 24" width="16" height="16">
          <path fill="currentColor" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue'

interface Todo {
  id: number
  text: string
  completed: boolean
}

const props = defineProps<{
  todo: Todo
}>()

const emit = defineEmits<{
  toggle: [id: number]
  delete: [id: number]
  edit: [id: number, newText: string]
}>()

const isEditing = ref(false)
const editText = ref(props.todo.text)
const editInput = ref<HTMLInputElement | null>(null)

const startEdit = async () => {
  if (!props.todo.completed) {
    isEditing.value = true
    editText.value = props.todo.text
    await nextTick()
    editInput.value?.focus()
  }
}

const finishEdit = () => {
  if (isEditing.value) {
    const newText = editText.value.trim()
    if (newText && newText !== props.todo.text) {
      emit('edit', props.todo.id, newText)
    }
    isEditing.value = false
  }
}

const cancelEdit = () => {
  isEditing.value = false
  editText.value = props.todo.text
}
</script>

<script lang="ts">
export default {
  name: 'TodoItem'
}
</script>

<style scoped>
.todo-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  margin-bottom: 10px;
  background: white;
  border-radius: 12px;
  transition: all 0.3s ease;
  border: 1px solid #e1e1e1;
}

.todo-item:hover {
  border-color: #007AFF;
  background: #f8f8f8;
}

.todo-content {
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
}

.todo-text {
  color: #333;
  font-size: 16px;
  transition: all 0.3s ease;
  cursor: text;
}

.completed .todo-text {
  text-decoration: line-through;
  color: #999;
}

.edit-input {
  flex: 1;
  padding: 4px 8px;
  font-size: 16px;
  border: 1px solid #007AFF;
  border-radius: 6px;
  outline: none;
  color: #333;
}

.checkbox-container {
  position: relative;
  display: block;
  width: 22px;
  height: 22px;
  cursor: pointer;
  flex-shrink: 0;
}

.checkbox-container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 22px;
  width: 22px;
  background: white;
  border: 2px solid #e1e1e1;
  border-radius: 6px;
  transition: all 0.3s ease;
}

.checkbox-container:hover input ~ .checkmark {
  border-color: #007AFF;
}

.checkbox-container input:checked ~ .checkmark {
  background: #007AFF;
  border-color: #007AFF;
}

.checkmark:after {
  content: "";
  position: absolute;
  display: none;
  left: 7px;
  top: 3px;
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

.checkbox-container input:checked ~ .checkmark:after {
  display: block;
}

.actions {
  display: flex;
  gap: 8px;
}

.delete-btn,
.edit-btn {
  background: none;
  border: none;
  color: #999;
  cursor: pointer;
  padding: 8px;
  border-radius: 8px;
  line-height: 0;
  transition: all 0.3s ease;
  opacity: 0;
}

.edit-btn {
  color: #007AFF;
}

.edit-btn:hover {
  background: rgba(0, 122, 255, 0.1);
}

.delete-btn:hover {
  color: #ff3b30;
  background: #fff1f0;
}

.todo-item:hover .delete-btn,
.todo-item:hover .edit-btn {
  opacity: 1;
}

.completed .edit-btn {
  display: none;
}
</style> 