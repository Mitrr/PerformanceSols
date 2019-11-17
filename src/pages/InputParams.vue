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
                        <div style="padding: 15px 0 20px;">Редактирование</div>
                        <div class="inputs-group">
                            {{editData}}
                            <br/>
                            <input type="text" name="name" placeholder="Название коэффициента..." v-model="editData.name">

                            <input v-if="mode === 'coeff'" type="text" name="value" placeholder="Значение коэффициента..." v-model="editData.value">

                            <div v-else-if="mode === 'param'">
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
                    <p class="card-title">Справочник входных параметров</p>
                    <img class="header-img-btn" src="./../../public/add-to-list.png"
                    @click="openAddPopup('param')">
                </template>

                <template v-slot:content>
                    <Table :headers="paramsTable.headers" :data="paramsTable.data" @deleteCoeff="deleteParam"
                           @edit="editCoeffHandler($event,'param')"
                    ></Table>
                </template>
            </Card>

            <Card style="flex: 1;border-radius: 6px">
                <template v-slot:header>
                    <p class="card-title">Справочник коэффициентов</p>
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
        <div style="margin-top: 20px;width: 100%;display: flex">
            <Card style="width: 50%;border-radius: 6px">
                <template v-slot:header>
                    <p class="card-title">Единицы измерения</p>
                    <img class="header-img-btn" src="./../../public/add-to-list.png"
                         @click="openAddPopup('unit')">
                </template>
                <template v-slot:content>
                    <Table :headers="unitsTable.headers" :data="unitsTable.data" @deleteCoeff="deleteUnit"
                    @edit="editUnit($event,'unit')">
                    </Table>
                </template>
            </Card>
        </div>

    </div>
</template>

<script>
    let Popup = () => import('../components/ui/Popup');
    import Table from '../components/ui/WithDeleteButtonTable';
    import {mapActions, mapState} from 'vuex';

    export default {
        name: "InputParams",
        components: {
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
            ...mapState({
                coeffTable: state => state.inputParams.coeffTable,
                paramsTable: state => state.inputParams.paramsTable,
                unitsTable: state => state.inputParams.unitsTable,
            }),

        },
        methods:{
            closeAddCoeff(){
                this.addCoeffDialog = false;
            },
            addNew(mode){
                let [val,commit] = mode ==='coeff'? [this.coeff,'addNewCoeff'] :
                                   mode ==='param'? [this.param,'addNewParam'] : [this.unit,'addNewUnit'];

                this.$store.dispatch(`inputParams/${commit}`,val);
                this.addCoeffDialog = false;

            },
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
                console.log(mode);

                const modeHandler = {
                    "coeff": () => {
                        this.$store.dispatch('inputParams/editCoeff',this.editData).then( () => this.editPopup = false);
                    },
                    "param": () => {
                        this.$store.dispatch('inputParams/editParam',this.editData).then( () => this.editPopup = false);
                    },
                    "unit":() => {
                        this.$store.dispatch('inputParams/editUnit',this.editData).then( () => this.editPopup = false);
                    }
                };

                modeHandler[mode]();

                // if (mode === 'coeff'){
                //     this.$store.dispatch('inputParams/editCoeff',this.editData).then( () => this.editPopup = false);
                // } else if (mode === 'param'){
                //     this.$store.dispatch('inputParams/editParam',this.editData).then( () => this.editPopup = false);
                // } else if (mode === 'unit'){
                //     this.$store.dispatch('inputParams/editUnit',this.editData).then( () => this.editPopup = false);
                // }

            },

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
        background-color: rgba(0, 0, 0, 0.1);
    }
    .header-img-btn:hover{
        background-color: rgba(0, 0, 0, 0.26);
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
