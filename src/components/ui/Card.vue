<template>
    <div class="card">
        <div class="header_wrapper" v-if="header">
            <slot name="header"></slot>
        </div>
        <div class="card-content">
            <slot name="content"></slot>
        </div>
        <div class="card-footer">
            <slot name="footer"></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Card",
        props:{
            header:{
                type:Boolean,
                default:true
            },
            footer:{
                type: Boolean,
                default: true
            }
        }
    }
</script>

<style scoped>
    .card{
        min-height: 150px;
        min-width: 150px;
        background-color: white;
        border-radius: 2px;
        overflow-wrap: break-word;
        box-shadow: 0 1px 15px 1px rgba(69,65,78,.08);
        flex: 1;
        margin: 0 30px 30px 30px;
        border-radius: 6px;
        overflow: hidden;
        position: relative;
    }
    .header_wrapper{
        /*box-shadow: 0 12px 20px -10px rgba(9, 145, 255, 0.2), 0 4px 20px 0px rgba(0, 0, 0, 0.12), 0 7px 8px -5px rgba(9, 145, 255, 0.2);*/
        /*margin: -20px 15px 0;*/
        border-radius: 3px;
        width: 100%;
        /* margin: 0 auto; */
        /*position: relative;*/
        /*top: -21px;*/
        display: flex;
        align-items: center;
        /*background-color: #39a9f4;*/
        justify-content: space-between;
        /*min-height: 65px;*/
        min-height: 40px;
        color: #495057;
        padding: 15px 20px 20px;
    }
    .card-content{
        padding: 0 20px 20px;
    }
    .card-footer{
        min-height: 2px;
        /*position: absolute;*/
        /*bottom: 0;*/
        width: 100%;
        padding: 10px 20px;
    }


</style>
