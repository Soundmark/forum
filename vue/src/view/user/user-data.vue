<template>
  <div class="user_data">
    <h3 class="title">{{targetUserData.userName}}的信息</h3>
    <div>
      <span>用户名：{{targetUserData.userName}}</span>
      <!-- <el-button>1</el-button> -->
      <!-- <div>
        <el-input class="nameEdit"></el-input>
        <el-button>1</el-button>
        <el-button>1</el-button>
      </div> -->
    </div>
    <div>用户ID：{{targetUserData.userId}}</div>
    <div>邮箱：{{targetUserData.email}}</div>
    <div>性别：{{targetUserData.gender}}</div>
    <div>生日：{{targetUserData.birthday}}</div>
    <div>用户积分：{{targetUserData.integral}}</div>
    <div>用户等级：{{targetUserData.level}}</div>
    <div>注册时间：{{targetUserData.registerTime}}</div>
  </div>
</template>

<script>
export default {
  computed: {
    targetUserData () {
      return this.$store.state.userData
    },
    userId () {
      return this.$store.state.userId
    },
    isUser () {
      return this.userId === this.targetUserData.userId
    }
  },
  created () {
    // console.log(this.$route)
  }
}
</script>

<style lang="less">
.user_data{
  text-align: left;
  div{
    padding-left: 50px;
    margin-top: 30px;
    position: relative;
  }
  .nameEdit{
    width: 200px;
    position: absolute;
    left: 112.5px;
    top: -3.5px;
    .el-input__inner{
      height: 30px;
      background-color: rgba(0, 0, 0, 0);
      padding-left: 0;
      font-size: 16px;
    }
  }
}
</style>
