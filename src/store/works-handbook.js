import axios from 'axios'

const state = () => ({
    treeData: [],
    materialsTable: {
        data: [],
        headers: []
    },
    units: [],
    coeffs: [],
});

const mutations = {
    setTreeData(state, payload){
        state.treeData = payload;
    },
    setMaterials(state, payload){
        state.materialsTable.data = payload.data;
        state.materialsTable.headers = payload.headers;
    },
    pushToTreeData(state, paylaod){
        state.treeData.push(paylaod);
    },
    setUnits(state, payload){
        state.units = payload;
    },
    setCoeffs(state, payload){
        state.coeffs = payload;
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
       if (item.parent_id === null){
           commit('pushToTreeData',item);
       } else {
           return item ? item : false;
       }

    },
    deleteNode(context, {id}){
        axios.delete('http://api.srvrdev.ru/api/materials-sections/'+id)
    },
    editNode(context,{id,name}){
        axios.put('http://api.srvrdev.ru/api/materials-sections/'+id,{id,name})
    },
    editMaterial({commit},payload){
        commit('setMaterialItem',payload);
        //axios.put(`http://api.srvrdev.ru/api/materials?section_id=${payload.id}`, payload);
    },
    createMaterial(context,payload){
        axios.post('http://api.srvrdev.ru/api/materials', payload);
    },
    loadUnitsList({commit}){
        axios.get('http://api.srvrdev.ru/api/settings-unit-measurement?no_table=true').then(res => res.data)
            .then( data => commit('setUnits', data) );
    },
    loadCoeffsList({commit}){
        axios.get('http://api.srvrdev.ru/api/setting-coefficient?no_table=true').then( res => res.data )
            .then( data => commit('setCoeffs', data) )
    }
};

export default {
    namespaced:true,
    state,
    mutations,
    actions
}
