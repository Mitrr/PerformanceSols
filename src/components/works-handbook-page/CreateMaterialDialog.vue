<template>
    <popup @close="$emit('close')" :width="'55%'">
        <template v-slot:inner>

            <card :header="false" style="height: 100%">
                <template v-slot:content>
                    <p class="popup-title">Добавление материала</p>
                    <div class="inputs-group inputs-group_row">
                        <input class="light-text-input" type="text" name="name" placeholder="Название материала..."
                               v-model="newMaterial.name" required style="width: 47.5%">
                        <input class="light-text-input" type="number" name="price" placeholder="Цена..."
                               v-model="newMaterial.price" required style="width: 47.5%">
                    </div>

                    <div class="inputs-group" style="margin-top: 15px">
                        <label for="units" style="padding-bottom: 5px">Единицы измерения:</label>
                        <select id="units" v-model="newMaterial.measurement_id" required style="width: 50%">
                            <option value="">--Выберите единицы измерения--</option>
                            <option v-for="(unit,i) in units" :key="i" :value="unit.id">{{unit.name}}</option>
                        </select>
                    </div>

<!--                    <button :disabled="!readyToAdding" @click="createMaterial()">Добавить</button>-->

                </template>

                <template v-slot:footer>
                    <div class="card-actions">
                        <div class="btn flat" @click.stop="$emit('close')">ЗАКРЫТЬ</div>
                        <div class="btn" @click="createMaterial()">СОХРАНИТЬ</div>
                    </div>
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
                'units',
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
