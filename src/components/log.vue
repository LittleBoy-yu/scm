<template>
  <div>
    <div class="back">
      <div class="topp">
        <el-row type="flex" class="row-bg" justify="space-between">
          <el-col :span="6">
            <div class="grid-content bg-purple el-icon-video-play">欢迎登录后台管理界面平台</div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple a">帮助 关于</div>
          </el-col>
        </el-row>
      </div>
      <div class="big">
        <h1 class="title">USERLOGIN</h1>
        <el-form ref="user" :model="user">
          <el-form-item>
            <el-input v-model="user.username" class="inp" placeholder="请输入内容"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="user.password" class="inp" placeholder="请输入密码" show-password></el-input>
          </el-form-item>
          <el-form-item class="f">
            <el-checkbox v-model="checked">记住密码</el-checkbox>
            <router-link to>忘记密码?</router-link>
          </el-form-item>
          <el-form-item class="botto">
            <el-button type="primary" @click="login('user')">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        username: "",
        password: ""
      },
      //记住密码
      checked: true,
    };
  },

  methods: {
    login() {
        if(this.user.username == ""&&this.user.password == ""){
            this.$message.error("账号和密码不能为空")
            return;
        }else if (this.user.username == "") {
             this.$message.error("账号不能为空")
            return;
          }else if(this.user.password == ""){
 this.$message.error("密码不能为空")
            return;
          }
          let pro = this.$store.dispatch("login", this.user);
          pro.then(resp => {
              // console.log(resp);
              // this.$router.push("/user");
              this.$router.push("/mainpage");
            })
            .catch(er => {
              this.$message.error(`${er}`);
            });
      //   }
      // });
    }
  }
};
</script>

<style >
.title {
  background: linear-gradient(to left, #061161, #780206);
  -webkit-background-clip: text;
  color: transparent;
}
.back {
  background-image: url("/static/img/timg.jpg");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  height: 730px;
}
.a {
  margin-left: 250px;
}
.big {
  width: 692px;
  height: 336px;
  margin: 100px auto;
  background: linear-gradient(to bottom, #f8f8f8, #d9d9d9, 0.9);
  text-align: center;
}
.f {
  margin-top: -20px;
}
.inp {
  margin-bottom: 30px;
  width: 400px;
}
</style>