<template>
    <div class="table_wrapper">
        <div class="table_header" :style="{color:headersColor}">
            <div class="table_header_item"
                 v-for="(column,i) in headers" :key="i"
                 :style="column.style"
            >
                <span style="width: 100%;display: block;white-space: nowrap" >{{column.name}}</span>
            </div>
        </div>

<!--        <div class="header-divider"></div>-->
        <div class="table_body_wrapper" style="overflow:auto;height: 100%;">
            <div :class="['table_line',dividers?'':'no-divider']"
                 v-for="(row,j) in data" :key="j" :id="row[0].value"
                 @click="$emit('edit',row)"
            >
                <div v-for="(cell,i) in row" :key="i"
                    :style="cell.style"
                >
                    {{cell.value}}
                </div>

                <div id="delete" @click.stop="$emit('deleteCoeff',row[0].value)">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zm2.46-7.12l1.41-1.41L12 12.59l2.12-2.12 1.41 1.41L13.41 14l2.12 2.12-1.41 1.41L12 15.41l-2.12 2.12-1.41-1.41L10.59 14l-2.13-2.12zM15.5 4l-1-1h-5l-1 1H5v2h14V4z"/><path fill="none" d="M0 0h24v24H0z"/></svg>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Table",
        props:{
            headers:Array,
            data:Array,
            headersColor:{
              type:String,
              default:'grey'
            },
            dividers:{
                type:Boolean,
                default: true
            },
            mode:{
                type:String,
                default:'kpi',
                required:false
            },
            dataUrl: {
                type:String,
                required:false
            },
            headersUrl: {
                type:String,
                required:false
            }
        },
        methods:{
        }
    }
</script>

<style scoped>
    .table_wrapper{
        overflow: hidden;
        height: 100%;
    }
    .table_header{
        display: flex;
        justify-content: flex-start;
        flex-direction: row;
        padding: 0 5px;
        padding-bottom: 5px;
    }
    .table_header_item{
        font-size: 0.9rem;
        /*color: grey;*/
        font-weight: 400;
    }
    .table_header_item:nth-child(n+3){
        text-align: right;
    }
    .header-divider{
        width: 100%;
        height: 2px;
        background-color: rgb(228,228,228);
        margin-bottom: 10px;
    }
    .table_line_block{
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
    }
    .table_line{
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 15px 5px;
        border-top: 1px solid rgb(238,238,238);
        cursor: pointer;
        border-radius: 4px;
        position: relative;
    }
    .table_line:hover{
        background: #f5f5f5!important;
    }
    .no-divider{
        border-top: none;
    }
    .place{
        font-size: 37px;
        opacity: .7;
        font-weight: 400;
    }
    .table_line>div{
        text-align: right;
    }
    #delete{
        position: absolute;
        right: 10px;
        top: 10px;
        cursor: pointer;
    }
    .line_block_main_item{
        font-size: 20px;
        color: rgb(124,124,124);
    }
</style>
