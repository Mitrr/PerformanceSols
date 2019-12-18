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

                <card :footer="false" style="flex: 1">
                    <template v-slot:header>
                        <p class="card-title">
                            <span>Работы</span>
                            <span class="active-blue-color">{{activeNodeSubtitle}}</span>
                        </p>
                    </template>
                    <template v-slot:content>
                        <div v-if="false">hello</div>
                        <div v-else>В этом разделе нет работ</div>
                    </template>
                </card>
            </div>
        </div>

        <EditMatrialPopup v-if="editDialog" @close="editDialog = false" :material="material"
                          @save="changeMaterial({...$event, section_id: activeSectionId})"
        ></EditMatrialPopup>

        <create-material-dialog v-if="addMaterialDialog" @close="addMaterialDialog = false"
        :active-section-id="activeSectionId"></create-material-dialog>

    </div>
</template>

<script>
    import TreeItem from '../components/ui/Trees/TreeItem';
    import {mapActions,mapState} from 'vuex';
    import MaterialsTable from '../components/works-handbook-page/MaterialsTable';

    export default {
        name: "MaterialsHandbook",
        components:{
            TreeItem,
            CreateMaterialDialog: () => import('../components/works-handbook-page/CreateMaterialDialog'),
            MaterialsTable,
            EditMatrialPopup: () => import("../components/works-handbook-page/EditMaterialPopup"),
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
                }
            }
        },
        computed:{
            ...mapState('worksHandbook',{
                groups: state => state.treeData,
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
                })
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
                //this.$store.dispatch('worksHandbook/editMaterial',test);

                for (const cell of tableRow){
                    this.material[cell.description] = cell.value;
                }
                this.editDialog = true;
            },
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
    /*ul {*/
    /*    padding-left: 1em;*/
    /*    line-height: 1.5em;*/
    /*    list-style-type: dot;*/
    /*}*/

</style>
