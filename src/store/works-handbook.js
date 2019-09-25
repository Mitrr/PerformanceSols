import axios from 'axios'

const state = () => ({
    treeData:{}
});

const mutations = {
    setTreeData(state,payload){
        state.treeData = payload;
    }
};

const actions = {
    loadTreeData({commit}){
        axios.get('http://api.srvrdev.ru/api/materials-sections',{
            headers:{'Cache-Control':'no-cache'},
            withCredentials:true
        }).then(res => res.data).then(json => commit('setTreeData',json))
    }
};

export default {
    namespaced:true,
    state,
    mutations,
    actions
}
