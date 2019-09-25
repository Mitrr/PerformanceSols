<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <div style="min-height: 100vh">
        <Card style="border-radius: 6px;height: 100vh">
            <template v-slot:header>
                <div style="color: white">Добавление работы</div>
            </template>
            <template v-slot:content>
                <div class="inputs-group">
                    <div>
                        <input type="text" name="name" placeholder="Введите название...">
                    </div>
                    <div>
                        <input type="text" name="name" placeholder="Цена для рабочих..."><span> , рублей</span>
                    </div>
                    <div>
                        <input type="text" name="name" placeholder="Цена для заказчика..."><span> , рублей</span>
                    </div>
                </div>


                <p>Коэффициент сегмента</p>
                <div class="radio_container">
                    <div style="flex: 1">
                        <input type="radio" id="com" name="coeff" value="1" checked>
                        <label for="com" style="padding-left: 5px;">Коммерческий</label>
                    </div>
                    <div style="flex: 1;">
                        <input type="radio" id="st" name="coeff" value="1.2">
                        <label for="st" style="padding-left: 5px;">Стандартный</label>
                    </div>
                    <div style="flex: 1">
                        <input type="radio" id="prem" name="coeff" value="2">
                        <label for="prem" style="padding-left: 5px;">Премиум</label>
                    </div>
                </div>
            </template>
        </Card>
    </div>
</template>

<script>
    import Card from '../components/ui/Card';

    export default {
        name: "AddWork",
        components:{Card},
        data(){
            return{

            }
        },
        computed:{

        },
        mounted() {
        }
    }
</script>

<style scoped>
    .inputs-group>div>input{
        height: 40px;
        font-size: 0.85rem;
        margin-bottom: 10px;
        border-radius: 4px;
        border: 1px solid #0991ff;
        width: 50%;
        padding-left: 10px;
    }
    .radio_container{
        display: flex;
        width: 80%;
        flex-direction: row;
    }
    .inputs-group{
        width: 100%;
        display: flex;
        flex-direction: column;
    }
    .inputs-group>div{
        margin-bottom: 20px;
    }
</style>
