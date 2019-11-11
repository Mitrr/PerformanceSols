<template>
    <div class="sidebar_wrapper">
        <div class="sidebar-header_container">
            <img style="border-radius: 50%;width: 35px;height: 35px" src="../assets/logo.png">
            <p class="sidebar-title">PerformanceSols</p>
        </div>
        <div class="sidebar-content__container">
            <div class="list-group" v-for="(item,i) in listLinks" :key="i">
                <div class="list-group_header">
                    <div class="list-item">
                        <router-link :to="item.url">{{item.name}}</router-link>
                    </div>
                </div>
<!--                <div v-for="(item,i) in listLinks" :key="i" class="list-item">-->
<!--                    {{item.name}}-->
<!--                </div>-->
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "SideBar",
        data(){
            return{
                listLinks:[
                    {
                        name:'Справочники',
                        url:'/',
                        subItems:[
                            {
                                name:'Материалы',
                                url:''
                            },
                            {
                                name:'Входные параметры',
                                url:''
                            },
                            {
                                name:'Работы',
                                url:''
                            },
                        ]
                    },
                    {
                        name:'Проекты',
                        subItems:[
                            {
                                name:'Список',
                                url:''
                            },
                            {
                                name:'Хуйня',
                                url:''
                            },
                        ]
                    }
                ]
            }
        }
    }
</script>

<style scoped>
    .sidebar_wrapper{
        /*width: 20%;*/
        /*min-width: 200px;*/
        width: 250px;
        height: 100%;
        position: fixed;
        left: 0;
        top: 0;
        z-index: 5;
        background-color: #2e3444;
        box-shadow: 0 0 10px 0 rgba(0,0,0,.5);
        color: whitesmoke;
    }
    .sidebar-header_container{
        height: 60px;
        padding: 20px;
        display: flex;
        align-items: center;
        flex-direction: row;
    }
    .sidebar-title{
        margin-left: 10px;
        font-weight: 500;
        font-size: 1.3rem;
        margin-block-start: 0;
        margin-block-end: 0;
    }
    .sidebar-content__container{
        height: 100%;
        /*padding: 0 20px;*/
        padding-right: 20px;
    }
    .list-group{
        padding: 0;
        position: relative;
        -webkit-transition: inherit;
        transition: inherit;
        margin-bottom: 10px;
    }
    .list-group_header{
        position: relative;
        background-color: transparent;
        font-size: 1.1rem;
        font-weight: 700;
        height: 45px;
        cursor: pointer;
        display: flex;
        align-items: center;
    }
    .list-item{
        padding-left: 20px;
    }
    .list-group_header:before{
        content: "";
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: -1;
         width: 235px;
        border-radius: 0 100px 100px 0;
        background-color: rgba(0,0,0,.2);
        transform: scaleX(0);
        transform-origin: left;
        transition: -webkit-transform .4s ease-in-out;
        transition: transform .4s ease-in-out;
        box-shadow: 0 4px 15px 0 rgba(0,0,0,.09);
    }
    .list-group_header:hover:before{
        transform: scaleX(1);
    }

</style>
