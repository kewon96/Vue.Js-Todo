import Vuex from "vuex";
import todoApp from './modules/todoApp';

export default new Vuex.Store({
    modules: {
        todoApp
    }
})