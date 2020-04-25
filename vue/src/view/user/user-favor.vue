<template>
  <div class="post_side">
    <h3 class="title">{{targetUserData.userName}}的帖子</h3>
    <div class="main">
      <el-row class="filter bg-purple">
        <el-col :span="8" class="filter_style">
          <el-menu mode="horizontal" background-color="#d3dce6" text-color="#000" active-text-color="#409EFF" default-active="all" @select="checkStyle">
            <el-menu-item index="all">全部</el-menu-item>
            <el-menu-item index="life">生活</el-menu-item>
            <el-menu-item index="game">游戏</el-menu-item>
            <el-menu-item index="bilibili">二次元</el-menu-item>
          </el-menu>
        </el-col>
        <el-col :span="5" class="filter_order">
            <el-menu mode="horizontal" background-color="#d3dce6" text-color="#000" active-text-color="#409EFF" default-active="time" @select="checkOrder">
            <el-menu-item index="time">时间</el-menu-item>
            <el-menu-item index="good">点赞</el-menu-item>
            <el-menu-item index="comment">评论</el-menu-item>
          </el-menu>
        </el-col>
        <el-col :span="2" style="float:right">排序方式：</el-col>
      </el-row>

      <el-row
        v-for="(item, index) in favorData"
        :key="index"
        class="item"
        type="flex"
        align="middle"
      >
        <el-col :span="6" class="itemPic">
          <router-link :to="{name: 'Detail',query:{id:item.id}}">
              <img :src="item.indexImg" height="150px" width="220px" />
          </router-link>
        </el-col>
        <el-col :span="17" class="itemContent">
          <div class="title">
            <el-tag type="info">{{item.sort}}</el-tag>
            <el-link :underline="false" :href="'#/detail?id='+item.id">
                <h3>{{item.title}}</h3>
              </el-link>
          </div>
          <div class="info">
            <span class="time">
              <i class="el-icon-time"></i>
              {{item.time}}
            </span>
            <span class="comment">
              <i class="el-icon-chat-dot-round"></i>
              {{item.comments}}
            </span>
            <span class="like">点赞：({{item.likes}})</span>
          </div>
          <div class="intro">
            <span>{{item.indexContent}}</span>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      style: 'all',
      order: 'time',
      favorData: []
    }
  },
  computed: {
    targetUserData () {
      return this.$store.state.userData
    }
  },
  methods: {
    checkOrder (index) {
      this.order = index
    },
    checkStyle (index) {
      this.style = index
    }
  },
  created () {
    axios.post('api/getFavorData', {arr: this.targetUserData.favors, userId: this.targetUserData.userId}).then(res => {
      this.favorData = res.data.reverse()
    }).catch(err => {
      console.log(err)
    })
  }
}
</script>

<style lang="less">
.post_side {
  .main {
    width: 950px;
    margin: 0 auto;
    border: 1px solid #e6e6e6;

    .filter {
      height: 40px;
      font-size: 12px;
      .el-col {
        height: 40px;
        line-height: 40px;
        text-align: left;
      }
      .filter_style{
        margin-left: 20px;
      }
      .filter_order{
        float: right;
      }
      .el-menu{
        height: 40px;
        border-bottom: none;
      }
      .el-menu-item{
        font-size: 12px;
        height: 40px;
        line-height: 40px;
        border-bottom: none;
      }
    }

    .item {
      height: 180px;
      border-bottom: 1px solid #e6e6e6;
    }
    .itemContent {
      height: 154px;
      .title {
        border-bottom: none;
        height: 30px;
        line-height: 30px;
      }
      h3 {
        margin: 0;
        height: 30px;
        line-height: 30px;
      }
      .info {
        height: 30px;
        font-size: 12px;
        color: rgba(0, 0, 0, 0.5);
        position: relative;
        margin-top: 10px;
        .time {
          position: absolute;
          left: 10px;
        }
        .comment {
          position: absolute;
          left: 140px;
        }
        .like {
          position: absolute;
          right: 15px;
        }
      }
      .intro {
        text-align: left;
        font-size: 12px;
        line-height: 22px;
        color: rgba(0, 0, 0, 0.5);
        padding-left: 10px;
      }
    }
  }
}
</style>
