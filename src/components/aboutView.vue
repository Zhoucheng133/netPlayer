<template>
    <div class="bg">
        <div class="container">
            <img src="@/assets/icon.png" alt="" width="200px">
            <div class="name">netPlayer</div>
            <div class="version">v{{ version }}&nbsp;Dev</div>
            <div class="copyright">Developed by zhouc</div>
            <div class="opensource" @click="showLicenses">About the open source licenses</div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            version: "",
        }
    },
    methods: {
        showLicenses(){
            const h = this.$createElement;
            this.$info({
                title: 'Open source licenses',
                content: h('div', {}, [
                    h('div', 'Vue.js (MIT License)'),
                    h('div', 'Ant Design Vue (MIT License)'),
                    h('div', 'axios (MIT License)'),
                    h('div', 'crypto-js (MIT License)'),
                ]),
                okText: "完成",
                onOk() { },
            });
        }
    },
    mounted() {
        
    },
    created() {
        this.version = process.env.VUE_APP_VERSION
    },
}
</script>

<style scoped>
.opensource:hover{
    cursor: pointer;
    color: #1890ff;
}
.opensource{
    color: rgb(170, 170, 170);
    transition: all ease-in-out .3s;
}
.copyright{
    margin-top: 30px;
}
.name{
    font-size: 28px;
    font-weight: bold;
}
.container{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.bg{
    user-select: none;
    display: flex;
    height: calc(100vh - 30px);
    width: 100%;
    justify-content: center;
    align-items: center;
}
</style>