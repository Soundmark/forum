<template>
  <div class="signin">
    <el-row type="flex" justify="center" class="bg-purple-light">
      <el-col :span="22" class="title">登录</el-col>
    </el-row>

    <el-row type="flex" justify="center" class="bg-purple-light">
      <el-col :span="22" style="height:80px" class="bg-white"></el-col>
    </el-row>

    <el-row type="flex" justify="center" class="bg-purple-light">
      <el-col :span="7" class="bg-white"></el-col>
      <el-col :span="8" class="bg-white">
        <el-form ref="form" label-position="left" label-width="65px">
          <el-form-item label="用户名">
            <el-input v-model="userInfo.name" @keydown.enter.native="signin"></el-input>
            <router-link :to="{name: 'SignUp'}">立即注册</router-link>
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="userInfo.psw" type="password" @keydown.enter.native="signin"></el-input>
            <router-link :to="{name: 'SignUp'}">找回密码</router-link>
          </el-form-item>
          <el-form-item>
            <el-col :span="1" style="height:40px"></el-col>
            <el-col :span="6">
              <el-checkbox>记住密码</el-checkbox>
            </el-col>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class="btn" @click="signin">登录</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="7" class="bg-white"></el-col>
    </el-row>

    <el-row type="flex" justify="center" class="bg-purple-light">
      <el-col :span="22" style="height:80px" class="bg-white"></el-col>
    </el-row>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      userInfo: {
        name: '',
        psw: ''
      }
    }
  },
  methods: {
    signin () {
      axios.post('/user/signin', {account: this.userInfo.name, password: this.userInfo.psw}).then(res => {
        if (res.data.success) {
          this.$message({
            message: res.data.info,
            type: 'success'
          })
          localStorage.setItem('dogleft_userToken', res.data.token)
          localStorage.setItem('userInfo', JSON.stringify({name: res.data.name, id: res.data.id}))
          this.$store.commit('checkUser', {name: res.data.name, id: res.data.id})
          this.$router.push('/home')
        } else {
          this.$message({
            message: res.data.info,
            type: 'warning'
          })
        }
      })
    }
  }
}
</script>

<style lang="less">
.signin{
  .title{
    height: 40px;
    line-height: 40px;
    background-color: #568ad9;
  }
  .bg-white{
    background-color: #ffffff;
  }
  .el-input{
    width: 250px;
    float: left;
    margin-left: 40px;
  }
  .btn{
    transform: translateX(-30px);
  }
  .el-form{
    min-width: 420px;
  }
}
</style>
