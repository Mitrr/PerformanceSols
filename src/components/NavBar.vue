<template>
    <div class="navbar_wrapper">
        <div class="navbar_content">
            <div class="page-header">{{title}}</div>
            <div style="align-items: center" class="row-flex">
                <div style="margin-right: 10px">ava</div>
                <div>Ivan Semenovich</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "NavBar",
        props:{
            title:String
        }
    }
</script>

<style scoped>
    .navbar_wrapper{
        position: relative;
        top: 0;
        left: 0;
        height: 60px;
        z-index: 2;
        /*box-shadow: 0 4px 15px 0 rgba(0,0,0,.09);*/
        /*background-color: white;*/
        background-color: #f3f6f9;
        padding-left: 250px;
    }
    .navbar_content{
        display: flex;
        height: 100%;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        padding: 0 50px;
    }
    .page-header{
        font-size: 2rem;
        font-weight: 600;
    }

</style>
