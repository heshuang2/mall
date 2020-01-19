<template>
  <div class="cart-list">
    <cart-list-item v-for="(item, index) in List" :key="index" :product="item"/>
  </div>
</template>

<script>
  import {mapGetters} from "vuex";
  import CartListItem from "./CartListItem";
  import Scroll from "../../../components/common/scroll/Scroll";

  export default {
    name: "CartList",
    components: {
      Scroll,
      CartListItem
    },

    computed: {
      ...mapGetters ({
        List: "cartList"
      })
    }
  }
</script>

<style scoped>

</style>
