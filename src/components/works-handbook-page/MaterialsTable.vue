<template>
    <card :footer="false" style="flex: 1">
        <template v-slot:header>
            <p class="card-title">
                <span>Материалы</span>
                <span class="active-blue-color">{{activeNodeSubtitle}}</span>
            </p>
            <img class="header-img-btn" src="./../../../public/add-to-list.png"
                 v-if="nodeSubtitle"
                 @click="$emit('openCreate')"
            >
        </template>
        <template v-slot:content>
            <Table v-if="activeMaterials.data.length > 0"
                   :headers="activeMaterials.headers" :data="activeMaterials.data"
                   @deleteCoeff="$emit('delete', $event)"
            >
            </Table>
            <div v-else>{{noMaterialsText}}</div>
        </template>
    </card>
</template>

<script>
    export default {
        name: "MaterialsTable",
        components:{
            Table: () => import('@/components/ui/WithDeleteButtonTable')
        },
        props:{
          nodeSubtitle:String,
          activeSectionId:[String,Number],
        },
        computed:{
            activeMaterials(){
                return this.$store.state.worksHandbook.materialsTable;
            },
            activeNodeSubtitle(){
                return this.nodeSubtitle ? ' - '+ this.nodeSubtitle : '';
            },
            noMaterialsText(){
                return this.nodeSubtitle === '' ? 'Выберите раздел' : 'В этом разделе нет материалов';
            },
        }
    }
</script>

<style scoped>

</style>
