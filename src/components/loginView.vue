<template>
    <div class="bg">
        <div class="container">
            <div class="title">
                <a-icon type="right" style="margin-right: 5px;"/> 连接到你的音乐库
            </div>
            <div class="form">
                <div class="formItem">
                    <div class="f_label">URL地址</div>
                    <a-input placeholder="输入URL地址" />
                </div>
                <div class="formItem">
                    <div class="f_label">用户名</div>
                    <a-input placeholder="输入用户名" />
                </div>
                <div class="formItem">
                    <div class="f_label">密码</div>
                    <a-input-password placeholder="输入密码" />
                </div>
            </div>
            <a-button>测试按钮</a-button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            inputArea: {
                url: "",
                username: "",
                password: "",
            }
        }
    },
    methods: {
        
    },
    mounted() {
        
    },
    created() {
        
    },
}
</script>

<style scoped>
.f_label{
    display: flex;
    align-items: center;
    justify-content: flex-end;
    font-size: 16px;
}
.formItem{
    grid-gap: 10px;
    display: grid;
    grid-template-columns: 80px 240px;
    margin-bottom: 20px;
}
.form{
    user-select: none;
    margin-top: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.title{
    /* color: #4C83FF; */
    font-size: 24px;
    align-self: flex-start;
}
.container{
    user-select: none;
    width: 500px;
    height: 400px;
    background-color: white;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    padding: 30px 20px 20px 20px;
}
.bg{
    padding-top: 30px;
    height: 100vh;
    width: 100vw;
    justify-content: center;
    align-items: center;
    display: flex;
    background-image: linear-gradient( 135deg, #2AFADF 10%, #4C83FF 100%);
}
</style>