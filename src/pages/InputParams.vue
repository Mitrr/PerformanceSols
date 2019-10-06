<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <div style="height: 100vh">

    <Popup v-if="addCoeffDialog" v-on:close="closeAddCoeff" :width="'40%'">
        <template v-slot:inner>
            <Card :header="false" style="border-radius: 6px;">
                <template v-slot:content>
                    <div style="padding: 15px 0 20px;">Добавление
                        {{activeAddPopupMode==='coeff'?'коэффициента':
                            activeAddPopupMode==='param'?'параметра':'единицы измерения'}}</div>
                    <div class="inputs-group">
<!--                        <input type="text" name="id" placeholder="ID коэффициента..." v-model="coeff.id">-->
                        <input v-if="activeAddPopupMode==='coeff'" type="text" name="name" placeholder="Название коэффициента..." v-model="coeff.name">
                        <input v-else-if="activeAddPopupMode==='param'" type="text" name="name" placeholder="Название параметра..." v-model="param.name">
                        <input v-else type="text" name="name" placeholder="Единица измерения..." v-model="unit.name">

                        <input v-if="activeAddPopupMode==='coeff'" type="text" name="value" placeholder="Значение коэффициента..." v-model="coeff.value">


                        <label v-if="activeAddPopupMode==='param'" for="units" style="padding-bottom: 5px">Единицы измерения:</label>
                        <select id="units" v-model="param.unit_id" v-if="activeAddPopupMode==='param'">
                            <option value="">--Выберите единицы измерения--</option>
                            <option v-for="(unit,i) in unitsTable.data" :key="i" :value="unit[0].value">{{unit[1].value}}</option>
                        </select>

                    </div>
                    <div @click="addNew(activeAddPopupMode)" class="btn" style="margin-top: 20px">Сохранить</div>
<!--                    <div v-else @click="addNewParam()" class="btn" style="margin-top: 20px">Сохранить</div>-->
                </template>
            </Card>
        </template>
    </Popup>


        <popup v-if="editPopup" v-on:close="editPopup=false" :width="'50%'">
            <template v-slot:inner>
                <Card :header="false" style="border-radius: 6px;">
                    <template v-slot:content>
                        <div style="padding: 15px 0 20px;">Редактирование коэффициента</div>
                        <div class="inputs-group">
                            {{editData}}
                            <br/>
                            <input type="text" name="name" placeholder="Название коэффициента..." v-model="editData.name">
                            <input v-if="mode==='coeff'" type="text" name="value" placeholder="Значение коэффициента..." v-model="editData.value">

                            <div v-else-if="mode==='param'">
                                <label for="Punits" style="padding-bottom: 5px">Единица измерения:</label>
                                <select id="Punits" v-model="editData.value">
                                    <option value="">--Выберите единицы измерения--</option>
                                    <option v-for="(unit,i) in unitsTable.data" :key="i" :value="unit[0].value">{{unit[1].value}}</option>
                                </select>
                            </div>

                        </div>
                        <div @click="editCoeff(mode)" class="btn" style="margin-top: 20px">Сохранить</div>
                    </template>
                </Card>
            </template>
        </popup>

        <div style="display:flex;justify-content: space-between">
            <Card style="flex: 1;margin-right: 20px;border-radius: 6px">
                <template v-slot:header>
                    <p style="color: rgba(0,0,0,0.6);font-size: 0.9rem;font-weight: 600">Справочник входных параметров</p>
                    <img class="header-img-btn" src="./../../public/add-to-list.png"
                    @click="openAddPopup('param')">
                </template>

                <template v-slot:content>
                    <Table :headers="paramsTable.headers" :data="paramsTable.data" @deleteCoeff="deleteParam"
                           @edit="editCoeffHandler($event,'param')"
                    ></Table>
                </template>
            </Card>

            <Card style="flex: 1">
                <template v-slot:header>
                    <p style="color: white">Справочник коэффициентов</p>
                    <img class="header-img-btn" src="./../../public/add-to-list.png"
                         @click="openAddPopup('coeff')">
                </template>

                <template v-slot:content>
                    <Table :headers="coeffTable.headers" :data="coeffTable.data" @deleteCoeff="deleteCoeff"
                    @edit="editCoeffHandler($event,'coeff')"
                    ></Table>
                </template>
            </Card>
        </div>
        <div style="margin-top: 40px;width: 100%;display: flex">
            <Card style="width: 50%">
                <template v-slot:header>
                    <p style="color: white">Единицы измерения</p>
                    <img class="header-img-btn" src="./../../public/add-to-list.png"
                         @click="openAddPopup('unit')">
                </template>
                <template v-slot:content>
                    <Table :headers="unitsTable.headers" :data="unitsTable.data" @deleteCoeff="deleteUnit"
                    @edit="editUnit($event,'unit')">

                    </Table>
                </template>
            </Card>
<!--            <div style="display: flex;flex-direction: row;height: 50px;background-color: #f3f3f3;border-radius: 30px;border: 1px solid #cbcbcb;align-items: center"-->
<!--                :style="{width:units.length*100+'px'}"-->
<!--            >-->
<!--                <div class="unit-tab" v-for="unit in units" :key="unit.id">-->
<!--                    <span style="display: block;width: 100%">{{unit.value}}</span>-->
<!--                </div>-->
<!--            </div>-->
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
                editPopup:false,
                addCoeffDialog:false,
                editData:{
                    id:'',
                    value:'',
                    name:'',
                },
                coeff:{
                    name:'',
                    value:''
                },
                param:{
                    name:'',
                    unit_id:''
                },
                unit:{
                    name:''
                },
                mode:'',
                activeAddPopupMode:'param',//param or coeff or units
            }
        },
        computed:{
            // tableData(){
            //     window.table = this.$store.state.inputParams.coeffTable;
            //     return this.$store.state.inputParams.coeffTable;
            // }

            ...mapState({
                coeffTable: state => state.inputParams.coeffTable,
                paramsTable: state => state.inputParams.paramsTable,
                unitsTable: state => state.inputParams.unitsTable,
            })
        },
        methods:{
            closeAddCoeff(){
                this.addCoeffDialog = false;
            },
            addNew(mode){
                let [val,commit] = mode ==='coeff'?[this.coeff,'addNewCoeff'] :
                                   mode ==='param'? [this.param,'addNewParam'] : [this.unit,'addNewUnit'];

                this.$store.dispatch(`inputParams/${commit}`,val);
                this.addCoeffDialog = false;

            },
            // deleteCoeff(id){
            //     this.$store.dispatch('inputParams/deleteCoeff',id);
            // },
            editCoeffHandler(row,mode){
                this.editData.id = row[0].value;
                this.editData.name = row[1].value;
                this.editData.value = row[2].value;
                this.mode = mode;
                this.editPopup = true;
            },
            editUnit(row,mode){
                this.editData.id = row[0].value;
                this.editData.name = row[1].value;
                this.mode = mode;
                this.editPopup = true;
            },
            editCoeff(mode){
                if (mode === 'coeff'){
                    this.$store.dispatch('inputParams/editCoeff',this.editData).then( () => this.editPopup = false);
                } else if (mode === 'param'){
                    this.$store.dispatch('inputParams/editParam',this.editData).then( () => this.editPopup = false);
                } else if (mode === 'unit'){
                    this.$store.dispatch('inputParams/editUnit',this.editData).then( () => this.editPopup = false);
                }

            },
            // deleteParam(id){
            //     this.$store.dispatch('inputParams/deleteParam',id)
            // },

            ...mapActions('inputParams',[
                'deleteUnit',
                'deleteParam',
                'deleteCoeff',
            ]),

            openAddPopup(mode){
                this.activeAddPopupMode = mode;
                this.addCoeffDialog=true;
            },
        },
        mounted() {
            this.$store.dispatch('inputParams/loadTable',
                {url:'http://api.srvrdev.ru/api/setting-coefficient',commitName:'saveCoeffTable'});

            this.$store.dispatch('inputParams/loadTable',
                {url:'http://api.srvrdev.ru/api/income-parameters',commitName:'saveParamsTable'});

            this.$store.dispatch('inputParams/loadTable',
                {url:'http://api.srvrdev.ru/api/settings-unit-measurement',commitName:'saveUnitsTable'});
        }
    }
</script>

<style scoped>
    .btn{
        padding: 10px 15px;
        background-color: #dddddd;
        border-radius: 4px;
        cursor: pointer;
        width: fit-content;
    }
    .unit-tab{
        flex: 1;
        height: 100%;
        text-align: center;
        display: flex;
        align-items: center;
        min-width: 100px;
    }
    .unit-tab:not(:last-child){
        border-right: 1px solid #cbcbcb;
    }
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
