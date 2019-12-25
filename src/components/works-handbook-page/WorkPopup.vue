<template>
    <popup @close="$emit('close')" :width="'60%'" :height="'80vh'">
        <template v-slot:inner>
            <card :header="false" style="height: 100%">
                <template v-slot:content>
                    <p style="padding: 20px 0 10px 0; font-size: 1.5rem">Работа</p>
                    <div class="inputs-group inputs-group_row">
                        <input type="text" class="light-text-input" placeholder="Название" style="width: 30%">
                        <input type="text" class="light-text-input" placeholder="Название" style="width: 30%">
                        <input type="text" class="light-text-input" placeholder="Название" style="width: 30%">
                        <input type="text" class="light-text-input" placeholder="Название" style="width: 30%">
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
    export default {
        name: "WorkPopup",
        components:{
            Popup: () => import('@/components/ui/Popup'),
        },
        props:{
            item:{
                type: Object,
                default:{
                    name: "Монтаж навесного щита",
                    section_id: 0,
                    price_retail: "1000.50",
                    measurement_id: "2",
                    price_for_workers: "700.50",
                    materials: [],
                    formula_work: "",
                    formula_material: "",
                    income_parameters: []
                }
            }
        }
    }
</script>

<style scoped>

</style>
