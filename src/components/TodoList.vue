<template>
  <div>
    <ul>
      <li v-for="( todoItem, index ) in todoItems" v-bind:key="todoItem" class="shadow">
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
  data() {
    return {
      todoItems: []
    }
  },
  methods: {
    removeTodo(item, i) {
      // 지울 때 localStorage하고 todoItems 양쪽 다 삭제해야한다.
      localStorage.removeItem(item);
      this.todoItems.splice(i, 1);

    },
    checkItem(item, i) {
      item.completed = !item.completed;

      // localStorage data update : removeItem -> setItem
      localStorage.removeItem(item.item);
      localStorage.setItem(item.item, JSON.stringify(item));
    }
  },
  created() {
    // 인스턴스가 생성되자마자 생성
    if(localStorage.length > 0) {
      for (let i = 0; i < localStorage.length; i++) {
        this.todoItems.push(JSON.parse(localStorage.getItem(localStorage.key(i))));

        // this.todoItems.push(localStorage.key(i));
      }
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