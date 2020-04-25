<template>
  <el-row type="flex" justify="center" class="bg-purple-light" ref="container">
    <el-col :span="3" class="hidden-md-and-down" style="width:200px;margin-right:20px">
      <div class="grid-content main aside" ref="aside">侧边导航</div>
    </el-col>
    <el-col :xl="15" :lg="16" :md="18" :sm="22" :xs="24" style="width:850px">
      <div class="grid-content main">
        <el-row
          type="flex"
          justify="left"
          align="middle"
          class="item"
          v-for="(item, index) in currentIndexData"
          :key="index"
        >
          <el-col :span="7" class="itemPic">
            <router-link :to="{name: 'Detail',query:{id:item.id}}">
              <img :src="item.indexImg" height="150px" width="220px" />
            </router-link>
          </el-col>
          <el-col :span="16" class="itemContent">
            <div class="title">
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
                <i class="el-icon-chat-dot-round" v-show="item.comments"></i>
                {{item.comments}}
              </span>
              <span class="like">点赞({{item.likes}})</span>
            </div>
            <div class="intro">
              <span>{{item.indexContent}}</span>
            </div>
          </el-col>
        </el-row>
      </div>
      <el-pagination
          background
          layout="prev, pager, next, total, jumper"
          :total="indexData.length"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
        ></el-pagination>
    </el-col>
  </el-row>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      indexData: [],
      currentPage: 1,
      pageSize: 10
    }
  },
  computed: {
    currentIndexData () {
      return this.indexData.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize)
    }
  },
  watch: {
    $route (to, from) {
      this.getData(this.$route.query.name)
      let nav = [{name: '首页', to: 'IndexData'}, {name: this.$route.query.name, to: ''}]
      this.$store.commit('setBreadNav', nav)
    }
  },
  methods: {
    getData (sort) {
      axios.get('/api/getSortData?sort=' + sort).then(res => {
        this.indexData = res.data.reverse()
      }).catch(err => {
        console.log(err)
      })
    },
    handleCurrentChange (newCurrentPage) {
      this.currentPage = newCurrentPage
      window.scroll(0, 0)
    }
  },
  created () {
    // 设置面包屑
    let nav = [{name: '首页', to: 'IndexData'}, {name: this.$route.query.name, to: ''}]
    this.$store.commit('setBreadNav', nav)
  },
  mounted () {
    // 获取页面数据
    this.getData(this.$route.query.name)
    // 设置侧边导航浮动滚动
    this.$nextTick(() => {
      let aside = this.$refs.aside
      setTimeout(() => {
        let containerHeight = this.$refs.container.$el.offsetHeight
        window.onscroll = function () {
          let scrollY = window.scrollY
          setTimeout(() => {
            if (scrollY < (containerHeight - aside.offsetHeight)) {
              aside.style.top = scrollY + 'px'
            }
          }, 100)
        }
      }, 500)
    })
  }
}
</script>

<style lang="less">
.item {
  border-bottom: 0.5px solid rgba(0, 0, 0, 0.2);
  height: 180px;
}
.itemPic {
  background-color: #fff;
  min-width: 220px;
  max-width: 240px;
  margin: 0 20px;
}
.itemContent {
  height: 154px;
  background-color: #fff;
  text-align: left;
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
      left: 0;
      i {
        margin-right: 5px;
      }
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
  }
}
.main {
  min-height: 600px;
  background-color: white;
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
.aside {
  transition: 1s;
  position: relative;
}
</style>
