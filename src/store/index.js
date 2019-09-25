import Vue from 'vue'
import Vuex from 'vuex'
import inputParams from './input-params';
import worksHandbook from './works-handbook'
Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        inputParams,
        worksHandbook
    },
    state:{
        a:100,
        b:200,
        c:300
    },
    actions:{

    }
})
