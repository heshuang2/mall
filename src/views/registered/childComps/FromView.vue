<template>
  <div class="form">
    <div class="title">手机号注册</div>
    <span class="subtitle">亲，欢迎注册账号</span>
    <div class="tel">
      <button @click="telClick" :tel="tel">{{tel}}
        <span class="tel-bar">▼</span>
      </button>
      <input type="text" v-model="loginId">
    </div>
    <div class="login-bar">
    <button :disabled="!isChange" @click="loginClick"
    :class="{disLogin: !isChange, login: isChange}" >同意协议并注册</button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "FromView",
    data() {
      return {
        loginId: "",
        tel: null,
      }
    },
    computed: {
      isChange() {
        return this.loginId !== "";
      }
    },
    mounted(){
      this.tel = this.$store.state.tel
    },
    methods: {
      //登录提交
      loginClick() {
        this.$router.push("/profile");
        this.$store.state.tel = "+86";
      },
      telClick() {
        this.$router.push("/areaCode");
      }
    }
  }
</script>

<style scoped>
  .form {
    display: block;
    margin: 100px auto;
    padding-left: 20px;
    padding-right: 20px;
  }
  .title {
    font-size: xx-large;
    line-height: 55px;
    color: #000;
  }
  .subtitle {
    font-size: large;
  }
  .tel {

    margin-top: 50px;
    width: 100%;
    height: 30px;
  }
  .tel input{
    border: 0;
    border-bottom: 2px solid red;
    font-size: 25px;
    width: 77%;
    height: 30px;
    outline: none;
    float: right;
  }
  .tel button {
    width: 23%;
    height: 30px;
    border: 0;
    background-color: #fff;
    font-size: 20px;
    border-bottom: 2px solid red ;
  }
  .tel-bar{
    float: right;
    font-size: small;
    padding-top: 5px;
    padding-right: 2px;
  }
  .login-bar {
    margin: 40px auto;
  }
  .login-bar button {
    width: 100%;
    height: 50px;
    border-radius: 25px;
    font-size: 20px;
    font-weight: 500;
  }
  .login {
    background-color: #ff886c;
    color: #fff;
  }
  .disLogin {
    background-color: #ebc494;
    color: #ffe6e9;
  }
</style>
