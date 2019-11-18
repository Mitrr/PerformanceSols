import axios from 'axios';

const state = () => ({
    coeffTable:{
        headers:[],
        data:[]
    },
    paramsTable:{
        headers:[],
        data:[]
    },
    unitsTable:{
        headers:[],
        data:[]
    }
});
const mutations = {
    saveCoeffTable(state,payload){
        state.coeffTable.data = payload.data;
        state.coeffTable.headers = payload.headers;
    },
    addCoeff(state,paylaod){
        state.coeffTable.data.push(paylaod);
    },
    saveParamsTable(state,payload){
        state.paramsTable.data = payload.data;
        state.paramsTable.headers = payload.headers;
    },
    saveUnitsTable(state,payload){
        state.unitsTable.headers = payload.headers;
        state.unitsTable.data = payload.data;
    }
};
const actions = {
   addNewCoeff(context,{name,value}){
        axios.post('http://api.srvrdev.ru/api/setting-coefficient',{name,value})
            .then(() => context.dispatch('loadTable',{
            commitName:'inputParams/saveCoeffTable',
            url:'http://api.srvrdev.ru/api/setting-coefficient'
        },{root:true}));
   },
    deleteCoeff(context,id){
       axios.delete('http://api.srvrdev.ru/api/setting-coefficient/'+id).then(() => {
           context.dispatch('loadTable',{
               commitName:'inputParams/saveCoeffTable',
               url:'http://api.srvrdev.ru/api/setting-coefficient'
           },{root:true})
       });
    },
    editCoeff(context,coeff){
       axios.put('http://api.srvrdev.ru/api/setting-coefficient/'+coeff.id,coeff).then( () => {
           context.dispatch('loadTable',{
               commitName:'inputParams/saveCoeffTable',
               url:'http://api.srvrdev.ru/api/setting-coefficient'
           },{root:true})
       })
    },
    deleteParam(context,id){
       axios.delete('http://api.srvrdev.ru/api/income-parameters/'+id).then( () => {
           context.dispatch('loadTable',{
               commitName:'saveParamsTable',
               url:'http://api.srvrdev.ru/api/income-parameters'
           },{root:true})
       })
    },
    addNewParam(context,{unit_id,name}){
       axios.post('http://api.srvrdev.ru/api/income-parameters',{unit_id:unit_id,name:name})
           .then(() => context.dispatch('loadTable',{
           commitName:'inputParams/saveParamsTable',
           url:'http://api.srvrdev.ru/api/income-parameters'
       },{root:true}));
    },
    editParam(context,{value,id,name}){
       axios.put('http://api.srvrdev.ru/api/income-parameters/'+id,{unit_id:value,id,name})
           .then( () => {
              context.dispatch('loadTable',{
                  commitName:'inputParams/saveParamsTable',
                  url:'http://api.srvrdev.ru/api/income-parameters'
              },{root:true})
           });
    },
    addNewUnit(context,{name}){
        axios.post('http://api.srvrdev.ru/api/settings-unit-measurement',{name:name})
            .then(() => context.dispatch('loadTable',{
            commitName:'inputParams/saveUnitsTable',
            url:'http://api.srvrdev.ru/api/settings-unit-measurement'
        }, {root:true}));
    },
    deleteUnit(context,id){
       axios.delete('http://api.srvrdev.ru/api/settings-unit-measurement/'+id).then(() => context.dispatch('loadTable',{
           commitName:'inputParams/saveUnitsTable',
           url:'http://api.srvrdev.ru/api/settings-unit-measurement'
       }, {root:true} ));
    },
    editUnit(context,{id,name}){
       axios.put('http://api.srvrdev.ru/api/settings-unit-measurement/'+id,{id:id,name:name})
           .then(() => {
                   context.dispatch('loadTable',{
                   commitName:'inputParams/saveUnitsTable',
                   url:'http://api.srvrdev.ru/api/settings-unit-measurement'
                   },{root:true});

                   context.dispatch('loadTable',{
                       commitName:'inputParams/saveParamsTable',
                       url:'http://api.srvrdev.ru/api/income-parameters'
                   }, {root:true})
           });
    },
};
export default {
    namespaced:true,
    state,
    mutations,
    actions
}
