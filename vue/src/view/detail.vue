<template>
  <el-row type="flex" justify="center" class="bg-purple-light detail" ref="container">
    <el-col :span="3" class="hidden-md-and-down" style="width:200px;margin-right:20px">
      <div class="grid-content main aside" ref="aside">侧边导航</div>
    </el-col>
    <el-col :xl="15" :lg="16" :md="18" :sm="22" :xs="24" style="width:850px">
      <div class="grid-content main">
        <h2>{{detailData.title}}</h2>
        <el-row class="info">
          <el-col :span="5" class="author">
            <span>作者：</span>
            <router-link :to="{name: 'UserData', query: {id: detailData.userId}}">{{detailData.author}}</router-link>
          </el-col>
          <el-col :span="6" class="time">最后发布于：{{detailData.time}}</el-col>
          <el-col :span="1" class="edit">
            <router-link :to="{name: 'Edit', query: {id: detailData.id}}" v-if="isMyItem">编辑</router-link>
          </el-col>
        </el-row>
        <article v-html="detailData.content"></article>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      detailData: {}
    }
  },
  computed: {
    userId () {
      return this.$store.state.userId
    },
    isMyItem () {
      return this.userId === this.detailData.userId
    }
  },
  created () {
    let id = this.$route.query.id
    axios.get('/api/getDetail?id=' + id).then(res => {
      this.detailData = res.data
      this.$store.dispatch('getDetailData', res.data)
    }).catch(err => {
      console.log(err)
    })
  }
}
</script>

<style lang="less">
.aside {
  transition: 1s;
  position: relative;
}
.detail{
  .main {
    min-height: 600px;
    background-color: white;
    border-radius: 4px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
    article{
      text-align: left;
      padding: 0 15px;
    }
  }
  .info{
    border-bottom: 1px solid #e6e6e6;
    padding-bottom: 10px;
    font-size: 12px;
    .el-col{
      text-align: left;
    }
    .author{
      padding-left: 40px;
    }
    .edit{
      float: right;
      margin-right: 40px;
    }
  }
  pre{
    white-space: pre-wrap;
    word-wrap: break-word;
  }
}
</style>
