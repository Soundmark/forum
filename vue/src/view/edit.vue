<template>
  <el-row type="flex" justify="center" class="bg-purple-light edit" ref="container">
    <el-col :xl="15" :lg="16" :md="18" :sm="22" :xs="24" style="width:1100px">
      <div class="grid-content main">
        <editor></editor>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import editor from '@/components/editor.vue'
export default {
  components: {
    editor
  }
}
</script>

<style lang='less'>
.edit{
  .main {
    min-height: 642px;
    background-color: white;
    border-radius: 4px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  }
}
</style>
