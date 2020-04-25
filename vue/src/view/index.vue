<template>
  <div class="bg-purple-light">
    <!-- 回到顶部按钮 -->
    <el-backtop style="color:#99a9bf"></el-backtop>

    <!-- 标题导航栏 -->
    <el-row
      style="position:fixed;top:0;z-index:10;width:100%;box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)"
    >
      <el-col :span="4" class="hidden-md-and-down">
        <div class="grid-content bg-purple-dark header"></div>
      </el-col>
      <el-col :md="6" :sm="24">
        <div class="grid-content bg-purple-dark header" style="font-size:30px">狗剩小站</div>
      </el-col>
      <el-col :lg="14" :md="18">
        <div class="grid-content bg-purple-dark header">
          <el-menu
            mode="horizontal"
            default-active="/"
            background-color="#99a9bf"
            active-text-color="#fff"
            text-color="#fff"
            style="border-bottom:none"
            :router="true"
          >
            <el-menu-item index="/" style="min-width:100px">首页</el-menu-item>
            <el-submenu style="min-width:100px" class="sort" index="sort">
              <template slot="title"><span>分类</span></template>
              <el-menu-item index='/sort?name=生活'>生活</el-menu-item>
              <el-menu-item index='/sort?name=游戏'>游戏</el-menu-item>
              <el-menu-item index='/sort?name=动漫'>动漫</el-menu-item>
            </el-submenu>
            <el-menu-item index="discount" style="min-width:100px">舞蹈区</el-menu-item>
            <el-menu-item style="min-width:100px">小应用</el-menu-item>
            <el-menu-item style="min-width:100px" @click="test">空位</el-menu-item>
            <el-submenu style="min-width:100px" class="user" index="user" v-if="!isLogin">
              <template slot="title">
                <i class="el-icon-user" style="color:white;font-size:20px"></i>
              </template>
              <el-menu-item index="sign-in">登录</el-menu-item>
              <el-menu-item index="sign-up">注册</el-menu-item>
            </el-submenu>
            <el-submenu style="min-width:100px" class="user" index="user" v-if="isLogin">
              <template slot="title">
                <span>{{userName}}</span>
              </template>
              <el-menu-item :index="'/user/data?id='+userId">个人中心</el-menu-item>
              <el-menu-item index="/edit">发帖</el-menu-item>
              <el-menu-item :index="'/user/post?id='+userId">我的帖子</el-menu-item>
              <el-menu-item :index="'/user/favor?id='+userId">我的收藏</el-menu-item>
              <el-menu-item :index="'/user/message?id='+userId">消息</el-menu-item>
              <el-menu-item index="sign-out" @click="signout">退出登录</el-menu-item>
            </el-submenu>
          </el-menu>
        </div>
      </el-col>
    </el-row>

    <!-- 间隔元素 -->
    <el-row class="topSide hidden-md-and-up">
      <el-col :span="24" style="height:60px" class="bg-purple-light"></el-col>
    </el-row>

    <el-row style="margin-top:60px" class="topSide" type="flex" justify="center">
      <el-col class="hidden-md-and-down" style="width:220px;height:20px"></el-col>
      <el-col style="width:850px;height:20px;text-align:left" class="bg-purple-light">
        <el-breadcrumb separator="/" v-if="showBreadNav">
          <el-breadcrumb-item v-for="(item, index) in breadNav" :key="index"
          :to="{name: item.to}">{{item.name}}</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
    </el-row>

    <!-- 中间内容 -->
    <router-view></router-view>

    <!-- 间隔元素 -->
    <el-row>
      <el-col :span="24" style="height:20px" class="bg-purple-light"></el-col>
    </el-row>

    <!-- 底部信息 -->
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple-dark footer">网站信息</div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import indexData from './index-data.vue'
export default {
  data () {
    return {
      // containerHeight: 0
    }
  },
  computed: {
    isLogin () {
      return this.$store.state.isLogin
    },
    userName () {
      return this.$store.state.userName
    },
    breadNav () {
      return this.$store.state.breadNav
    },
    showBreadNav () {
      return this.$store.state.showBreadNav
    },
    userId () {
      return this.$store.state.userId
    }
  },
  methods: {
    signout () {
      localStorage.removeItem('userInfo')
      localStorage.removeItem('dogleft_userToken')
      this.$router.push('/')
    },
    test () {
      console.log(this.$store.state.showBreadNav)
    }
  },
  components: {
    indexData
  }
}
</script>

<style>
html,
body {
  height: 100%;
  margin: 0;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.bg-white{
  background: #fff
}
.grid-content {
  min-height: 36px;
}
.el-col {
  text-align: center;
}
.header {
  height: 60px;
  line-height: 60px;
}
.footer {
  height: 120px;
  line-height: 120px;
}
.el-breadcrumb{
  line-height: 20px;
}
.el-menu {
  height: 60px;
}
.header .el-menu .el-menu-item,
.el-submenu,
.header .el-menu .el-submenu .el-submenu__title {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  font-size: 16px;
  border-bottom: none;
}
.el-submenu span{
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  font-size: 16px;
}
.el-submenu__icon-arrow{
  /* 取消导航栏下拉菜单的箭头 */
  display: none;
}
</style>
