<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control  :titles="['流行', '新款', '精选']" @tabClick="tabClick"
                  ref="tabControl1" class="tab-control" v-show="isTabControlShow"></tab-control>
    <scroll class="content" ref="scroll" :probe-type="probeType" @scroll="contentScroll"
            :pull-up-load="true" @pullingUp="loadMore">
      <home-swiper :banners="banners" @swiperImgLoad="swiperImgLoad"></home-swiper>
      <home-recommend-view :recommends="recommends"></home-recommend-view>
      <home-feature-view></home-feature-view>
      <tab-control  :titles="['流行', '新款', '精选']" @tabClick="tabClick"
      ref="tabControl2"></tab-control>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <back-top @click.native="backClick" v-show="isShow"/>
  </div>

</template>

<script>
  import NavBar from "../../components/common/navbar/NavBar";
  import TabControl from "../../components/content/TabControl/TabControl";

  import HomeSwiper from "./childComps/HomeSwiper";
  import HomeRecommendView from "./childComps/HomeRecommendView";
  import HomeFeatureView from "./childComps/HomeFeatureView";
  import GoodsList from "../../components/content/goods/GoodsList";
  import Scroll from "../../components/common/scroll/Scroll";

  import {getHomeMultidata, getHomeGoods} from "../../network/home";
  import {itemListenerMixin, backTopMixin} from "../../common/mixin";

  export default {
    name: "Home",
    components: {
      Scroll,
      TabControl,
      HomeFeatureView,
      HomeRecommendView,
      NavBar,
      HomeSwiper,
      GoodsList,
    },
    data() {
      return {
        banners: [],
        recommends: [],
        goods: {
          "pop": {page: 0, list: []},
          "new": {page: 0, list: []},
          "sell": {page: 0, list: []}
        },
        currentType: "pop",
        probeType: 3,
        tabOffsetTop: 0,
        isTabControlShow: false,
        saveY: 0,
      }
    },
    computed: {
      showGoods() {
        return this.goods[this.currentType].list;
      }
    },
    //生命周期函数获取服务器数据
    created() {
      this.getHomeMultidata();
      this.getHomeGoods("pop");
      this.getHomeGoods("new");
      this.getHomeGoods("sell");
    },
    //混入
    mixins: [itemListenerMixin, backTopMixin],
    mounted() {

    },
    activated() {
      this.$refs.scroll.scrollTo(0, this.saveY, 0);
      this.$refs.scroll.refresh();
    },
    deactivated() {
      this.saveY = this.$refs.scroll.getScrollY();
      //移除自定义事件itemImageLoad的itemImgListener监听器。
      this.$bus.$off("itemImageLoad", this.itemImgListener)
    },
    methods: {
      /**
       * 事件监听相关
       */

      tabClick(index){
        // console.log(index);
        switch (index) {
          case 0:
            this.currentType = "pop";
            break;
          case 1:
            this.currentType = "new";
            break;
          case 2:
            this.currentType = "sell";
            break
        }
        this.$refs.tabControl1.currentIndex = index;
        this.$refs.tabControl2.currentIndex = index;
      },
      contentScroll(position) {
        // console.log(position);
        //判断backTop是否显示
          this.isShow = (-position.y) > 1000;
        //判断tabControl是否吸顶
          this.isTabControlShow = (-position.y) > this.tabOffsetTop;
      },
      loadMore(){
        // console.log("加载");
        this.getHomeGoods(this.currentType);
      },
      swiperImgLoad() {
        //获取tabControl的offsetTop
        // console.log(this.$refs.tabControl.$el.offsetTop);
        //所有组件都有一个属性$el:用于获取组件中的元素
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
      },
      /**
      * 网络请求相关
       */
      getHomeMultidata() {
        getHomeMultidata()
            .then(res => {
              this.banners = res.data.banner.list;
              this.recommends = res.data.recommend.list;
            })
      },
      getHomeGoods(type) {
        const page = this.goods[type].page + 1;
        // console.log(page);
        getHomeGoods(type, page)
            .then(res => {
              // console.log(res);
              this.goods[type].list.push(...res.data.list);
              this.goods[type].page += 1;
              this.$refs.scroll.finishPullUp();
            })
      }
    }
  }
</script>

<style scoped>
  #home{
    /*padding-top: 44px;*/
    height: 100vh;
    position: relative;
  }
  .home-nav{
    background-color: var(--color-tint);
    color: white;
    /*position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;*/
  }

  .content {
    position: absolute;
    top: 44px;
    bottom: 49px;
    overflow: hidden;
  }
  .tab-control {
    position: relative;
    z-index: 9;
  }
  /*.content {
    height: calc(100vh - 93px);
    overflow: hidden;
  }*/
</style>
