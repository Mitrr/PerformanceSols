<template>
    <li v-if="item.name">
        <div :class="{bold: isFolder}" @click="toggle" class="row-flex" style="align-items: center">

            <span v-if="!showEdit" @click="$emit('materials', item)" style="margin-right: 5px">
                {{ item.name }}
            </span>

            <input v-else class="node-input" type="text" name="name"
                   placeholder="Название раздела"
                   v-model="nodeName"
                   @keyup.enter="editNode(item)">

            <span style="margin-right: 5px">{{ item.code }}</span>

            <span v-if="isFolder">
                [{{ isOpen ? '-' : '+' }}]
            </span>

            <span v-else @click="makeFolder" style="margin: 0 5px">
                <icon :icon="'add_circle_outline'"></icon>
            </span>

            <span @click="deleteNode" style="margin: 0 5px">
                <icon :icon="'delete_outline'"></icon>
            </span>

            <span style="margin: 0 5px" @click="openNodeEditing">
                <icon :icon="'edit'"></icon>
            </span>
        </div>
        <ul v-show="isOpen" v-if="isFolder">
            <tree-item
                    class="item"
                    v-for="(child, index) in item.children"
                    :key="index"
                    :item="child"
                    @make-folder="$emit('make-folder', $event)"
                    @materials="$emit('materials', $event)"
                    @delete-node="$emit('delete-node',$event)"
            >
            </tree-item>
            <li v-if="!showInput" class="add active-blue-color pointered" @click.stop="openNewNodeInput(item.id)"
            >добавить</li>

            <li v-else>
                <input class="node-input" type="text" name="name"
                       placeholder="Название раздела"
                       v-model="nodeName"
                       @keyup.enter="saveNode(item)"
                       @keyup.esc="clearInput"
                >
            </li>
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
                showInput:false,
                nodeName: '',
                parent_id:'',
                showEdit:false
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
            makeFolder: function () {
                this.$emit('make-folder', this.item);
                this.isOpen = true;
            },
            openNewNodeInput(id){
                this.parent_id = id;
                this.showInput = true;
            },
            async saveNode(item){
                this.showInput = false;

                let payload = {};
                payload.parent_id = this.parent_id;
                payload.name = this.nodeName;

                if (payload.name && payload.name !== this.item.name){
                    let res = await this.$store.dispatch('worksHandbook/saveNode',payload);

                    if (res){
                        item.children.push(res);
                    }
                }
            },
            deleteNode(){
                this.$emit('delete-node',this.item);
                this.isOpen = false;
            },
            editNode(item){
                if (this.nodeName && this.nodeName !== item.name){
                    let payload = Object.assign({},item);
                    payload.name = this.nodeName;
                    this.$store.dispatch('worksHandbook/editNode',payload).then( () => {
                        item.name = this.nodeName;
                    });
                }
                this.showEdit = false;
            },
            openNodeEditing(){
                this.showEdit = true;
                this.nodeName = this.item.name;
            },
            clearInput(){
                this.nodeName = '';
                this.showInput = false;
            },
        }
    }
</script>

<style scoped>
    $w:    bold;

    .bold {
        font-weight: $w;
    }
</style>
