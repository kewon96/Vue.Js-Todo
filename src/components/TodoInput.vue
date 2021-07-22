<template>
  <div class="inputBox shadow">
    <input type="text" v-model="newTodoItem" @keyup.enter="addTodo">
    <span class="addContainer" @click="addTodo">
      <i class="fas fa-plus addBtn"></i>
    </span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newTodoItem: ""
    }
  },
  methods: {
    addTodo() {
      const newTodoItem = this.newTodoItem;

      if (newTodoItem !== '') {
        let obj = {
          completed: false, // 완료여부(생성시엔 기본 false)
          item: newTodoItem
        };

        // localStorage에 저장
        localStorage.setItem(newTodoItem, JSON.stringify(obj));
        this.clearInput();
      }


    },
    clearInput() {
      this.newTodoItem = "";
    }
  }
}
</script>

<style lang="sass" scoped>
  input:focus
    outline: none

  .inputBox
    background: white
    height: 50px
    line-height: 50px
    border-radius: 5px

  .inputBox input
    border-style: none
    font-size: 0.9rem

  .addContainer
    float: right
    background: linear-gradient(to right, #6478fb, #8763fb)
    display: block
    width: 3rem
    border-radius: 0 5px 5px 0

  .addBtn
    color: white
    vertical-align: middle

</style>