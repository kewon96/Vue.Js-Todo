<template>
  <div>
    <transition-group name="list" tag="ul"> <!-- name : css class와 연관, tag : 명시한 tag에 해당 Animation을 이식 -->
      <li v-for="( todoItem, index ) in $store.state.todoItems" v-bind:key="todoItem.item" class="shadow">
        <span class="checkBtn" v-bind:class="{ checkBtnCompleted: todoItem.completed }" @click="checkItem(todoItem, index)">
          <i class="fas fa-check"></i>
        </span>
        <span v-bind:class="{ textCompleted: todoItem.completed }">{{ todoItem.item }}</span>
        <span class="removeBtn" @click="removeTodo(todoItem, index)">
          <i class="fas fa-trash-alt"></i>
        </span>
      </li>
    </transition-group>
  </div>
</template>

<script>
export default {
  methods: {
    removeTodo(item, i) {
      this.$store.commit('removeItem', { item, i });
    },
    checkItem(item, i) {
      this.$store.commit('checkItem', { item, i });
    }
  },

}
</script>

<style lang="sass" scoped>
  ul
    list-style-type: none
    padding-left: 0
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

  /*
    List Item Transition Animation
    Doce : https://v3.vuejs.org/guide/transitions-overview.html#class-based-animations-transitions
   */

  /* enter / leave가 동작할 때 */
  .list-enter-active
    transition: all 1s ease

  .list-leave-active
    transition: all 0.6s ease

  .list-enter-from, /* enter 시작점 */
  .list-leave-to    /* leave 종료점 */
    opacity: 0
    transform: translateY(30px)

</style>