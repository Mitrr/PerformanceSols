<template>
    <popup @close="$emit('close')">
        <template v-slot:inner>
            <card :header="false">
                <template v-slot:content>
                    <p style="padding: 10px 0 10px 0">Добавление материала</p>
                    <div class="inputs-group">
                        <input class="node-input" type="text" name="name" placeholder="Название материала..." v-model="newMaterial.name" required>
                        <input class="node-input" type="number" name="price" placeholder="Цена..." v-model="newMaterial.price" required>

                        <label for="units" style="padding-bottom: 5px">Единицы измерения:</label>
                        <select id="units" v-model="newMaterial.measurement_id" required>
                            <option value="">--Выберите единицы измерения--</option>
                            <option v-for="(unit,i) in units" :key="i" :value="unit.id">{{unit.name}}</option>
                        </select>

<!--                        <label for="coeffs" style="padding-bottom: 5px">Коэффициенты:</label>-->
<!--                        <select id="coeffs" v-model="newMaterial.coefficient_id" required>-->
<!--                            <option value="">&#45;&#45;Выберите коэффициент&#45;&#45;</option>-->
<!--                            <option v-for="(coeff, j) in coeffs" :key="j" :value="coeff.id">{{coeff.name}}</option>-->
<!--                        </select>-->

                    </div>

                    <button :disabled="!readyToAdding" @click="createMaterial()">Добавить</button>

                </template>
            </card>
        </template>
    </popup>
</template>

<script>
    import {mapState} from 'vuex';

    export default {
        name: "CreateMaterialDialog",
        components:{
            Popup: () => import('@/components/ui/Popup'),
        },
        props:{
            activeSectionId: [Number, String]
        },
        data(){
            return{
                newMaterial:{
                    name:'',
                    price:'',
                    measurement_id: '',
                    coefficient_id: '',
                },
            }
        },
        computed:{
            ...mapState('worksHandbook', [
                'units','coeffs'
            ]),
            readyToAdding(){
                return Object.values(this.newMaterial).filter( el => el !== "").length > 0 && this.activeSectionId!==false;
            }
        },
        methods:{
            createMaterial(){
                if ( this.readyToAdding ) {
                    this.$store.dispatch('worksHandbook/createMaterial',
                        {...this.newMaterial, section_id: this.activeSectionId});
                    this.$emit('close');
                }
            }
        },

    }
</script>

<style scoped>

</style>
