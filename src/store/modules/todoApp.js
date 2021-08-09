const storage = {
    fetch() {
        const arr = [];

        // Vue 인스턴스가 생성되자마자 동작
        if(localStorage.length > 0) {
            for (let i = 0; i < localStorage.length; i++) {
                arr.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
            }
        }

        return arr;
    }
};

const state = {
    headerText: 'Todo!',
        todoItems: storage.fetch()
};

const getters = {
    getTodoItems(state) {
        return state.todoItems;
    }
};

const mutations = {
    addItem(state, todoItem) {
        // TodoInput 컴포넌트에서 동작한 addTodoItem이벤트로 인해
        // "addTodoItem"라는 함수가 작동
        const obj = {
            completed: false, // 완료여부(생성시엔 기본 false)
            item: todoItem // 전달받은 Item
        };

        localStorage.setItem(todoItem, JSON.stringify(obj));
        state.todoItems.push(obj);
    },

    removeItem(state, payload) {
        const i = payload.index;
        const item = payload.todoItem;

        // 지울 때 localStorage하고 todoItems 양쪽 다 삭제해야한다.
        // 받아올 때 Proxy로 받아와지기 때문에 key값을 가지고 지워줘야한다.
        localStorage.removeItem(item.item);
        state.todoItems.splice(i, 1);
    },

    checkItem(state, payload) {
        const i = payload.index;
        const item = payload.todoItem;

        // TodoList에서 넘겨받은 item이 아니라 여기에 있는 todoItems의 데이터를 수정
        state.todoItems[i].completed = !state.todoItems[i].completed;
        // localStorage data update : removeItem -> setItem
        localStorage.removeItem(item.item);
        localStorage.setItem(item.item, JSON.stringify(item));
    },

    clearAllItem(state) {
        localStorage.clear();
        state.todoItems.splice(0, state.todoItems.length);
    }
}

export default {
    state,
    getters,
    mutations
}