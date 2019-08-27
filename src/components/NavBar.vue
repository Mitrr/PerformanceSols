<template>
    <div class="navbar_wrapper">
        <div class="navbar_content">
            <div>item</div>
            <div>item</div>
            <div>item</div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "NavBar"
    }
</script>

<style scoped>
    .navbar_wrapper{
        position: relative;
        top: 0;
        left: 0;
        height: 60px;
        z-index: 2;
        box-shadow: 0 4px 15px 0 rgba(0,0,0,.09);
        background-color: white;
        padding-left: 250px;
    }
    .navbar_content{
        display: flex;
        height: 100%;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        padding: 0 20px;
    }

</style>
