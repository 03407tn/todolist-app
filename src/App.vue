<script setup lang="ts">
import { ref, computed } from 'vue'
import TodoItem from './components/TodoItem.vue'

interface Todo {
  id: number
  text: string
  completed: boolean
}

const todos = ref<Todo[]>([])
const newTodo = ref('')

const activeTodos = computed(() => todos.value.filter(todo => !todo.completed))
const completedTodos = computed(() => todos.value.filter(todo => todo.completed))

const addTodo = () => {
  if (newTodo.value.trim()) {
    todos.value.push({
      id: Date.now(),
      text: newTodo.value.trim(),
      completed: false
    })
    newTodo.value = ''
  }
}

const toggleTodo = (id: number) => {
  const todo = todos.value.find(t => t.id === id)
  if (todo) {
    todo.completed = !todo.completed
  }
}

const deleteTodo = (id: number) => {
  todos.value = todos.value.filter(t => t.id !== id)
}

const editTodo = (id: number, newText: string) => {
  const todo = todos.value.find(t => t.id === id)
  if (todo) {
    todo.text = newText
  }
}
</script>

<template>
  <div class="container">
    <h1>ToDoList</h1>
    <div class="input-container">
      <input 
        v-model="newTodo" 
        type="text" 
        placeholder="请输入待办事项"
        @keyup.enter="addTodo"
      >
      <button @click="addTodo" class="submit-btn">Submit</button>
    </div>
    <div class="lists-container">
      <div class="todo-list">
        <h2>正在进行({{ activeTodos.length }})</h2>
        <TodoItem 
          v-for="todo in activeTodos" 
          :key="todo.id"
          :todo="todo"
          @toggle="toggleTodo"
          @delete="deleteTodo"
          @edit="editTodo"
        />
      </div>
      <div class="todo-list">
        <h2>已经完成({{ completedTodos.length }})</h2>
        <TodoItem 
          v-for="todo in completedTodos" 
          :key="todo.id"
          :todo="todo"
          @toggle="toggleTodo"
          @delete="deleteTodo"
          @edit="editTodo"
        />
      </div>
    </div>
  </div>
</template>

<style>
.container {
  max-width: 900px;
  margin: 0 auto;
  padding: 40px 20px;
}

h1 {
  color: #333;
  margin-bottom: 40px;
  font-size: 44px;
  font-weight: 600;
  text-align: center;
  letter-spacing: -0.5px;
}

.input-container {
  display: flex;
  gap: 12px;
  margin-bottom: 40px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

input {
  flex: 1;
  padding: 12px 16px;
  border: 1px solid #e1e1e1;
  border-radius: 12px;
  background: white;
  color: #333;
  font-size: 16px;
  transition: all 0.3s ease;
}

input::placeholder {
  color: #999;
}

input:focus {
  outline: none;
  border-color: #007AFF;
  box-shadow: 0 0 0 2px rgba(0, 122, 255, 0.1);
}

.submit-btn {
  padding: 12px 24px;
  background: #007AFF;
  color: white;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  font-weight: 600;
  font-size: 16px;
  transition: all 0.3s ease;
}

.submit-btn:hover {
  background: #0066d6;
  transform: translateY(-1px);
}

.lists-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
}

.todo-list {
  background: white;
  padding: 30px;
  border-radius: 20px;
  min-height: 200px;
  border: 1px solid #e1e1e1;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
}

h2 {
  color: #333;
  margin-bottom: 20px;
  font-size: 20px;
  font-weight: 500;
  letter-spacing: -0.3px;
  display: flex;
  align-items: center;
  gap: 8px;
}

h2::after {
  content: attr(data-count);
  font-size: 14px;
  background: #f5f5f5;
  color: #666;
  padding: 4px 8px;
  border-radius: 8px;
  font-weight: normal;
}

@media (max-width: 768px) {
  .lists-container {
    grid-template-columns: 1fr;
  }
  
  h1 {
    font-size: 32px;
  }
  
  .container {
    padding: 20px;
  }
}
</style>
