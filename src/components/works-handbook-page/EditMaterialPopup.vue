<template>
    <popup @close="$emit('close')" :width="'60%'">
        <template v-slot:inner>
            <card :header="false">
                <template v-slot:content>
                    <p class="popup-title">Добавление материала</p>

                    <div class="inputs-group inputs-group_row">
                        <input class="light-text-input" type="text" name="name" placeholder="Название материала..."
                               v-model="material.name" required style="width: 47.5%">
                        <input class="light-text-input" type="number" name="price" placeholder="Цена..."
                               v-model="material.price" required style="width: 47.5%">
<!--                        <label for="coeffs" style="padding-bottom: 5px">Коэффициенты:</label>-->
<!--                        <select id="coeffs" v-model="material.coefficient_id" required>-->
<!--                            <option value="">&#45;&#45;Выберите коэффициент&#45;&#45;</option>-->
<!--                            <option v-for="(coeff, j) in coeffs" :key="j" :value="coeff.id">{{coeff.name}}</option>-->
<!--                        </select>-->
                    </div>

                    <div class="inputs-group" style="width: 50%">
                        <label for="units" style="padding-bottom: 5px">Единицы измерения:</label>
                        <select id="units" v-model="material.measurement_id" required>
                            <option value="">--Выберите единицы измерения--</option>
                            <option v-for="(unit,i) in units" :key="i" :value="unit.id">{{unit.name}}</option>
                        </select>
                    </div>

<!--                    <button :disabled="!readyToSave" @click="saveMaterial">Добавить</button>-->
                </template>

                <template v-slot:footer>
                    <div class="card-actions">
                        <div class="btn flat" @click.stop="$emit('close')">ЗАКРЫТЬ</div>
                        <div class="btn" @click="saveMaterial()">СОХРАНИТЬ</div>
                    </div>
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
                // 'coeffs'
            ]),
        },
        methods:{
            saveMaterial(){
                if (this.readyToSave){
                    this.$emit('save', this.material);
                    this.$emit('close');
                }else {
                    alert('Не все поля заполнены')
                }

            }
        },
        created() {
            this.$store.dispatch('worksHandbook/loadUnitsList');
            //this.$store.dispatch('worksHandbook/loadCoeffsList');
        }
    }
</script>
