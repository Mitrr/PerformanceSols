<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <div style="min-height: 100vh">
        <Card style="border-radius: 6px">
            <template v-slot:header>
                <div style="color: white">Список</div>
            </template>
            <template v-slot:content>
                <Table :headers="tableData.headers" :data="tableData.data" :headers-color="'#39a9f4'"></Table>
            </template>
        </Card>
    </div>
</template>

<script>
    import Card from '../components/ui/Card';
    import Table from '../components/ui/Table';

    export default {
        name: "AddWork",
        components:{Card,Table},
        data(){
            return{
                headers:[
                    {
                        name:'ID',
                        style:'width:30%;text-align:left'
                    },
                    {
                        name:'Значение',
                        style:'width:70%;text-align:left'
                    },
                ],
                data:[
                    [
                        {
                            value:'113',
                            style:'width:30%;text-align:left'
                        },
                        {
                            value:'Говно',
                            style:'width:70%;text-align:left'
                        }
                    ],
                    [
                        {
                            value:'113',
                            style:'width:30%;text-align:left'
                        },
                        {
                            value:'Говно',
                            style:'width:70%;text-align:left'
                        }
                    ],
                    [
                        {
                            value:'113',
                            style:'width:30%;text-align:left'
                        },
                        {
                            value:'Говно',
                            style:'width:70%;text-align:left'
                        }
                    ]
                ]
            }
        },
        computed:{
            tableData(){
                return this.$store.state.inputParams.coeffTable;
            }
        },
        mounted() {
            this.$store.dispatch('inputParams/loadTable',{commitName:'saveCoeffTable'});
        }
    }
</script>

<style scoped>

</style>
