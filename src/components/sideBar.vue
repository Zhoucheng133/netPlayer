<template>
    <div class="main">
        <div class="userinfo">
            <svg t="1691218520569" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4599" width="30" height="30"><path d="M512 62.08A449.92 449.92 0 1 0 961.92 512 449.92 449.92 0 0 0 512 62.08z m0 135.04a135.04 135.04 0 1 1-135.04 135.04A134.72 134.72 0 0 1 512 197.12z m0 640a323.84 323.84 0 0 1-269.76-144.96c0-89.6 179.84-138.56 269.76-138.56s268.48 48.96 269.76 138.56A323.84 323.84 0 0 1 512 835.84z" p-id="4600" fill="#707070"></path></svg>
            <div class="name">{{ username }}</div>
        </div>
        <div class="userOp">
            <div class="changepButton">修改密码</div>
            <div class="logoutButton" @click="logoutController">注销</div>
        </div>

        <div class="aboutButton">关于netPlayer</div>

        <div class="menu">
            <div class="item" style="margin-top: 30px;">
                <svg class="icon" width="16" height="16" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="24" cy="24" r="18" stroke="#333" stroke-width="4"/><path d="M13 24C13 17.9249 17.9249 13 24 13" stroke="#333" stroke-width="4" stroke-linecap="round"/><circle cx="24" cy="24" r="5" fill="none" stroke="#333" stroke-width="4"/></svg>
                专辑
            </div>
            <div class="item">
                <svg class="icon" width="16" height="16" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="17" y="4" width="14" height="27" rx="7" fill="none" stroke="#333" stroke-width="4" stroke-linejoin="round"/><path d="M9 23C9 31.2843 15.7157 38 24 38C32.2843 38 39 31.2843 39 23" stroke="#333" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M24 38V44" stroke="#333" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>
                艺人
            </div>
            <div class="item">
                <svg class="icon" width="16" height="16" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M34 10V4H8V38L14 35" stroke="#333" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M14 44V10H40V44L27 37.7273L14 44Z" fill="none" stroke="#333" stroke-width="4" stroke-linejoin="round"/></svg>
                歌曲流派
            </div>
            <div class="item">
                <svg class="icon" width="16" height="16" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M24 19H40" stroke="#333" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M24 10H40" stroke="#333" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M8 38H40" stroke="#333" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M8 28H40" stroke="#333" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M8 10L16 15L8 20V10Z" fill="none" stroke="#333" stroke-width="4" stroke-linejoin="round"/></svg>
                所有歌曲
            </div>
            <div class="item">
                <svg class="icon" width="16" height="16" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15 8C8.92487 8 4 12.9249 4 19C4 30 17 40 24 42.3262C31 40 44 30 44 19C44 12.9249 39.0751 8 33 8C29.2797 8 25.9907 9.8469 24 12.6738C22.0093 9.8469 18.7203 8 15 8Z" fill="none" stroke="#333" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>
                喜欢的歌曲
            </div>
            <div class="divLine"></div>
            <div class="listText">创建的歌单</div>
            <div class="item">
                <svg class="icon" width="16" height="16" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="8" y="4" width="32" height="40" rx="2" fill="none" stroke="#333" stroke-width="4" stroke-linejoin="round"/><path d="M21 14H33" stroke="#333" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M21 24H33" stroke="#333" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M21 34H33" stroke="#333" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path fill-rule="evenodd" clip-rule="evenodd" d="M15 16C16.1046 16 17 15.1046 17 14C17 12.8954 16.1046 12 15 12C13.8954 12 13 12.8954 13 14C13 15.1046 13.8954 16 15 16Z" fill="#333"/><path fill-rule="evenodd" clip-rule="evenodd" d="M15 26C16.1046 26 17 25.1046 17 24C17 22.8954 16.1046 22 15 22C13.8954 22 13 22.8954 13 24C13 25.1046 13.8954 26 15 26Z" fill="#333"/><path fill-rule="evenodd" clip-rule="evenodd" d="M15 36C16.1046 36 17 35.1046 17 34C17 32.8954 16.1046 32 15 32C13.8954 32 13 32.8954 13 34C13 35.1046 13.8954 36 15 36Z" fill="#333"/></svg>
                <div class="itemContainer">
                    歌单123123123123
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            username: "",
        }
    },
    methods: {
        logoutController(){
            var that=this;
            this.$confirm({
                title: '你确定要注销吗?',
                cancelText: '取消',
                okText: '确定',
                onOk() {
                    that.$emit("logoutMain");
                },
                onCancel() {
                },
                class: 'test',
            });
        }
    },
    mounted() {
        
    },
    created() {
        this.username=localStorage.getItem("username")
    },
}
</script>

<style scoped>
.aboutButton:hover{
    color: #1890ff;
    cursor: pointer;
}
.aboutButton{
    position: absolute;
    bottom: 18px;
    left: 50%;
    color: grey;
    user-select: none;
    transform: translateX(-50%);
    transition: all ease-in-out .3s;
}
.itemContainer{
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
}
.listText{
    user-select: none;
    width: 180px;
    padding: 0px 10px 10px 20px;
    display: flex;
    justify-content: flex-start;
    color: grey;
}
.divLine{
    margin-top: 5px;
    margin-bottom: 5px;
    border: 1px solid lightgrey;
    background-color: lightgrey;
    width: 80%;
}
.menu{
    margin-top: 30px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: calc(100vh - 160px);
    overflow: scroll;
}
.icon{
    margin-right: 8px;
}
.item:hover{
    background-color: rgb(225, 225, 225);
    cursor: pointer;
}
.item{
    display: flex;
    align-items: center;
    font-size: 16px;
    width: 180px;
    padding: 10px 10px 10px 20px;
    border-radius: 10px;
    user-select: none;
    transition: all ease-in-out .3s;
    text-align: left;
    white-space: nowrap;
    justify-content: flex-start;
    text-overflow: ellipsis;
}
.changepButton:hover{
    color: #1890ff;
}
.logoutButton:hover, .changepButton:hover{
    cursor: pointer;
}
.logoutButton, .changepButton{
    user-select: none;
    transition: all ease-in-out .3s;
}
.logoutButton:hover{
    color: red;
}
.logoutButton{
    margin-left: 10px;
}
.userOp{
    display: flex;
    position: absolute;
    bottom: 50px;
    left: 50%;
    transform: translateX(-50%);
}
.name{
    margin-left: 5px;
    max-width: 100px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.userinfo{
    max-width: 180px;
    padding: 10px 10px 10px 10px;
    border-radius: 10px;
    font-size: 20px;
    user-select: none;
    display: flex;
    position: absolute;
    bottom: 70px;
    left: 50%;
    transform: translateX(-50%);
    align-items: center;
}
.main{
    display: flex;
    flex-direction: column;
    position: absolute;
    width: 200px;
    height: 100vh;
    background-color: rgb(242, 242, 242);
    align-items: center;
    overflow: scroll;
}
</style>