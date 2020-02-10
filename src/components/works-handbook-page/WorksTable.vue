<template>
    <card style="flex: 1">
        <template v-slot:header>
            <p class="card-title">
                <span>Работы</span>
                <span class="active-blue-color">{{nodeSubtitle}}</span>
            </p>
            <img v-if="worksTableHeaders.length > 0"
                 @click="$emit('openCreate')"
                 class="header-img-btn"
                 src="./../../../public/add-to-list.png">
        </template>
        <template v-slot:content>
            <Table v-if="worksTableData.length > 0"
                   :headers="worksTableHeaders" :data="worksTableData"
                   :scroll-width-x="1500"
                   @deleteCoeff="deleteWork"
                   @edit="$emit('edit', $event[0].value)"
            >
            </Table>
            <div v-else>В этом разделе нет работ</div>
        </template>
        <template v-slot:footer>
            <p class="scrollable-chip" style="margin: 0 auto;margin-bottom: 10px">← →</p>
        </template>
    </card>
</template>

<script>
    import {mapState, mapActions} from "vuex";

    export default {
        name: "WorksTable",
        components:{
            Table: () => import('@/components/ui/WithDeleteButtonTable')
        },
        props:{
            nodeSubtitle: String,
            activeSectionId: [String, Number],
        },
        computed:{
            ...mapState('worksHandbook',{
                worksTableData: state => state.worksTable.data,
                worksTableHeaders: state => state.worksTable.headers,
            }),
        },
        methods:{
            ...mapActions('worksHandbook', [
                'deleteWork'
            ]),
        }
    }
</script>

<style scoped>

</style>
