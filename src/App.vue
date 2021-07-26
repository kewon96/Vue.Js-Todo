<template>
  <div id="app">
    <TodoHeader></TodoHeader>
    <TodoInput v-on:addTodo="addItem"></TodoInput>
    <TodoList v-bind:todo-items="todoItems"
              v-on:removeTodo="removeItem"
              v-on:checkTodo="checkItem"></TodoList>
    <TodoFooter v-on:clearAllTodo="clearAllItem"></TodoFooter>
  </div>
</template>

<script>
import TodoHeader from "./components/TodoHeader.vue";
import TodoInput from "./components/TodoInput.vue";
import TodoList from "./components/TodoList.vue";
import TodoFooter from "./components/TodoFooter.vue";

export default {
  data() {
    return {
      todoItems: []
    }
  },
  methods: {
    addItem(todoItem) {
      // TodoInput 컴포넌트에서 동작한 addTodoItem이벤트로 인해
      // "addTodoItem"라는 함수가 작동
      const obj = {
        completed: false, // 완료여부(생성시엔 기본 false)
        item: todoItem // 전달받은 Item
      };

      localStorage.setItem(todoItem, JSON.stringify(obj));
      this.todoItems.push(obj);
    },
    removeItem(item, i) {
      // 지울 때 localStorage하고 todoItems 양쪽 다 삭제해야한다.
      // 받아올 때 Proxy로 받아와지기 때문에 key값을 가지고 지워줘야한다.
      localStorage.removeItem(item.item);
      this.todoItems.splice(i, 1);
    },
    checkItem(item, i) {
      // TodoList에서 넘겨받은 item이 아니라 여기에 있는 todoItems의 데이터를 수정
      this.todoItems[i].completed = !this.todoItems[i].completed;
      // localStorage data update : removeItem -> setItem
      localStorage.removeItem(item.item);
      localStorage.setItem(item.item, JSON.stringify(item));
    },
    clearAllItem() {
      localStorage.clear();
      this.todoItems = [];
    }
  },
  created() {
    // Vue 인스턴스가 생성되자마자 동작
    if(localStorage.length > 0) {
      for (let i = 0; i < localStorage.length; i++) {
        this.todoItems.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
      }
    }
  },
  components: {
    TodoHeader,
    TodoInput,
    TodoList,
    TodoFooter,
  }
}

</script>

<style lang="sass">

  body
    text-align: center
    background-color: #f6f6f6

  input
    border-style: groove
    width: 200px

  button
    border-style: groove

  .shadow
    box-shadow: 5px 10px 10px rgba(0, 0, 0, .03)

</style>
