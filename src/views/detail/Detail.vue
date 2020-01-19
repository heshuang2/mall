<template>
  <div id="detail">
    <detail-navbar @titleClick="titleClick" ref="detailNavBar"/>
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
      <detail-swiper :top-images="topImages"/>
      <detail-bass-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detailInfo="detailInfo" @imgLoad="imgLoad"/>
      <detail-param-info ref="params" :goodsParam="goodsParam"/>
      <detail-comment-info ref="comment" :comment-info="commentInfo"/>
      <goods-list ref="recommend" :goods="recommends"/>
    </scroll>
    <detail-bottom-bar @addToCart="addToCart" />
    <back-top v-show="isShow" @click.native="backClick"/>
  </div>
</template>

<script>
  import DetailNavbar from "./childComps/DetailNavbar";
  import {getDetail, getRecommend, GoodsInfo, Shop, GoodsParam} from "../../network/detail";
  import DetailSwiper from "./childComps/DetailSwiper";
  import DetailBassInfo from "./childComps/DetailBassInfo";
  import DetailShopInfo from "./childComps/DetailShopInfo";
  import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
  import DetailParamInfo from "./childComps/DetailParamInfo";
  import DetailCommentInfo from "./childComps/DetailCommentInfo";
  import DetailBottomBar from "./childComps/DetailBottomBar";

  import Scroll from "../../components/common/scroll/Scroll";
  import GoodsList from "../../components/content/goods/GoodsList";

  import {itemListenerMixin, backTopMixin} from "../../common/mixin";
  import {mapActions} from "vuex";

  export default {
    name: "Detail",
    components: {
      DetailBottomBar,
      GoodsList,
      DetailCommentInfo,
      DetailParamInfo,
      DetailGoodsInfo,
      Scroll,
      DetailShopInfo,
      DetailBassInfo,
      DetailSwiper,
      DetailNavbar,
      GoodsInfo
    },
    //混入
    mixins: [itemListenerMixin, backTopMixin],
    data() {
      return {
        iid: "",
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        goodsParam: {},
        commentInfo: {},
        recommends: [],
        themeTopY: [],
        currentIndex: null,
      }
    },
    created() {
      this.iid = this.$route.params.iid;

      getDetail(this.iid).then(res => {
        // console.log(res);
        const data = res.result;
        // 轮播图数据
        this.topImages = data.itemInfo.topImages;
        //商品信息
        this.goods = new GoodsInfo
        (data.itemInfo, data.columns, data.shopInfo.services);
        //店铺信息
        this.shop = new Shop(data.shopInfo);
        //商品详情
        this.detailInfo = data.detailInfo;
        //商品参数
        this.goodsParam = new GoodsParam
        (data.itemParams.info ,data.itemParams.rule);
        //评论信息
        if (data.rate.cRate !== 0)
          this.commentInfo = data.rate.list[0];
        //推荐数据
        getRecommend().then(res => {
          this.recommends = res.data.list;
          // console.log(this.recommends);
        });
       /* this.$nextTick(() => {
          this.themeTopY.push(0);
          this.themeTopY.push(this.$refs.params.$el.offsetTop);
          this.themeTopY.push(this.$refs.comment.$el.offsetTop);
          this.themeTopY.push(this.$refs.recommend.$el.offsetTop);
          console.log(this.themeTopY);
        })*/
      })
    },
    destroyed() {
      this.$bus.$off("itemImgLoad", this.itemImgListener)
    },
    methods: {
      ...mapActions(["addCart"]),//映射actions里的addToCart函数
      imgLoad() {
        this.newRefresh();
        this.themeTopY.push(0);
        this.themeTopY.push(this.$refs.params.$el.offsetTop);
        this.themeTopY.push(this.$refs.comment.$el.offsetTop);
        this.themeTopY.push(this.$refs.recommend.$el.offsetTop);
        this.themeTopY.push(Number.MAX_VALUE);
        // console.log(this.themeTopY);
      },
      titleClick(index) {
        this.$refs.scroll.scrollTo(0, -this.themeTopY[index], 200)
      },
      contentScroll(position) {
        this.isShow = (-position.y) > 1000;
        const positionY = -position.y;
        let length = this.themeTopY.length;
        for (let i = 0; i < length - 1; i++) {
          if (this.currentIndex !== i && (positionY >= this.themeTopY[i] && positionY < this.themeTopY[i + 1])){
            this.currentIndex = i;
            this.$refs.detailNavBar.currentIndex = this.currentIndex;
          }
        }
      },
      addToCart() {
        const product = {};
        product.image = this.topImages[0];
        product.title = this.goods.title;
        product.desc = this.goods.desc;
        product.price = this.goods.realPrice;
        product.iid = this.iid;
        // console.log(product);
        // this.$store.cartList.push(product);

        /**this.addCart(product)=this.$store.dispatch("addCart", product)**/
        this.addCart(product).then(res => {
          this.$toast.show(res);
        })
        /*this.$store.dispatch("addCart", product).then(res => {
          console.log(res);
        });*/
      }
    }
  }
</script>

<style scoped>
  .content {
    position: absolute;
    top: 44px;
    bottom: 49px;
    overflow: hidden;
  }
  #detail {
    position: relative;
    z-index: 9;
    height: 100vh;
    background: #fff;
  }
</style>
