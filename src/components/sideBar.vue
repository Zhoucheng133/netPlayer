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

        <div class="aboutButton"></div>

        <div class="menu">
            <div class="item" style="margin-top: 30px;"><i class="bi bi-vinyl icon"></i>专辑</div>
            <div class="item"><i class="bi bi-mic icon"></i>艺人</div>
            <div class="item"><i class="bi bi-bookmark icon"></i>歌曲流派</div>
            <div class="item"><i class="bi bi-music-note-list icon"></i>所有歌曲</div>
            <div class="item"><i class="bi bi-heart icon"></i>喜欢的歌曲</div>
            <div class="divLine"></div>
            <div class="listText">创建的歌单</div>
            <div class="item"><i class="bi bi-list-ul icon"></i><div class="itemContainer">歌单123123123123</div></div>
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
    font-size: 16px;
    margin-right: 8px;
}
.item:hover{
    background-color: rgb(225, 225, 225);
    cursor: pointer;
}
.item{
    display: flex;
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