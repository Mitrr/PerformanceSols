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
                     :data-velue="cell.value"
                >
                    {{cell.value}}
                </div>

<!--                все это ради этих 3 строчек -->
                <div id="delete" style="cursor: pointer" @click.stop="$emit('deleteCoeff',row[0].value)">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zm2.46-7.12l1.41-1.41L12 12.59l2.12-2.12 1.41 1.41L13.41 14l2.12 2.12-1.41 1.41L12 15.41l-2.12 2.12-1.41-1.41L10.59 14l-2.13-2.12zM15.5 4l-1-1h-5l-1 1H5v2h14V4z"/><path fill="none" d="M0 0h24v24H0z"/></svg>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
    import Table from './Table';

    export default {
        extends:Table,
        name: "WithDeleteButtonTable"
    }
</script>

<style>
    #delete{
        position: absolute;
        right: 10px;
        top: 10px;
        cursor: pointer;
    }
</style>

