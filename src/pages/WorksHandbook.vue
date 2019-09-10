<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <div style="min-height: 100vh" class="page-wrapper">
        <Card :footer="false" style="height: 100%;min-height: 35vh">
            <template v-slot:header>
                <p style="color: white">Справочник работ</p>
            </template>
            <template v-slot:content>
                <div class="split-blocks_container">

                    <div style="flex:1;border-right: 1px solid rgba(0,0,0,0.1)">
                        <ul>
                            <tree-item class="item" :item="treeData" @materials="showMaterials"></tree-item>
                        </ul>
                    </div>

                    <div style="flex: 1">
                       <div v-for="(material,i) in activeBlockMaterials" :key="i">
                           <span>{{material.name}}</span>
                           <span v-if="material.price!==undefined">{{material.price}}₽</span>
                       </div>
                    </div>
                </div>
            </template>
        </Card>
    </div>
</template>

<script>
    import Card from '../components/ui/Card';
    import TreeItem from '../components/ui/TreeItem';

    var treeData = {
        name: 'My Tree',
        materials:[{name:"Краска",price:500}],
        children: [
            { name: 'hello' },
            { name: 'wat',
                materials:[{name:"Краска wat",price:555}]
            },
            {
                name: 'child folder',
                children: [
                    {
                        name: 'child folder',
                        children: [
                            { name: 'hello',materials:[{name:"Обмотка",price:50}]},
                            { name: 'wat' }
                        ]
                    },
                    { name: 'hello' },
                    { name: 'wat' },
                    {
                        name: 'child folder',
                        children: [
                            { name: 'hello' },
                            { name: 'wat' }
                        ]
                    }
                ]
            }
        ]
    };

    export default {
        name: "WorksHandbook",
        components:{Card,TreeItem},
        data(){
            return{
                activeBlockMaterials:[],
                treeData:treeData,
                // groups:[
                //     {
                //         name:'Монтаж щита',
                //         sections:[
                //             {
                //                 name:'Электрика',
                //                 materials:[
                //                     {name:"Обмотка",price:50},
                //                 ],
                //                 subsections:[
                //                     {
                //                         name:'Монтаж кабелей блять хз',
                //                         works:[
                //                             {
                //                                 name:'Монтаж кабеля 12мм',
                //                                 cPrice:2000,
                //                                 wPrice:1500,
                //                                 unit:'Единица измерения?',
                //                                 materials:[
                //                                     {name:"Кабель двухжильный",price:500},
                //                                     {name:"Кабель трехжильный",price:600},
                //                                 ]
                //                             },
                //                             {
                //                                 name:'Монтаж кабеля 24мм',
                //
                //                             }
                //                         ]
                //                     }
                //                 ]
                //             },
                //             {name:'Жопа',
                //                 sections:[
                //                     {name:'Отделка',materials:[{name:'Краска',price:100}]}
                //                 ]
                //             }
                //         ]
                //     }
                // ]
            }
        },
        methods:{

            selectSection(materials){
                this.activeBlockMaterials =
                    materials===undefined?[{name:'В этом разделе нет материалов'}]:materials;
            },
            selectSubsection(materials){
                this.activeBlockMaterials =
                    materials===undefined?[{name:'В этом подразделе нет материалов'}]:materials;
            },
            selectWork(materials){
                this.activeBlockMaterials =
                    materials===undefined?[{name:'В этой работе нет материалов'}]:materials;
            },
            showMaterials(data){
                console.log(data);
                this.activeBlockMaterials = data===undefined?[{name:'Здесь нет материалов'}]:data;
            }
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
