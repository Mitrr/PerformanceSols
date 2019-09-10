<template>
    <li>
        <div :class="{bold: isFolder}" @click="toggle"
                @dblclick="makeFolder">

            <span @click="$emit('materials', item.materials)">
                {{ item.name }}
            </span>

            <span v-if="isFolder"
                  >
                [{{ isOpen ? '-' : '+' }}]
            </span>
        </div>
        <ul v-show="isOpen" v-if="isFolder">
            <tree-item
                    class="item"
                    v-for="(child, index) in item.children"
                    :key="index"
                    :item="child"
                    @materials="$emit('materials', $event)"
            ></tree-item>
<!--            <li class="add" @click="$emit('add-item', item)">+</li>-->
        </ul>
    </li>
</template>

<script>
    export default {
        name: "TreeItem",
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
            makeFolder: function (item) {
                this.set(item, 'children', []);
                this.addItem(item)
            },
            addItem: function (item) {
                item.children.push({
                    name: 'new stuff'
                })
            },
            setMaterials:function (materials) {
                console.log('pidaras');
            }
        }
    }
</script>

<style scoped>
    .bold {
        font-weight: bold;
    }
</style>
