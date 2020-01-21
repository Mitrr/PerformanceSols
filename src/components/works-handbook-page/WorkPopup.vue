<template>
    <popup @close="$emit('close')" :width="'60%'" :height="'80vh'">
        <template v-slot:inner>
            <card :header="false" style="height: 100%">
                <template v-slot:content>
                    <p style="padding: 20px 0 10px 0; font-size: 1.5rem">Работа</p>
                    <div class="inputs-group inputs-group_row">
                        <input type="text" class="light-text-input" placeholder="Название" style="width: 30%" v-model="work.name">
                        <input type="number" class="light-text-input" placeholder="Цена для клиента" style="width: 30%"
                               v-model="work.price_retail">
                        <input type="number" class="light-text-input" placeholder="Цена для рабочих" style="width: 30%"
                               v-model="work.price_for_workers">
                        <input type="text" class="light-text-input" placeholder="Формула работы" style="width: 48.5%"
                               v-model="work.formula_work"
                        >
                        <input type="text" class="light-text-input" placeholder="Формула материалов" style="width: 48.5%"
                               v-model="work.formula_material"
                        >

<!--                        <div style="width: 49%" class="column-flex">-->
<!--                            <label for="materials" style="padding-bottom: 5px">Единицы измерения:</label>-->

<!--                            <select id="materials" multiple v-model="work.materials" required>-->
<!--                                <option v-for="material in materials" :key="material.id"-->
<!--                                        :value="{coefficient_id: material.coefficient_id, material_id: material.id}"-->
<!--                                >{{material.name}}</option>-->
<!--                            </select>-->
<!--                        </div>-->

                        <div class="column-flex" style="width: 45%;flex-wrap: wrap;justify-content: space-between;">
                            <p>Материалы: </p>
                            <div style="width: 100%;align-items: center" v-for="material in materials" :key="material.id" class="row-flex">
                                <input type="checkbox" :id="material.id"
                                       :value="{coefficient_id: material.coefficient_id+'', material_id: material.id+''}"
                                       v-model="work.materials"
                                       style="height: auto;margin: 0 5px 0 0">
                                <label :for="material.id">{{material.name}}</label>
                            </div>
                        </div>

                        <div class="column-flex" style="width: 45%;flex-wrap: wrap;justify-content: space-between;">
                            <p>Единицы измерения: </p>
                            <div style="width: 100%;align-items: center" v-for="unit in units" :key="unit.id" class="row-flex">
                                <input type="radio" :id="unit.id"
                                       :value="unit.id"
                                       v-model="work.measurement_id"
                                       style="height: auto;margin: 0 5px 0 0">
                                <label :for="unit.id">{{unit.name}}</label>
                            </div>
                        </div>

                        <div class="column-flex" style="width: 45%;flex-wrap: wrap;justify-content: space-between;margin-top: 15px">
                            <p>Входные параметры: </p>
                            <div style="width: 100%;align-items: center" v-for="parameter in parameters" :key="parameter.id" class="row-flex">
                                <input type="checkbox" :id="parameter.id"
                                       :value="parameter.id+''"
                                       v-model="work.income_parameters"
                                       style="height: auto;margin: 0 5px 0 0">
                                <label :for="parameter.id">{{parameter.name}}</label>
                            </div>
                        </div>

                    </div>
                </template>

                <template v-slot:footer>
                    <div class="card-actions">
                        <div class="btn flat" @click.stop="$emit('close')">ЗАКРЫТЬ</div>
                        <div class="btn" @click="saveWork">СОХРАНИТЬ</div>
                    </div>
                </template>
            </card>
        </template>
    </popup>
</template>

<script>
    import axios from 'axios';

    import serialize from "../serializeFunc";

    export default {
        name: "WorkPopup",
        components:{
            Popup: () => import('@/components/ui/Popup'),
        },
        props:{
            section: [String, Number],
            id: [String, Number]
            // item:{
            //     type: Object,
            //     default: {
            //         name: "Монтаж навесного щита",
            //         section_id: 0,
            //         price_retail: "1000.50",
            //         measurement_id: "2",
            //         price_for_workers: "700.50",
            //         materials: [],
            //         formula_work: "",
            //         formula_material: "",
            //         income_parameters: []
            //     }
            // }
        },
        data(){
            return{
                work:{
                    name: "",
                    section_id: 0,
                    price_retail: "",
                    measurement_id: "",
                    price_for_workers: "",
                    materials: [],
                    formula_work: "",
                    formula_material: "",
                    income_parameters: [],
                },
                parameters:[],
                materials: [],
                units: []
            }
        },
        methods:{
            saveWork(){

                let serializedParameters = serialize(this.work.income_parameters);
                let serializedMaterials = serialize(this.work.materials);

                axios.post('http://api.srvrdev.ru/api/works',{
                    ...this.work,
                    section_id: this.section,
                    income_parameters: serializedParameters,
                    materials: serializedMaterials
                });
            }
        },
        mounted() {

            axios.get('http://api.srvrdev.ru/api/income-parameters?no_table=true').then( res => res.data)
                .then(data => this.parameters = data);

            axios.get('http://api.srvrdev.ru/api/materials?section_id=53&no_table=1').then( res => this.materials = res.data);

            axios.get('http://api.srvrdev.ru/api/settings-unit-measurement?no_table=1').then( res => this.units = res.data);
        }
    }
</script>

<style scoped>

</style>
