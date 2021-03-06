<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <div style="min-height: 100vh" class="page-wrapper">
        <div class="column-flex">
            <Card :footer="false" style="height: 100%;min-height: 35vh;border-radius: 6px">
                <template v-slot:header>
                    <p class="card-title">Справочник</p>
                    <img class="header-img-btn" src="./../../public/add-to-list.png"
                         @click="addGroupInput = true">
                </template>
                <template v-slot:content>
                        <div class="some">
                            <ul v-for="(group,i) in groups" :key="i">
                                <tree-item class="item" :item="group"
                                           @materials="loadMaterialsAndWorksTables"
                                           @make-folder="makeFolder"
                                           @delete-node="deleteNode"
                                ></tree-item>
                            </ul>
                            <ul>
                                <li v-if="addGroupInput">
                                    <input class="node-input" type="text" name="name"
                                           placeholder="Название раздела"
                                           v-model.trim="newRootNode.name"
                                           @keyup.enter="saveRootNode()"
                                           @keyup.esc="addGroupInput = false"
                                    >
                                </li>
                            </ul>
                        </div>
                </template>
            </Card>

            <div class="column-flex">

                <materials-table :node-subtitle="nodeSubtitle" :active-section-id="activeSectionId"
                                 @openCreate="openAddMaterialDialog"
                                 @delete="deleteMaterial"
                                 @edit="openEditMaterial"
                />


                <WorksTable :node-subtitle="activeNodeSubtitle" :active-section-id="activeSectionId"
                            @openCreate="openCreateWork"
                            @edit="openEditWork"
                >
                </WorksTable>

<!--                <card style="flex: 1">-->
<!--                    <template v-slot:header>-->
<!--                        <p class="card-title">-->
<!--                            <span>Работы</span>-->
<!--                            <span class="active-blue-color">{{activeNodeSubtitle}}</span>-->
<!--                        </p>-->
<!--                        <img v-if="worksTableHeaders.length > 0"-->
<!--                             @click="workDialog = true"-->
<!--                             class="header-img-btn"-->
<!--                             src="./../../public/add-to-list.png">-->
<!--                    </template>-->
<!--                    <template v-slot:content>-->
<!--                        <Table v-if="worksTableData.length > 0"-->
<!--                               :headers="worksTableHeaders" :data="worksTableData"-->
<!--                               :scroll-width-x="1500"-->
<!--                        >-->
<!--                        </Table>-->
<!--                        <div v-else>В этом разделе нет работ</div>-->
<!--                    </template>-->
<!--                    <template v-slot:footer>-->
<!--                        <p class="scrollable-chip" style="margin: 0 auto;margin-bottom: 10px">← →</p>-->
<!--                    </template>-->
<!--                </card>-->

            </div>
        </div>

        <EditMaterialPopup v-if="editDialog" @close="editDialog = false" :material="material"
                          @save="changeMaterial({...$event, section_id: activeSectionId})"
        ></EditMaterialPopup>

        <create-material-dialog v-if="addMaterialDialog" @close="addMaterialDialog = false"
        :active-section-id="activeSectionId"></create-material-dialog>

        <WorkPopup v-if="workDialog" @close="workDialog = false" :section="activeSectionId"
                   :item-id="workIdToEdit"
                   :mode="workPopupMode"
        ></WorkPopup>

    </div>
</template>

<script>
    import TreeItem from '../components/ui/Trees/TreeItem';
    import {mapActions,mapState} from 'vuex';
    import MaterialsTable from '../components/works-handbook-page/MaterialsTable';
    import WorkPopup from "../components/works-handbook-page/WorkPopup";

    export default {
        name: "MaterialsHandbook",
        components:{
            TreeItem,
            CreateMaterialDialog: () => import('../components/works-handbook-page/CreateMaterialDialog'),
            MaterialsTable,
            EditMaterialPopup: () => import("../components/works-handbook-page/EditMaterialPopup"),
            WorkPopup,
            // WorkPopup: () => import('@/components/works-handbook-page/WorkPopup'),
            WorksTable: () => import("@/components/works-handbook-page/WorksTable"),
        },
        data(){
            return{
                parentId:'',
                nodeName:'',
                nodeDialog:false,
                nodeSubtitle:'',
                editDialog:false,
                addMaterialDialog:false,
                addGroupInput: false,
                newRootNode:{
                    name:'',
                    parent_id: null,
                },
                activeSectionId:'',
                material: {
                    coefficient_id: "",
                    id: "",
                    measurement_id: "",
                    name: "",
                    price: "",
                    section_id: "",
                    rowId:""
                },

                workDialog: false,
                workPopupMode: 'create',
                workIdToEdit: null
            }
        },
        computed:{
            ...mapState('worksHandbook',{
                groups: state => state.treeData,
                worksTableData: state => state.worksTable.data,
                worksTableHeaders: state => state.worksTable.headers,
            }),
            activeNodeSubtitle(){
                return this.nodeSubtitle ? ' - '+ this.nodeSubtitle : '';
            },
            noMaterialsText(){
                return this.nodeSubtitle === '' ? 'Выберите раздел' : 'В этом разделе нет материалов';
            },

        },
        methods:{
            ...mapActions('worksHandbook', [
                'saveNode',
                'createMaterial',
                'deleteMaterial',
                'changeMaterial'
            ]),

            loadMaterialsAndWorksTables({name,id}){
                this.nodeSubtitle = name;
                this.activeSectionId = id;

                this.$store.dispatch('loadTable',{
                    url:`http://api.srvrdev.ru/api/materials?section_id=${id}`,
                    commitName:'worksHandbook/setMaterials'
                });

                this.$store.dispatch('loadTable',{
                    url:`http://api.srvrdev.ru/api/works?section_id=${id}`,
                    commitName:'worksHandbook/setWorks'
                });
            },

            addItem: function (item) {
                item.children.push({
                    name: ''
                })
            },
            makeFolder(item){
                this.$set(item, 'children', []);
                this.addItem(item)
            },
            deleteNode(item){
                let vm = this;

                this.$store.dispatch('showAlert','Вы уверены, что хотите удалить этот раздел?').then( res => {
                    if (res){
                        this.$store.dispatch('worksHandbook/deleteNode',item).then( () => {
                            for (let key in item){
                                vm.$delete(item,key,'');
                            }
                        });
                    }
                });
            },
            saveRootNode(){
                if (this.newRootNode.name){
                    this.$store.dispatch('worksHandbook/saveNode', this.newRootNode).then( () => {
                        this.addGroupInput = false;
                    });
                }
            },
            openAddMaterialDialog(){
                Promise.all([
                    this.$store.dispatch('worksHandbook/loadUnitsList'),
                    this.$store.dispatch('worksHandbook/loadCoeffsList')
                ]).then( () => {
                    this.addMaterialDialog = true;
                });

            },
            openEditMaterial(tableRow){
                for (const cell of tableRow){
                    this.material[cell.description] = cell.value;
                }
                this.material.rowId = tableRow[0].rowId;
                this.editDialog = true;
            },
            openEditWork(id){
                this.workPopupMode = 'edit';
                this.workIdToEdit = id;
                this.workDialog = true;
            },
            openCreateWork(){
                this.workPopupMode = 'create';
                this.workIdToEdit = null;
                this.workDialog = true;
            }
        },
        mounted() {
            this.$store.dispatch('worksHandbook/loadTreeData');
        }
    }
</script>

<style scoped>
    .split-blocks_container{
        display: flex;
        flex-direction: row;
        height: 100%;
    }
    .split-blocks_container>div{
        padding: 10px;
    }
    span{
        cursor: pointer;
    }
    .page-wrapper{
        color: #444;
    }
    .item{
        cursor: pointer;
    }

</style>
