import axios from 'axios'

const state = () => ({
    treeData:{},
    materialsTable:{
        data:[],
        headers:[]
    },
});

const mutations = {
    setTreeData(state, payload){
        state.treeData = payload;
    },
    setMaterials(state, payload){
        state.materialsTable.data = payload.data;
        state.materialsTable.headers = payload.headers;
    }
};

const actions = {
    loadTreeData({commit}){
        axios.get('http://api.srvrdev.ru/api/materials-sections',{
            headers:{'Cache-Control':'no-cache'},
            withCredentials:true
        }).then(res => res.data).then(json => commit('setTreeData',json))
    },
    async saveNode({commit}, paylaod){
       let item = await axios.post('http://api.srvrdev.ru/api/materials-sections', paylaod).then(res => res.data);
       return item ? item : false;
    },
    deleteNode({commit}, {id}){
        axios.delete('http://api.srvrdev.ru/api/materials-sections/'+id)
    },
    editNode({commit},{id,name}){
        axios.put('http://api.srvrdev.ru/api/materials-sections/'+id,{id,name})
    },
    // loadMaterials({commit},id){
    //     axios.get(`http://api.srvrdev.ru/api/materials?section_id=${id}`).then( res => commit('setMaterials',res.data));
    // }
};

export default {
    namespaced:true,
    state,
    mutations,
    actions
}
