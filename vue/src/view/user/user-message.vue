<template>
  <div class="user_message">
    <h3 class="title">消息中心</h3>
    <el-row class="main">
      <el-col :span="3">
        <el-menu default-active="0">
          <el-menu-item index="0">回复我的</el-menu-item>
          <el-menu-item index="1">@我的</el-menu-item>
          <el-menu-item index="2">收到的赞</el-menu-item>
          <el-menu-item index="3">系统消息</el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="21"></el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  computed: {
    userData () {
      return this.$store.state.userData.data
    }
  }
}
</script>

<style lang="less">
.user_message{
  .el-col:first-child{
    border-right: 1px solid #e6e6e6;
    min-height: 539px;
  }
  .el-menu{
    border: none;
  }
}
</style>
