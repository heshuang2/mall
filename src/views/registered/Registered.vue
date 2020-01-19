<template>
  <div id="registered">
    <nav-bar>
      <div slot="left" class="back" @click="backClick">
        <img src="~assets/img/common/back.svg" alt="">
      </div>
    </nav-bar>
    <from-view/>
  </div>
</template>

<script>
  import NavBar from "../../components/common/navbar/NavBar";
  import FromView from "./childComps/FromView";
  export default {
    name: "Registered",
    components: {
      FromView,
      NavBar
    },
    methods: {
      backClick() {
        this.$router.push("/home");
        this.$store.state.tel = "+86";
      }
    },

  }
</script>

<style scoped>
  #registered {
    position: relative;
    height: 100vh;
    z-index: 9;
    background-color: #fff;
  }
  .back img {
    margin-top: 10px;
    margin-left: 10px;
  }
</style>
