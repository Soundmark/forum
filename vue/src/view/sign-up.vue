<template>
  <div class="signup">
    <el-row type="flex" justify="center" class="bg-purple-light">
      <el-col :span="22" class="title">注册</el-col>
    </el-row>

    <el-row type="flex" justify="center" class="bg-purple-light">
      <el-col :span="22" style="height:80px" class="bg-white"></el-col>
    </el-row>

    <el-row type="flex" justify="center" class="bg-purple-light">
      <el-col :span="7" class="bg-white"></el-col>
      <el-col :span="8" class="bg-white">
        <el-form ref="form" label-position="left" label-width="80px" :model="signUpInfo">
          <el-form-item label="用户名"
          prop="name"
          :rules="[
            { required: true, message: '用户名不能为空', trigger: 'blur'},
          ]">
            <el-input v-model="signUpInfo.name"></el-input>
          </el-form-item>
          <el-form-item label="密码"
          prop="psw"
          :rules="[
            { required: true, message: '请填写密码', trigger: 'blur'},
          ]">
            <el-input type="password" v-model="signUpInfo.psw"></el-input>
          </el-form-item>
          <el-form-item label="确认密码"
          prop="pswCheck"
          :rules="[
            { required: true, message: '请再次输入密码', trigger: 'blur'},
          ]">
            <el-input type="password" v-model="signUpInfo.pswCheck"></el-input>
          </el-form-item>
          <el-form-item label="邮箱"
          prop="email"
          :rules="[
            { required: true, message: '请填写邮箱', trigger: 'blur'},
            {type: 'email', message: '请输入有效邮箱', trigger: 'blur'}
          ]">
            <el-input type="email" v-model="signUpInfo.email"></el-input>
          </el-form-item>
          <el-form-item>
            <el-col :span="1" style="height:40px"></el-col>
            <el-col :span="8">
              <el-checkbox v-model="agreeProtocal">同意</el-checkbox>
              <a href="javascript:;" @click="viewProtocal">协议</a>
            </el-col>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class="btn" @click="signup">注册</el-button>
            <router-link :to="{name: 'SignIn'}">已有账号？立即登录</router-link>
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
      signUpInfo: {
        name: '',
        psw: '',
        pswCheck: '',
        email: ''
      },
      agreeProtocal: false
    }
  },
  methods: {
    signupData () {
      let id = String(Date.now()).slice(7)
      let date = new Date()
      let time = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDay() + '-' + date.getHours() + date.getMinutes()
      let account = {
        userId: id,
        account: this.signUpInfo.name,
        password: this.signUpInfo.psw
      }
      let data = {
        userId: id,
        account: this.signUpInfo.name,
        userName: this.signUpInfo.name,
        email: this.signUpInfo.email,
        gender: '保密',
        level: 0,
        integral: 0,
        status: '正常',
        registerTime: time
      }
      return {account, data}
    },
    axiosPost (account, data) {
      axios.post('/user/signup', {account, data}).then(res => {
        if (res.data.success) {
          this.$message({
            message: res.data.info,
            type: 'success'
          })
          this.$router.push('/sign-in')
        } else {
          this.$message({
            message: res.data.info,
            type: 'warning'
          })
        }
      })
    },
    signup () {
      let {account, data} = this.signupData()
      if (!this.signUpInfo.name) {
        this.$message({
          message: '用户名不能为空！',
          type: 'warning'
        })
        return
      } else if (!this.signUpInfo.psw) {
        this.$message({
          message: '密码不能为空！',
          type: 'warning'
        })
        return
      }
      if (this.signUpInfo.psw !== this.signUpInfo.pswCheck) {
        this.$message({
          message: '两次输入密码不一致！',
          type: 'warning'
        })
        return
      }
      if (!(/@\w+\./).test(this.signUpInfo.email)) {
        this.$message({
          message: '请输入有效邮箱！',
          type: 'warning'
        })
        return
      }
      if (!this.agreeProtocal) {
        this.$message({
          message: '请先同意协议',
          type: 'warning'
        })
        return
      }
      this.axiosPost(account, data)
    },
    viewProtocal () {
      const h = this.$createElement
      this.$msgbox({
        title: '协议',
        message: h('p', null, '由于本网站买不起SSL服务，又懒得进行数据本地加密，因此本网站的数据是十分不安全的，请务必不要填写重要信息！'),
        showCancelButton: true,
        confirmButtonText: '同意',
        cancelButtonText: '不同意'
      }).then(() => {
        this.agreeProtocal = true
      }).catch(() => {
        this.$message({
          message: '别搞事情小老弟！',
          type: 'warning'
        })
      })
    }
  }
}
</script>

<style lang="less">
.signup {
  .title {
    height: 40px;
    line-height: 40px;
    background-color: #ad12be;
  }
  .el-input{
    width: 250px;
    float: left;
    margin-left: 40px;
  }
  .el-form-item__error{
    margin-left: 40px;
  }
  .btn{
    transform: translateX(-35px);
  }
  .el-form{
    min-width: 370px;
  }
}
.bg-white {
  background-color: #ffffff;
}
</style>
