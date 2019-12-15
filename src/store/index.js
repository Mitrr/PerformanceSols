import Vue from 'vue'
import Vuex from 'vuex'
import inputParams from './input-params'
import worksHandbook from './works-handbook'
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        inputParams,
        worksHandbook
    },
    state:{},
    actions:{
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
                },

                "hidden": function (cell) {
                    return cell;
                }

            };

            var handleRow = (column, item) => {

                var value = item[column.data_key] || '',
                    type = column.type,
                    // width = cellsWidth[type],
                    style = item[column.data_key_style] || '',
                    description = column.data_key || '',

                    cell = { value, type, style, description };

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
        },
        showAlert(context, message = 'Вы уверены?'){
             return confirm(message);
        }
    }
})
