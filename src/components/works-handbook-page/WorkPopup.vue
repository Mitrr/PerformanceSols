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

                        <div class="row-flex" style="width: 45%;flex-wrap: wrap;justify-content: space-between;">
                            <div style="width: 49%;align-items: center" v-for="(param, i) in parameters" :key="i" class="row-flex">
                                <input type="checkbox" :id="param.name" :value="param.id" v-model="work.income_parameters"
                                       style="height: auto;margin: 0 5px 0 0">
                                <label :for="param.name">{{param.name}}</label>
                            </div>
                        </div>

                    </div>
                </template>

                <template v-slot:footer>
                    <div class="card-actions">
                        <div class="btn flat" @click.stop="$emit('close')">ЗАКРЫТЬ</div>
                        <div class="btn">СОХРАНИТЬ</div>
                    </div>
                </template>
            </card>
        </template>
    </popup>
</template>

<script>
    import axios from 'axios'

    //let parameters = [];

    export default {
        name: "WorkPopup",
        components:{
            Popup: () => import('@/components/ui/Popup'),
        },
        props:{
            section_id: [String, Number],
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
                    name: "Монтаж навесного щита",
                    section_id: 0,
                    price_retail: "1000.50",
                    measurement_id: "2",
                    price_for_workers: "700.50",
                    materials: [],
                    formula_work: "",
                    formula_material: "",
                    income_parameters: []
                },
                parameters:[]
            }
        },
        mounted() {
            console.log('mounted');
            axios.get('http://api.srvrdev.ru/api/income-parameters?no_table=true').then( res => res.data)
                .then(data => this.parameters = data)
        }
    }
</script>

<style scoped>

</style>
