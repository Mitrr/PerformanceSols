<template>
    <popup @close="$emit('close')" :width="'60%'" :height="'80vh'">
        <template v-slot:inner>
            <card :header="false" style="height: 100%;overflow-y: auto">
                <template v-slot:content>
                    <p class="popup-title">Работа</p>
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

                        <div class="row-flex" style="width: 100%;justify-content: space-between">
                            <div class="column-flex" style="width: 47.5%;flex-wrap: wrap;justify-content: space-between;">
                                <p>Материалы: </p>
                                <div style="width: 100%;align-items: center" v-for="material in materials" :key="material.id"
                                     class="row-flex">
                                    <input type="checkbox" :id="material.id"
                                           :value="material"
                                           v-model="selectedMaterials"
                                           style="height: auto;margin: 0 5px 0 0">
                                    <label :for="material.id">{{material.name}}</label>
                                </div>
                            </div>

                            <div class="vertical-divider"></div>

                            <div class="column-flex" style="width: 47.5%;flex-wrap: wrap;justify-content: space-between;">
                                <p>Коэффициенты: </p>
                                <div style="width: 100%;align-items: center" v-for="coeff in coeffs" :key="coeff.id" class="row-flex">
                                    <input type="radio" :id="coeff.id"
                                           :value="coeff"
                                           v-model="selectedCoeff"
                                           style="height: auto;margin: 0 5px 0 0">
                                    <label :for="coeff.id">{{coeff.name}}</label>
                                </div>
                            </div>

                        </div>

                        <div class="column-flex full-width" style="margin: 10px 0;">
                            <div class="center-block btn btn-small" @click="linkMaterialNCoeff">СВЯЗАТЬ МАТЕРИАЛ</div>
                        </div>

                        <div class="column-flex full-width" style="margin: 10px 0 20px 0">
                            <p>Связанные материалы и коэффициенты: </p>
                            <div class="full-width column-flex" v-if="work.materials.length>0">
                                <div v-for="(material,i) in work.materials" :key="material.id"
                                     class="row-flex justify-between coeff-material-link"
                                     style="width: 80%">
                                    <div>{{material.material_name}} - {{material.coeff_name}}</div>
                                    <div v-if="mode==='edit'"
                                         class="delete-cross" @click="breakMaterialLink(i)">х</div>
                                </div>
                            </div>
                            <div v-else>Нет связей</div>
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

    export default {
        name: "WorkPopup",
        components:{
            Popup: () => import('@/components/ui/Popup'),
        },
        props:{
            section: [String, Number],
            itemId: {
                type: [String, Number],
                default: null
            },
            mode:{
                type: String,
                default:'create' //create,edit
            }
        },
        data(){
            return{
                work:{
                    id:null,
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

                selectedMaterials:[],
                selectedCoeff: null,

                parameters:[],
                materials: [],
                units: [],
                coeffs: [],
            }
        },
        methods:{
            saveWork(){
                this.work.section_id = this.section;

                let vm = this;

                if (this.mode === 'edit'){
                    this.$store.dispatch('worksHandbook/editWork', {
                        ...this.work,
                        materials: JSON.stringify(vm.work.materials),
                        income_parameters: JSON.stringify(vm.work.income_parameters)
                    });
                }else {
                    axios.post('http://api.srvrdev.ru/api/works',{
                        ...this.work,
                        materials: JSON.stringify(vm.work.materials),
                        section_id: vm.section,
                        income_parameters: JSON.stringify(vm.work.income_parameters)
                    });
                }

                this.$emit('close')
            },

            linkMaterialNCoeff(){
                if (this.selectedCoeff !== null && this.selectedMaterials.length > 0){
                    let newCup = this.selectedMaterials.map( el => {
                        return {
                            material_id: el.id,
                            coefficient_id: this.selectedCoeff.id,
                            material_name: el.name,
                            coeff_name: this.selectedCoeff.name
                        };
                    });
                    this.work.materials = this.work.materials.concat(newCup);

                    this.selectedMaterials = [];
                    this.selectedCoeff = null;
                } else{
                    alert('Сначала выберите материалы и коэффициент')
                }
            },
            breakMaterialLink(index){
                this.work.materials.splice(index,1);
            }
        },
        mounted() {
            axios.get('http://api.srvrdev.ru/api/income-parameters?no_table=true').then( res => res.data)
                .then(data => this.parameters = data);

            axios.get('http://api.srvrdev.ru/api/materials?section_id=53&no_table=1').then( res => this.materials = res.data);

            axios.get('http://api.srvrdev.ru/api/settings-unit-measurement?no_table=1').then( res => this.units = res.data);

            axios.get('http://api.srvrdev.ru/api/setting-coefficient?no_table=1').then(res => this.coeffs = res.data);

            if (this.mode === 'edit'){
                axios.get('http://api.srvrdev.ru/api/works/'+this.itemId).then(res => res.data).then( work => {
                    this.work = work;
                })
            }
        }
    }
</script>

<style scoped>
    .delete-cross{
        opacity: .8;
        color: white;
        cursor: pointer;
        padding: 2px 5px;
        border-radius: 4px;
        background-color: #3266d6;
        line-height: 1;
    }
    .delete-cross:hover{
        opacity: 1;
        transition: .3s ease;
    }
    .coeff-material-link{
        padding: 10px 0;
        border-bottom: 1px solid rgba(128, 128, 128, 0.21);
    }
</style>
