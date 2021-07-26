<template>
  <div class="inputBox shadow">
    <input type="text" v-model="newTodoItem" @keyup.enter="addTodo">
    <span class="addContainer" @click="addTodo">
      <i class="fas fa-plus addBtn"></i>
    </span>

    <Modal v-if="showModal" @close="showModal=false">
      <!--
        you can use custom content here to overwrite
        default content
      -->
      <template v-slot:header>
        <!-- 재정의 -->
        <h3>경고!
          <span class="closeModalBtn" @click="showModal=false">
          <i class="fas fa-times"></i>
        </span>
        </h3>
      </template>

      <template v-slot:body>
        <div>문제가 생겼습니다!</div> <!-- 재정의 -->
      </template>

      <template v-slot:footer>
        <h5>확인해주세요</h5> <!-- 재정의 -->
      </template>
    </Modal>
  </div>
</template>

<script>
import Modal from './common/Modal.vue';

export default {
  data() {
    return {
      newTodoItem: "",
      showModal: false
    }
  },
  methods: {
    addTodo() { // 버튼을 클릭하거나 Enter키를 눌렀을 때 동작
      const newTodoItem = this.newTodoItem;

      if (newTodoItem !== '') {
        // 입력한 데이터를 "addTodoItem"이라는 이벤트가 동작하게 되면서
        // newTodoItem이라는 값이 같이 간다.
        this.$emit('addTodo', newTodoItem);
        this.clearInput();
      } else {
        this.showModal = !this.showModal;
      }
    },
    clearInput() {
      this.newTodoItem = "";
    }
  },
  components: {
    Modal: Modal
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

  .closeModalBtn
    color: #42b983
</style>