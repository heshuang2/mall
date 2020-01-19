<template>
  <div id="cart">
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{length}})</div>
      <div class="right" slot="right" @click="tabClick">{{message}}</div>
    </nav-bar>
    <scroll class="content" ref="scroll">
      <cart-list/>
    </scroll>
    <cart-bottom-bar :isShowBar="isShowBar"/>
  </div>
</template>

<script>
  import NavBar from "../../components/common/navbar/NavBar";
  import CartList from "./childComps/CartList";
  import CartBottomBar from "./childComps/CartBottomBar";

  import {
    mapGetters
  } from "vuex"
  import Scroll from "../../components/common/scroll/Scroll";

  export default {
    name: "Cart",
    data(){
      return {
        isShowBar: true,
        message: "管理"
      }
    },
    components: {
      CartBottomBar,
      Scroll,
      CartList,
      NavBar,
    },
    activated() {
      this.$refs.scroll.refresh();
    },
    computed: {
      //辅助函数将store中的getter映射到局部计算属性中
      ...mapGetters({
        length: "cartLength",
        list :"cartList"
      })
    },
    methods: {
      tabClick() {
        if (this.isShowBar){
          this.message = "完成";
          this.isShowBar = false
        }else {
          this.message = "管理";
          this.isShowBar = true
        }
      }
    }
  }
</script>

<style scoped>
  #cart {
    height: 100vh
  }
  .nav-bar {
    background-color: var(--color-tint);
    color: #fff;
    font-weight: 100;
  }
  .right {
    font-size: 13px;
    text-align: right;
    padding-right: 10px;
  }
  .content {
    height: calc(100vh - 49px - 88px);
    overflow: hidden;
  }

</style>
