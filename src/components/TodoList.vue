<template>
  <div>
    <ul>
      <li v-for="( todoItem, index ) in todoItems" v-bind:key="todoItem.item" class="shadow">
        <span class="checkBtn" v-bind:class="{ checkBtnCompleted: todoItem.completed }" @click="checkItem(todoItem, index)">
          <i class="fas fa-check"></i>
        </span>
        <span v-bind:class="{ textCompleted: todoItem.completed }">{{ todoItem.item }}</span>
        <span class="removeBtn" @click="removeTodo(todoItem, index)">
          <i class="fas fa-trash-alt"></i>
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: [ 'todoItems' ], // App.vue에서 props를 통해 전달받은 데이터
  methods: {
    removeTodo(item, i) {
      this.$emit('removeTodo', item, i);
    },
    checkItem(item, i) {
      this.$emit('checkTodo', item, i);
    }
  },

}
</script>

<style lang="sass" scoped>
  ul
    list-style-type: none
    padding-left: 0px
    margin-top: 0
    text-align: left

  li
    display: flex
    min-height: 50px
    height: 50px
    line-height: 50px
    margin: .5rem 0
    padding: 0 .9rem
    background: #fff
    border-radius: 5px

  .removeBtn /* 삭제버튼(쓰레기통) */
    margin-left: auto
    color: #de4343

  .checkBtn /* 체크박스 */
    line-height: 45px
    color: #62acde
    margin-right: 5px

  .checkBtnCompleted /* 체크박스(완료한 TodoItem) */
    color: #b3adad

  .textCompleted
    text-decoration: line-through
    color: #b3adad

</style>