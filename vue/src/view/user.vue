<template>
  <div class="userView">
    <el-row class="user_header">
      <el-col :span="6" class="info">
        <div class="avatar">
          <el-avatar :size="60">
            <img src="../assets/img/avatar.png">
          </el-avatar>
        </div>
        <div class="name_info">
          <p>{{targetUserData.userName}}</p>
          <p>{{signName}}</p>
          <el-input v-model="signNameEdit" class="signNameEdit" @click.native="signNameFocus" @blur="signNameBlur" v-if="isUser"></el-input>
        </div>
      </el-col>
      <el-col :span="3" class="subscription">
        <el-col :span="12">
          <p>关注</p>
          <p>{{targetUserData.subscriptions.length}}</p>
        </el-col>
        <el-col :span="12">
          <p>粉丝</p>
          <p>{{targetUserData.fans.length}}</p>
        </el-col>
      </el-col>
    </el-row>

    <el-row class="main" ref="main">
      <el-col :span="4" class="user_aside bg-white" :style="'height:'+mainHeight+'px'">
        <el-menu background-color="#fff" class="aside_menu" :router="true">
          <el-menu-item :index="'data?id='+targetId">用户信息</el-menu-item>
          <el-menu-item :index="'post?id='+targetId">{{isUser?'我':'他'}}的帖子</el-menu-item>
          <el-menu-item :index="'favor?id='+targetId">{{isUser?'我':'他'}}的收藏</el-menu-item>
          <el-menu-item :index="'message?id='+targetId" v-if="isUser">消息</el-menu-item>
        </el-menu>
      </el-col>

      <el-col :span="20" class="user_main bg-white">
        <router-view v-if="true"></router-view>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      mainHeight: 600,
      signName: '',
      signNameEdit: ''
    }
  },
  computed: {
    targetUserData () {
      return this.$store.state.userData
    },
    userId () {
      return this.$store.state.userId
    },
    targetId () {
      return this.$route.query.id
    },
    isUser () {
      return this.userId === this.targetId
    }
  },
  methods: {
    signNameFocus (e) {
      e.target.style.backgroundColor = '#fff'
      e.target.style.opcity = 1
      e.target.value = this.signName
    },
    signNameBlur (e) {
      e.target.style.backgroundColor = 'rgba(255,255,255,0)'
      if (e.target.value !== this.targetUserData.signName) {
        axios.post('api/updateData', {dataName: 'signName', data: e.target.value, userId: this.targetUserData.userId})
        this.signName = this.signNameEdit
      }
      e.target.value = ''
    }
  },
  created () {
    // 隐藏面包屑导航
    this.$store.commit('setShowBreadNav', false)

    // 获取目标基本信息，存到vuex
    axios.get('/api/getUserData?userId=' + this.targetId).then(res => {
      this.$store.dispatch('getUserData', res.data)
      this.signName = res.data.signName
    }).catch(err => {
      console.log(err)
    })
  },
  beforeRouteLeave (to, from, next) {
    // 显示面包屑导航
    this.$store.commit('setShowBreadNav', true)
    next()
  }
}
</script>

<style lang="less">
.userView{
  width: 1200px;
  margin: 0 auto;
  overflow: hidden;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  .user_header{
    height: 150px;
    background: url(../assets/img/user-head-bg.png);
    position: relative;
    .info{
      position: absolute;
      left: 100px;
      text-align: left;
      bottom: 12px;
      color: white;
      .avatar{
        display: inline-block;
      }
      .name_info{
        display: inline-block;
        margin-left: 10px;
        position: relative;
        p:first-child{
          font-size: 22px;
          font-weight: bold;
          margin: 0;
          position: relative;
          bottom: 18px;
        }
        p:nth-of-type(2){
          font-size: 12px;
          margin: 0;
          position: relative;
          bottom: 12px;
        }
        .signNameEdit{
          height: 30px;
          position: absolute;
          top: 14.5px;
          left: -0.5px;
        }
        .el-input__inner{
          height: 20px;
          width: 400px;
          background-color: rgba(255, 255, 255, 0);
          font-size: 12px;
          padding-left: 0;
          border-color: rgba(0,0,0,0);
        }
        .el-input__inner:hover{
          border-color: #e6e6e6;
        }
      }
    }
    .subscription{
      position: absolute;
      right: 60px;
      bottom: 10px;
      height: 64px;
      color: white;
      p{
        font-size: 14px;
        margin-top: 0;
      }
    }
  }
  .main{
    background-color: #fff;
  }
  .user_aside{
    min-height: 400px;
    .aside_menu{
      border: none;
    }
  }
  .user_main{
    right: 0;
    min-height: 600px;
    border-left: solid 1px #e6e6e6;
      .title{
      text-align: left;
      border-bottom: 1px solid #e6e6e6;
      margin: 0;
      padding-left: 10px;
      height: 60px;
      line-height: 60px;
      font-weight: normal;
    }
  }
}
</style>
