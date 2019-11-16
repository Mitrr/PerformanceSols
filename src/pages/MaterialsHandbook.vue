<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <div style="min-height: 100vh" class="page-wrapper">
        <div class="column-flex">
            <Card :footer="false" style="height: 100%;min-height: 35vh;border-radius: 6px">
                <template v-slot:header>
                    <p class="card-title">Справочник материалов</p>
                </template>
                <template v-slot:content>
                        <div>
                            <ul v-for="(group,i) in groups" :key="i">
                                <tree-item class="item" :item="group"
                                           @materials="loadMaterialsAndWorksTables"
                                           @make-folder="makeFolder"
                                           @delete-node="deleteNode"
                                ></tree-item>
                            </ul>
                        </div>
                </template>
            </Card>

            <div class="column-flex">
                <card :footer="false" style="flex: 1">
                    <template v-slot:header>
                        <p class="card-title">Материалы</p>
                    </template>
                    <template v-slot:content>
                        <Table v-if="activeMaterials.headers.length>0"
                               :headers="activeMaterials.headers" :data="activeMaterials.data">

                        </Table>
<!--                        <div v-for="(material,i) in activeMaterials" :key="i">-->
<!--                            <div v-if="activeMaterials.length>0">-->
<!--                                <span>{{material.name}}</span>-->
<!--                                <span v-if="material.price!==undefined">{{material.price}}₽</span>-->
<!--                            </div>-->
<!--                            <div v-else>-->
<!--                                В этом разделе нет материалов-->
<!--                            </div>-->
<!--                        </div>-->
                    </template>
                </card>
                <card :footer="false" style="flex: 1">
                    <template v-slot:header>
                        <p class="card-title">Работы</p>
                    </template>
                    <template v-slot:content>
                        <div>hello</div>
                    </template>
                </card>
            </div>
        </div>

    </div>
</template>

<script>
    import TreeItem from '../components/ui/Trees/TreeItem';
    import {mapActions,mapState} from 'vuex';

    var treeData = {
        name: 'My Tree',
    };

    export default {
        name: "MaterialsHandbook",
        components:{
            TreeItem,
            //Popup: () => import('../components/ui/Popup'),
            Table: () => import('../components/ui/Table')
        },
        data(){
            return{
                //activeBlockMaterials:[],
                treeData:treeData,
                parentId:'',
                nodeName:'',
                nodeDialog:false,
            }
        },
        computed:{
            ...mapState('worksHandbook',{
                groups: state => state.treeData,
                activeMaterials: state => state.materialsTable,
            }),
            // materials(){
            //     return this.$store.state.worksHandbook.materials;
            // }
            // groups(){
            //     return this.$store.state.worksHandbook.treeData;
            // }
        },
        methods:{
            // selectSection(materials){
            //     this.activeBlockMaterials =
            //         materials===undefined?[{name:'В этом разделе нет материалов'}]:materials;
            // },
            // selectSubsection(materials){
            //     this.activeBlockMaterials =
            //         materials===undefined?[{name:'В этом подразделе нет материалов'}]:materials;
            // },
            // selectWork(materials){
            //     this.activeBlockMaterials =
            //         materials===undefined?[{name:'В этой работе нет материалов'}]:materials;
            // },
            // showMaterials(id){
            //     this.activeBlockMaterials = data === undefined?[{name:'Здесь нет материалов'}]:data;
            // },

            ...mapActions('worksHandbook', [
                'saveNode',
                //'loadMaterials'
            ]),

            loadMaterialsAndWorksTables(id){
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
    .ul {
        padding-left: 1em;
        line-height: 1.5em;
        list-style-type: dot;
    }

</style>
