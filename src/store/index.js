import Vue from 'vue'
import Vuex from 'vuex'
import inputParams from './input-params';
Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        inputParams
    },
    state:{
        a:100,
        b:200,
        c:300
    },
    actions:{

    }
})
