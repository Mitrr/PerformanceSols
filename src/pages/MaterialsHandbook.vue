<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <div style="min-height: 100vh" class="page-wrapper">
        <div class="column-flex">
            <Card :footer="false" style="height: 100%;min-height: 35vh;border-radius: 6px">
                <template v-slot:header>
                    <p class="card-title">Справочник материалов</p>
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
                <card :footer="false" style="flex: 1">
                    <template v-slot:header>
                        <p class="card-title">
                            <span>Материалы</span>
                            <span class="active-blue-color">{{activeNodeSubtitle}}</span>
                        </p>
                        <img class="header-img-btn" src="./../../public/add-to-list.png"
                             @click="addMaterialDialog">
                    </template>
                    <template v-slot:content>
                        <Table v-if="activeMaterials.data.length>0"
                               :headers="activeMaterials.headers" :data="activeMaterials.data"
                               @edit="openEditMaterials($event)"
                        >

                        </Table>
                        <div v-else>В этом разделе нет материалов</div>
                    </template>
                </card>

                <card :footer="false" style="flex: 1">
                    <template v-slot:header>
                        <p class="card-title">
                            <span>Работы</span>
                            <span class="active-blue-color">{{activeNodeSubtitle}}</span>
                        </p>
                    </template>
                    <template v-slot:content>
                        <div v-if="true">hello</div>
                        <div v-else>В этом разделе нет работ</div>
                    </template>
                </card>
            </div>
        </div>


        <popup v-if="editDialog" @close="editDialog = false">
            <template v-slot:inner>
                <card :header="false">
                    <template v-slot:content>
                        hi
                    </template>
                </card>
            </template>
        </popup>

    </div>
</template>

<script>
    import TreeItem from '../components/ui/Trees/TreeItem';
    import {mapActions,mapState} from 'vuex';

    export default {
        name: "MaterialsHandbook",
        components:{
            TreeItem,
            Popup: () => import('../components/ui/Popup'),
            Table: () => import('../components/ui/WithDeleteButtonTable')
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
                    parent_id:null
                }
            }
        },
        computed:{
            ...mapState('worksHandbook',{
                groups: state => state.treeData,
                activeMaterials: state => state.materialsTable,
            }),
            activeNodeSubtitle(){
                return this.nodeSubtitle ? ' - '+ this.nodeSubtitle : '';
            }
        },
        methods:{
            ...mapActions('worksHandbook', [
                'saveNode',
            ]),

            loadMaterialsAndWorksTables({name,id}){
                this.nodeSubtitle = name;

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
                this.$store.dispatch('worksHandbook/deleteNode',item).then( () => {
                    for (let key in item){
                        vm.$delete(item,key,'');
                    }
                })
            },
            saveRootNode(){
                if (this.newRootNode.name){
                    this.$store.dispatch('worksHandbook/saveNode', this.newRootNode).then( () => {
                        this.addGroupInput = false;
                    });
                }
            },
            openEditMaterials(item){
                // let test = {
                //     id:1,
                //     section_id: 42,
                //     price: "832.50",
                //     measurement_id: "кг",
                //     coefficient_id: "Элитный",
                // };
                //this.$store.dispatch('worksHandbook/editMaterial',test);
                console.log(item)
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
    /*ul {*/
    /*    padding-left: 1em;*/
    /*    line-height: 1.5em;*/
    /*    list-style-type: dot;*/
    /*}*/

</style>
