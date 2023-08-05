<template>
    <div class="main">
        <div class="userinfo">
            <svg t="1691218520569" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4599" width="30" height="30"><path d="M512 62.08A449.92 449.92 0 1 0 961.92 512 449.92 449.92 0 0 0 512 62.08z m0 135.04a135.04 135.04 0 1 1-135.04 135.04A134.72 134.72 0 0 1 512 197.12z m0 640a323.84 323.84 0 0 1-269.76-144.96c0-89.6 179.84-138.56 269.76-138.56s268.48 48.96 269.76 138.56A323.84 323.84 0 0 1 512 835.84z" p-id="4600" fill="#707070"></path></svg>
            <div class="name">{{ username }}</div>
        </div>
        <div class="userOp">
            <div class="changepButton">修改密码</div>
            <div class="logoutButton">注销</div>
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
        
    },
    mounted() {
        
    },
    created() {
        this.username=localStorage.getItem("username")
    },
}
</script>

<style scoped>
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
    bottom: 20px;
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
    width: 160px;
    padding: 10px 10px 10px 10px;
    border-radius: 10px;
    font-size: 20px;
    user-select: none;
    display: flex;
    position: absolute;
    bottom: 40px;
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
}
</style>