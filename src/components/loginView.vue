<template>
    <div class="bg">
        <div class="container">
            <div class="title">
                <a-icon type="right" style="margin-right: 5px;"/> 连接到你的音乐库
            </div>
            <div class="form">
                <div class="formItem">
                    <div class="f_label">URL地址</div>
                    <a-input placeholder="输入URL地址" v-model="inputArea.url" />
                </div>
                <div class="formItem">
                    <div class="f_label">用户名</div>
                    <a-input placeholder="输入用户名" v-model="inputArea.username" />
                </div>
                <div class="formItem">
                    <div class="f_label">密码</div>
                    <a-input-password placeholder="输入密码" v-model="inputArea.password" />
                </div>
            </div>
            <div class="loginButton" @click="loginController"><a-icon type="arrow-right" /></div>
            <div class="help">
                <div>需要帮助？</div>
                <div class="useTip" @click="toHelp">点击这里跳转到使用说明</div>
            </div>
        </div>
    </div>
</template>

<script>
const {ipcRenderer, shell} = require('electron')
const CryptoJS =require('crypto-js');
export default {
    beforeDestroy() {
        // 在组件销毁前设置标志位为 true
        this.loginDestroyed = true
    },
    data() {
        return {
            inputArea: {
                url: "",
                username: "",
                password: "",
            },
            loginDestroyed: false,
        }
    },
    methods: {
        // 生成随机数
        generateRandomString(length) {
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            let result = '';

            for (let i = 0; i < length; i++) {
                const randomIndex = Math.floor(Math.random() * characters.length);
                result += characters.charAt(randomIndex);
            }

            return result;
        },
        loginController(){
            if(this.loginDestroyed){
                return;
            }
            if(this.inputArea.url==""){
                this.$message.error('URL地址不能为空');
                return;
            }else if(!(this.inputArea.url.startsWith("http://") || (this.inputArea.url.startsWith("https://")))){
                this.$message.error('不合法的URL地址');
                return;
            }else if(this.inputArea.username==""){
                this.$message.error('用户名不能为空');
                return;
            }else if(this.inputArea.password==""){
                this.$message.error('密码不能为空');
                return;
            }
            // 如果最后带/，去掉
            if(this.inputArea.url.slice(-1)=='/'){
                this.inputArea.url=this.inputArea.url.slice(0,-1);
            }

            // 校验码，随机
            const salt = this.generateRandomString(6);
            const token = CryptoJS.MD5(this.inputArea.password + salt).toString();

            ipcRenderer.send('loginRequest', this.inputArea.url, this.inputArea.username, salt, token);
        },
        loginResult(event, response, salt, token){
            if(this.loginDestroyed){
                return;
            }
            if(response==null){
                this.$message.error('请求失败，请检查URL地址是否正确');
                return;
            }
            var status=response['subsonic-response'].status;
            if(status=='ok'){
                this.$message.success("登录成功!")

                this.$emit("getLogin", true);

                localStorage.setItem("username", this.inputArea.username);
                localStorage.setItem("salt", salt);
                localStorage.setItem("token", token);
                localStorage.setItem("url", this.inputArea.url)
            }else{
                this.$message.error('用户名或者密码错误!');
                return;
            }
        },
        toHelp(){
            shell.openExternal("https://gitee.com/Ryan-zhou/net-player");
        }
    },
    mounted() {
        ipcRenderer.on('loginResult', this.loginResult);
    },
    created() {

    },
}
</script>

<style scoped>
.useTip:hover{
    color: #4a79e7;
    cursor: pointer;
}
.useTip{
    transition: all ease-in-out .2s;
}
.help{
    display: flex;
   position: absolute;
   bottom: 30px;
   margin: 0 auto;
   left: 50%;
   transform: translateX(-50%);
}
.loginButton:hover{
    background-color: #325bba;
    cursor: pointer;
}
.loginButton{
    background-color: #4a79e7;
    color: white;
    font-size: 28px;
    position: absolute;
    bottom: 0;
    right: 0;
    width: 60px;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all ease-in-out .2s;
    border-top-left-radius: 10px;
}
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
    margin-top: 70px;
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
    overflow: hidden;
    position: relative;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
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