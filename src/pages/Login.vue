<template>
  <div class="login-wrap">
<!--    <banner :banners="banners" :duration="3000"/>-->
    <div id="mask"></div>
    <div class="main">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
        <div class="ms-title">
          <div class="logo-container">
<!--            <img src="../assets/img/musicLogo.png" alt="" />-->
          </div>
          <p style="font-size: 28px">社团后台管理</p>
        </div>
        <div class="content" style="padding: 20px 5px 0px;">
          <el-form-item prop="username" >
            <el-input  v-model="ruleForm.username" placeholder="请输入用户名" ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              type="password"
              v-model="ruleForm.password"
              placeholder="请输入密码"
            ></el-input>
          </el-form-item>
        </div>
        <div class="login-btn">
          <el-button type="primary" @click="submitForm">登录</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import Banner from "../components/Banner";
import { mixin } from "../mixins/index";
import { getLoginStatus } from "../api/index";
export default {
  components: {
        Banner,
    },
  mixins: [mixin],
  data: function () {
    return {
      ruleForm: {
        username: "",
        password: "",
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },
  created() {
    this.enten();
  },
  methods: {
    submitForm() {
      let params = new URLSearchParams();
      params.append("no", this.ruleForm.username);
      params.append("password", this.ruleForm.password);
      getLoginStatus(params).then((res) => {
        if (res.code == 1) {
          localStorage.setItem("userName", res.data.name);
          localStorage.setItem("", res.data);
          localStorage.setItem("roles", res.data.flag);
          this.$router.push("/Info");
          this.notify("登录成功", "success");
        } else {
          this.notify("登录失败", "error");
        }
      });
    },
    enten(){
      var that = this;
      document.onkeyup = function(e) {
        if(e.keyCode == 13){
          that.submitForm();
        }
      }
    }
  },
};

</script>

<style scoped>
#mask {
  width: 100%;
  height: 100%;
  background: #000;
  opacity: 0.2;
  position: fixed;
  left: 0;
  top: 0;
}
.main {
  background-color: rgba(38,43,54,.8);
  max-width: 320px;
  border-radius: 5px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  padding: 10px 20px 20px 20px;
}
.login-wrap {
  position: relative;
  width: 100%;
  height: 100%;
}
.ms-title {
  width: 100%;
  text-align: center;
  font-size: 30px;
  font-weight: 600;
  color: #fff;
}
.ms-login {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 300px;
  height: 160px;
  margin-left: -190px;
  margin-top: -150px;
  padding: 40px;
  border-radius: 5px;
  background: #fff;
}
.login-btn {
  text-align: center;
}
.login-btn button {
  width: 310px;
  height: 40px;
  background: #00A0E9;
  font-size: 16px;
}
.logo-container {
  width: 65px;
  margin: 0 auto;
}
.logo-container img {
  width: 100%;
}
.bg{
  width: 100%;
}
</style>
