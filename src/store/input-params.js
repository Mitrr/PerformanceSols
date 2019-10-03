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
        axios.post('http://api.srvrdev.ru/api/setting-coefficient',{
            name:name,value:value
        }).then(() => context.dispatch('loadTable',{
            commitName:'saveCoeffTable',
            url:'http://api.srvrdev.ru/api/setting-coefficient'
        }));
   },
    deleteCoeff(context,id){
       axios.delete('http://api.srvrdev.ru/api/setting-coefficient/'+id).then(() => {
           context.dispatch('loadTable',{
               commitName:'saveCoeffTable',
               url:'http://api.srvrdev.ru/api/setting-coefficient'})
       });
    },
    editCoeff(context,coeff){
       axios.put('http://api.srvrdev.ru/api/setting-coefficient/'+coeff.id,coeff).then( () => {
           context.dispatch('loadTable',{
               commitName:'saveCoeffTable',
               url:'http://api.srvrdev.ru/api/setting-coefficient'
           })
       })
    },
    deleteParam(context,id){
       axios.delete('http://api.srvrdev.ru/api/income-parameters/'+id).then( () => {
           context.dispatch('loadTable',{
               commitName:'saveParamsTable',
               url:'http://api.srvrdev.ru/api/income-parameters'
           })
       })
    },
    addNewParam(context,{unit_id,name}){
       axios.post('http://api.srvrdev.ru/api/income-parameters',{unit_id:unit_id,name:name}).then(() => context.dispatch('loadTable',{
           commitName:'saveParamsTable',
           url:'http://api.srvrdev.ru/api/income-parameters'
       }));
    },
    editParam(context,{value,id,name}){
       axios.put('http://api.srvrdev.ru/api/income-parameters/'+id,{unit_id:value,id:id,name:name})
           .then(() => {
              context.dispatch('loadTable',{
                  commitNmae:'saveParamsTable',
                  url:'http://api.srvrdev.ru/api/income-parameters'
              })
           });
    },
    addNewUnit(context,{name}){
        axios.post('http://api.srvrdev.ru/api/settings-unit-measurement',{name:name})
            .then(() => context.dispatch('loadTable',{
            commitName:'saveUnitsTable',
            url:'http://api.srvrdev.ru/api/settings-unit-measurement'
        }));
    },
    deleteUnit(context,id){
       axios.delete('http://api.srvrdev.ru/api/settings-unit-measurement/'+id).then(() => context.dispatch('loadTable',{
           commitName:'saveUnitsTable',
           url:'http://api.srvrdev.ru/api/settings-unit-measurement'
       }));
    },
    editUnit(context,{id,name}){
       axios.put('http://api.srvrdev.ru/api/settings-unit-measurement/'+id,{id:id,name:name})
           .then(() => {
               context.dispatch('loadTable',{
               commitName:'saveUnitsTable',
               url:'http://api.srvrdev.ru/api/settings-unit-measurement'
               });

                   context.dispatch('loadTable',{
                       commitName:'saveParamsTable',
                       url:'http://api.srvrdev.ru/api/income-parameters'
                   })
           });
    },


   async loadTable(context,{url,commitName}){
        const cellsWidth = {
            "text": null,
            "list":null
        };

        const cellHandler = {

            "text": function (cell) {
                return cell;
            },

            "list":function (cell) {
                return cell;
            }

        };

        var handleRow = (column, item) => {

            var value = item[column.data_key] || '',
                type = column.type,
                // width = cellsWidth[type],
                style = item[column.data_key_style] || '',

                cell = { value, type, style };

            return handleCell(cell);

        };


        var handleCell = function (cell) {
            return cellHandler[cell.type] ? cellHandler[cell.type](cell) : undefined;
        };

        var handleColumn = function (column) {
            return {
                name: column.name,
                // width: cellsWidth[column.type],
                style: column.header_style,
                type: column.type,
            }
        };

       let data = [];
       let headers = [];

       await axios.get(url,{
           headers:{'Cache-Control':'no-cache'},
           withCredentials:true
       }).then(res => res.data)
           .then(json => { data=json.data; headers=json.meta.table_props });


        var resultData = [],
            resultHeaders = [];


        data.forEach(item => {
            var row = [];

            headers.forEach(column => {
                var cell = handleRow(column, item);

                if (cell)
                    row.push(cell);
            })
            resultData.push(row);
        })

        resultHeaders = headers.map(handleColumn);

        context.commit(commitName, { data: resultData, headers: resultHeaders});
    }

};
export default {
    namespaced:true,
    state,
    mutations,
    actions
}
