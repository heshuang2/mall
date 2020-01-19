<template>
  <div class="bottom-bar">
    <check-button :is-checked="isSelectAll"
                  @click.native="checkClick" class="select-all"></check-button>
    <span class="total-left">全选</span>
    <span class="right"><slot name="right"></slot></span>
    <span class="center"><slot name="center"></slot></span>
  </div>
</template>

<script>
  import CheckButton from "../../content/checkButton/CheckButton";
  export default {
    name: "BottomBar",
    components: {
      CheckButton
    },
    computed: {
      isSelectAll() {
        //length=0,取反就为true
        // return !(this.$store.state.cartList.filter(item => !item.checked).length)
        //找到不选中的取反则为false 如果数组为空，则返回undefined,undefined取反为true
        if (this.$store.state.cartList.length === 0) return false;
        return !this.$store.state.cartList.find(item => !item.checked);
      }
    },
    methods: {
      checkClick() {
        /*if (this.isSelectAll){
          this.$store.state.cartList.forEach(item => item.checked = false);
        }else {
          this.$store.state.cartList.forEach(item => item.checked = true);
        }*/
        //防止污染this.isSelectAll
        let all = this.isSelectAll;
        this.$store.state.cartList.forEach(item => item.checked = !all);
      }
    }
  }
</script>

<style scoped>
  .bottom-bar {
    width: 100%;
    height: 44px;
    background-color: #eee;
    position: fixed;
    bottom: 49px;
    left: 0;
    box-shadow: 0 -2px 3px rgba(0, 0, 0, .2);
    font-size: 14px;
    color: #888;
    line-height: 44px;
    padding-left: 35px;
    box-sizing: border-box;
  }
  .select-all {
     position: absolute;
     line-height: 0;
     left: 12px;
     top: 13px;
   }
  .total-left {
    position: relative;
    width: 50%;
  }
  .right {
    height: 44px;
    float: right;
  }
  .center {
    float: right;
    width: 100px;
    height: 44px;
  }

</style>
