import axios from 'axios';

const state = () => ({
    coeffTable:{
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
    }

};
const actions = {
   addNewCoeff(context,{name,value}){
        axios.post('http://api.srvrdev.ru/api/setting-coefficient',{
            name:name,value:value
        }).then(() => context.dispatch('loadTable',{commitName:'saveCoeffTable'}));
   },
    deleteCoeff({commit},id){
       axios.delete('http://api.srvrdev.ru/api/setting-coefficient/'+id).then(res=>console.log(res));
    },

   async loadTable(context,{commitName}){
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
                val_style = item[column.data_key_style] || '',

                cell = { value, type, val_style };

            return handleCell(cell);

        };


        var handleCell = function (cell) {
            return cellHandler[cell.type] ? cellHandler[cell.type](cell) : undefined;
        };

        var handleColumn = function (column) {
            return {
                name: column.name,
                // width: cellsWidth[column.type],
                // style: column.style_header,
                type: column.type,
            }
        };

       let data = [];
       let headers = [];

       await axios.get('http://api.srvrdev.ru/api/setting-coefficient',{
           headers:{'Cache-Control':'no-cache'},
           withCredentials:true
       }).then(res=>res.data)
           .then(json => {data=json.data;headers=json.meta.table_props});


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
