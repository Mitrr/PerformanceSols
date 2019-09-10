<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <div style="height: 100vh">

    <Popup v-if="addCoeffDialog" v-on:close="closeAddCoeff" :width="'40%'">
        <template v-slot:inner>
            <Card :header="false" style="border-radius: 6px;">
                <template v-slot:content>
                    <div style="padding: 15px 0 20px;">Добавление коэффициента</div>
                    <div class="inputs-group">
<!--                        <input type="text" name="id" placeholder="ID коэффициента..." v-model="coeff.id">-->
                        <input type="text" name="name" placeholder="Название коэффициента..." v-model="coeff.name">
                        <input type="text" name="value" placeholder="Значение коэффициента..." v-model="coeff.value">
                    </div>
                    <div @click="addNewCoeff()">Сохранить</div>
                </template>
            </Card>
        </template>
    </Popup>

        <div style="display:flex;justify-content: space-between">
            <Card style="flex: 1;margin-right: 20px;border-radius: 6px">
                <template v-slot:header>
                    <p style="color: white">Справочник входных параметров</p>
                    <img class="header-img-btn" src="./../../public/add-to-list.png" @click="addCoeffDialog=true">
                </template>

                <template v-slot:content>
                    <!--                    сделать таблицу отдельным компонентом-->
                    <div class="table_wrapper">
                        <div class="table-header">
                            <div style="flex: 1">Код ID</div>
                            <div style="flex: 3">Название</div>
                            <div style="flex: 1">Значение</div>
                        </div>
                        <hr style="opacity: .2;margin-block-end: 0;"/>
                        <div class="table-body">
                            <div class="table-row" v-for="(row,i) in inputParams" :key="i">
                                <div style="flex: 1">{{row.id}}</div>
                                <div style="flex: 3">{{row.name}}</div>
                                <div style="flex: 1">{{row.value}}</div>
                            </div>
                        </div>
                    </div>
                </template>
            </Card>

            <Card style="flex: 1">
                <template v-slot:header>
                    <p style="color: white">Справочник входных параметров</p>
                    <img class="header-img-btn" src="./../../public/add-to-list.png">
                </template>

                <template v-slot:content>
                    <Table :headers="coeffTable.headers" :data="coeffTable.data" @deleteCoeff="deleteCoeff"></Table>
<!--                    <Table :headers="tableData.headers" :data="tableData.data"></Table>-->
                </template>
            </Card>
        </div>

    </div>
</template>

<script>
    import Card from "../components/ui/Card";
    import Popup from '../components/ui/Popup';
    import Table from '../components/ui/Table';
    import {mapActions, mapState} from 'vuex';

    import axios from 'axios';

    export default {
        name: "InputParams",
        components: {
            Card,
            Popup,
            Table
        },
        data(){
            return{
                addCoeffDialog:false,
                inputParams:[
                    {id:1,name:'Коммерческий',value:1.25},
                    {id:1,name:'Премиум',value:1.5},
                ],
                coeff:{
                    // id:'',
                    name:'',
                    value:''
                }
            }
        },
        computed:{
            // tableData(){
            //     window.table = this.$store.state.inputParams.coeffTable;
            //     return this.$store.state.inputParams.coeffTable;
            // }

            ...mapState({
                coeffTable: state => state.inputParams.coeffTable,
            })
        },
        methods:{
            closeAddCoeff(){
                this.addCoeffDialog = false;
            },
            addNewCoeff(){
                this.$store.dispatch('inputParams/addNewCoeff',this.coeff);
                this.addCoeffDialog = false;
            },
            deleteCoeff(id){
                this.$store.dispatch('inputParams/deleteCoeff',id);
            }
        },
        mounted() {
            this.$store.dispatch('inputParams/loadTable',{commitName:'saveCoeffTable'});
        }
    }
</script>

<style scoped>
    .table-header{
        display: flex;
        flex-direction: row;
    }
    .table-row{
        display: flex;
        flex-direction: row;
        padding: 10px 0;
    }
    .table-row:not(:last-child){
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    }
    .header-img-btn{
        width: 32px;
        height: 32px;
        border-radius: 50%;
        padding: 7px;
        cursor: pointer;
    }
    .header-img-btn:hover{
        background-color: rgba(0, 0, 0, 0.1);
        transition: .4s ease-in-out;

    }
    .inputs-group{
        width: 100%;
        display: flex;
        flex-direction: column;
    }
    .inputs-group>input{
        height: 40px;
        font-size: 0.85rem;
        margin-bottom: 10px;
    }

</style>
