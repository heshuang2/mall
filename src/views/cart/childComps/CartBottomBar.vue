<template>
  <div id="CartBottomBar">
    <bottom-bar ref="bottomBar" v-if="isShowBar">
      <span class="buy-product" slot="right" @click="calcClick">结算<span v-show="isShowCheck">({{checkLength}})</span></span>
      <span class="total-price" slot="center">合计:<span class="price">{{totalPrice}}</span></span>
    </bottom-bar>
    <bottom-bar v-else="isShowBar">
      <span class="delete" slot="right" @click="removeItem">删除</span>
      <span class="move" slot="center">移入收藏夹</span>
    </bottom-bar>
  </div>
</template>

<script>
  import CheckButton from "../../../components/content/checkButton/CheckButton";
  import BottomBar from "../../../components/common/bottomBar/BottomBar";
  export default {
    name: "CartBottomBar",
    components: {BottomBar, CheckButton},
    props: {
      isShowBar: {
        type: Boolean,
        default: true
      }
    },
    computed: {
      totalPrice() {
        return "￥" + this.$store.getters.cartList.filter(item => {
            return item.checked
        }).reduce((preValue, item) => {
          return preValue + item.price * item.count
        }, 0).toFixed(2)

      },
      checkLength() {
        return this.$store.state.cartList.filter(item => item.checked).length
      },
      isShowCheck() {
        return this.checkLength > 0;
      }
    },
    methods: {
      removeItem() {
        //未选中的项filter新数组
        this.$store.state.cartList = this.$store.state.cartList.filter(
            item => !item.checked)
      },
      calcClick() {
        if (!this.$refs.bottomBar.isSelectAll){
          this.$toast.show("购物车为空");
        }
      }
    }
  }
</script>

<style scoped>
  .total-price {
    text-align: left;
    float: right;
    width: 120px;
    height: 44px;
    line-height: 44px;
    margin-left: 15px;
    font-size: 16px;
    color: #666;
  }
  .buy-product {
    background-color: orangered;
    color: #fff;
    width: 100px;
    height: 44px;
    text-align: center;
    line-height: 44px;
    float: right;
  }
  .delete {
    float: right;
    text-align: center;
    line-height: 28px;
    margin-top: 8px;
    margin-right: 10px;
    width: 45px;
    height:28px;
    border: 2px solid red;
    color: red;
    border-radius: 20px;
  }
  .move {
    text-align: center;
    line-height: 28px;
    float: right;
    margin-top: 8px;
    margin-right: 10px;
    width: 85px;
    height:28px;
    border: 2px solid #ffa845;
    color: #ffa845;
    border-radius: 20px;
  }
  .price {

    color: red;
    font-weight: 500;
  }
</style>
