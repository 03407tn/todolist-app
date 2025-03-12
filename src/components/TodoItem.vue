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
      <span class="todo-text">{{ todo.text }}</span>
    </div>
    <button class="delete-btn" @click="$emit('delete', todo.id)">
      <svg viewBox="0 0 24 24" width="16" height="16">
        <path fill="currentColor" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
interface Todo {
  id: number
  text: string
  completed: boolean
}

defineProps<{
  todo: Todo
}>()

defineEmits<{
  toggle: [id: number]
  delete: [id: number]
}>()
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
}

.completed .todo-text {
  text-decoration: line-through;
  color: #999;
}

.checkbox-container {
  position: relative;
  display: block;
  width: 22px;
  height: 22px;
  cursor: pointer;
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

.delete-btn {
  background: none;
  border: none;
  color: #999;
  cursor: pointer;
  padding: 8px;
  border-radius: 8px;
  line-height: 0;
  transition: all 0.3s ease;
  margin-left: 8px;
  opacity: 0;
}

.delete-btn:hover {
  color: #ff3b30;
  background: #fff1f0;
}

.todo-item:hover .delete-btn {
  opacity: 1;
}
</style> 