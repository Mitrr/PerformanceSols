<template>
    <li>
        <div :class="{bold: isFolder}" @click="toggle">
            <span>
                {{ item.name }}
            </span>

            <span v-if="isFolder">
                [{{ isOpen ? '-' : '+' }}]
            </span>
        </div>
        <ul v-show="isOpen" v-if="isFolder">
            <tree-item
                    class="item"
                    v-for="(child, index) in item.children"
                    :key="index"
                    :item="child"
            ></tree-item>
        </ul>
    </li>
</template>

<script>
    export default {
        name: "BasicTreeItem",
        props:{
            item:Object
        },
        data(){
            return{
                isOpen: false,
            }
        },
        computed: {
            isFolder() {
                return this.item.children && this.item.children.length
            }
        },
        methods:{
            toggle() {
                if (this.isFolder) {
                    this.isOpen = !this.isOpen
                }
            },
        }
    }
</script>

<style scoped>
    .bold {
        font-weight: bold;
    }
</style>
