<template>
  <el-col :span="3" class="hidden-md-and-down" style="width:200px;margin-right:20px">
      <div class="grid-content main aside" ref="aside">侧边导航</div>
  </el-col>
</template>

<script>
export default {
  mounted () {
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

<style>

</style>
