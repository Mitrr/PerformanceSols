<template>
    <div class="fade" @click.self="$emit('close')">
        <div class="popup-content_wrapper" :style="{width: width, height: height}">
            <slot name="inner"></slot>
        </div>
    </div>
</template>

<script>

    export default {
        name: "Popup",
        props:{
          width:{
              type:String,
              default:'50%'
          },
          height:{
              type:String,
              default: 'auto'
          }
        },
    }
</script>

<style scoped>
    .fade{
        position: fixed;
        left: 0;
        top: 0;
        height: 100%;
        width: 100%;
        z-index: 10;
        background-color: rgba(46, 52, 68, 0.25);
        display: flex;
        flex-direction: row;
        align-items: center;
        backdrop-filter: blur(2px);
    }
    .popup-content_wrapper{
        margin: 0 auto;
        border-radius: 6px;
    }

    @media only screen and (max-width: 600px)  {
        .popup-content_wrapper{
            width: 100%!important;
        }
    }
</style>
