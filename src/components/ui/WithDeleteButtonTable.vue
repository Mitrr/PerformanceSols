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

        <div class="table_body_wrapper" style="overflow:auto;height: 100%;">
            <div :class="['table_line', dividers?'':'no-divider']"
                 v-for="(row, j) in data" :key="j" :id="row[0].value"
                 @click="emitEdit(row, j)"
            >
                <div v-for="(cell,i) in row" :key="i"
                     :style="cell.style"
                >
                    <div v-if="cell.type === 'text'">
                        {{cell.value}}
                    </div>
                </div>

                <div class="delete-icon" style="cursor: pointer" @click.stop="$emit('deleteCoeff',row[0].value)">
                    <icon :id="'delete'" :icon="'delete_outline'"></icon>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
    import Table from './Table';

    export default {
        extends:Table,
        name: "WithDeleteButtonTable",
        methods:{
            emitEdit(row, rowID){
                row[0].rowId = rowID;

                this.$emit( 'edit', row)
            }
        }
    }
</script>

<style>
    .delete-icon{
        position: absolute;
        right: 10px;
        top: 10px;
        cursor: pointer;
    }
</style>

