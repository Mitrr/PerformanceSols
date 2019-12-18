<template>
    <popup @close="$emit('close')">
        <template v-slot:inner>
            <card :header="false">
                <template v-slot:content>
                    <p style="padding: 10px 0 10px 0">Добавление материала</p>

                    <div class="inputs-group">
                        <input class="node-input" type="text" name="name" placeholder="Название материала..." v-model="material.name" required>
                        <input class="node-input" type="number" name="price" placeholder="Цена..." v-model="material.price" required>

                        <label for="units" style="padding-bottom: 5px">Единицы измерения:</label>
                        <select id="units" v-model="material.measurement_id" required>
                            <option value="">--Выберите единицы измерения--</option>
                            <option v-for="(unit,i) in units" :key="i" :value="unit.id">{{unit.name}}</option>
                        </select>

                        <label for="coeffs" style="padding-bottom: 5px">Коэффициенты:</label>
                        <select id="coeffs" v-model="material.coefficient_id" required>
                            <option value="">--Выберите коэффициент--</option>
                            <option v-for="(coeff, j) in coeffs" :key="j" :value="coeff.id">{{coeff.name}}</option>
                        </select>
                    </div>

                    <button :disabled="!readyToSave" @click="saveMaterial">Добавить</button>
                </template>
            </card>
        </template>
    </popup>
</template>

<script>
    import Popup from "../ui/Popup";
    import {mapState} from 'vuex';

    export default {
        name: "EditMaterialPopup",
        components: {Popup},
        props:{
            material: Object
        },
        computed:{
            readyToSave(){
                return Object.values(this.material).filter( el => el !== "").length > 0;
            },
            ...mapState('worksHandbook', [
                'units',
                'coeffs'
            ]),
        },
        methods:{
            saveMaterial(){
                this.$emit('save', this.material);
                this.$emit('close');
            }
        },
        created() {
            this.$store.dispatch('worksHandbook/loadUnitsList');
            this.$store.dispatch('worksHandbook/loadCoeffsList');
        }
    }
</script>

<style scoped>

</style>
