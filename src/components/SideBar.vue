<template>
    <div class="sidebar_wrapper">
        <div class="sidebar-header_container">
<!--            <img style="border-radius: 50%;width: 35px;height: 35px" src="../assets/logo.png">-->
<!--            <p class="sidebar-title">PerformanceSols</p>-->
        </div>
        <div class="sidebar-content__container">
            <div class="list-group" v-for="(item,i) in listLinks" :key="i">
                <div class="list-group_header" @click="selectItem(item, i)">

                    <div class="icon_wrapper">
                        <Icon :icon="item.icon" :color="'#f0f0f0'"></Icon>
                    </div>

                    <div class="list-item" style="">
                        {{item.name}}
                    </div>

                </div>
                <div v-if="activeMenuItemId === i && item.subItems">
                    <div v-for="(subItem, j) in item.subItems" :key="j" class="list-item list-sub-item"
                         @click="selectItem(subItem, i)">
                        {{subItem.name}}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "SideBar",
        data(){
            return{
                activeMenuItemId:'',
                listLinks:[
                    {
                        name:'Справочники',
                        url:null,
                        title:'',
                        icon: 'library_books',
                        subItems:[
                            {
                                name:'Входные параметры',
                                title:'Входные параметры',
                                url:'/'
                            },
                            {
                                name:'Материалы и работы',
                                title:'Справочник материалов и работ',
                                url:'/materials'
                            },
                        ]
                    },
                    {
                        name:'Добавление работы',
                        title:'Добавление работы',
                        url:'/add-works',
                        icon: 'library_books'
                    }
                ]
            }
        },
        methods:{
            selectItem({title, url}, id){
                this.activeMenuItemId = this.activeMenuItemId === id? '':id;

                if (url !== null){
                    this.$router.push({path:url});
                    this.$emit('newRoute',title)
                }

            }
        }
    }
</script>

<style scoped>
    .list-item{
        padding-left: 20px;
        display: none;
        transition: 1.5s ease-in;
        opacity: 0;
    }
    .sidebar_wrapper{
        min-width: 50px;
        width: 50px;
        height: 100%;
        position: fixed;
        left: 0;
        top: 0;
        z-index: 5;
        background-color: #2e3444;
        box-shadow: 0 0 10px 0 rgba(0,0,0,.5);
        color: whitesmoke;
        transition: .4s ease;
    }
    .sidebar_wrapper:hover{
        width: 250px;

        .list-item{
            display: block;
            opacity: 1;
        }
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
    .list-sub-item{
        padding-left: 40px;
        margin-bottom: 10px;
        cursor: pointer;
    }
    .icon_wrapper{
        padding: 0 10px;
    }

</style>
