<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <div style="min-height: 100vh">
        <div class="main">
            <Card>
                <template v-slot:header>
                    <div class="card-title">Добавление работы</div>
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
            <Card>
                <template v-slot:header>
                    <div class="card-title">Входные параметры и формула</div>
                </template>
                <template v-slot:content>
                    <div @click="popUpFunc" class="enterV-button">
                        Редактировать параметры
                    </div>
                    <ul class="enterV-list">
                        <li v-for="index of 5" :key="index" >Параметр {{index}}</li>
                    </ul>
                </template>
            </Card>
        </div>
        <popup v-if="popupActive"></popup>
    </div>
</template>

<script>
    import Card from '../components/ui/Card';

    export default {
        name: "AddWork",
        components: {
                Card,
                popup: () => import('../components/ui/Popup')
            },
        data(){
            return{
                popupActive: false
            }
        },
        computed:{

        },
        methods: {
            popUpFunc(){
                this.popupActive = true
                // document.body.style.overflow = "hidden"
            }
        },
        mounted() {
        }
    }
</script>

<style scoped>
    .main {
        /* min-height: 100vh; */
        display: flex;
        flex-direction: row;

    }
    /* .main > Card {
        flex: 1;
    } */
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
    .enterV-button {
        width: max-content;
        background-color: #3367d6;
        color: #fafafa;
        font-weight: 300;
        border-radius: 2px;
        padding: 10px 15px;
        cursor: pointer;
        box-shadow: 0 1px 5px 2px rgba(0,0,0,.2);
        border: 1px solid #3367d6;
        transition:all 0.6s ease;
    }
    .enterV-button:hover {
        color: #3367D6;
        background-color: white;
        box-shadow: none;
        transition:all 0.6s ease;
        border: 1px solid #3367D6;
    }
</style>
