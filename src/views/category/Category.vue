<template>
  <div id="category">
    <nav-bar class="nav-bar"><div slot="center">商品分类</div></nav-bar>
    <div class="content">
      <tab-menu :categories="categories"
                @selectItem="selectItem"/>
      <scroll id="tab-content" :probe-type="3" @scroll="contentScroll"
                :data="[categoryData]"
              ref="scroll">
        <div>
          <tab-content-category :subcategories="showSubcategory" @itemImgLoad="itemImgLoad"/>
          <tab-control :titles="['综合', '新品', '销量']"
          @tabClick="tabClick" ref="tabControl"/>
          <goods-list :goods="showCategoryDetail"/>
        </div>
      </scroll>
      <back-top v-show="isShow" @click.native="backClick"/>
    </div>

  </div>
</template>

<script>
  import NavBar from "../../components/common/navbar/NavBar";
  import TabMenu from "./childComps/TabMenu";
  import TabContentCategory from "./childComps/TabContentCategory";
  import TabControl from "../../components/content/TabControl/TabControl";

  import Scroll from "../../components/common/scroll/Scroll";

  import {getCategory, getCategoryDetail, getSubcategory} from "../../network/category";
  import {POP, SELL, NEW} from "common/const";
  import {backTopMixin, tabControlMixin, itemListenerMixin} from "../../common/mixin";
  import {debounce} from "../../common/utils";
  import GoodsList from "../../components/content/goods/GoodsList";

  export default {
    name: "Category",
    components: {
      GoodsList,
      TabControl,
      Scroll,
      TabContentCategory,
      TabMenu,
      NavBar,
    },
    created() {
      //请求分类数据
      this._getCategory();
      //监听图片加载完成
     /* this.$bus.$on("imgLoad", () => {
        this.$refs.scroll.refresh();
      })*/
    },
    mounted() {
     /* this.newRefresh = debounce(this.$refs.scroll.refresh, 200);
      //对监听事件进行保存
      this.itemImgListener = () => {
        this.newRefresh();
        this.tabMenuOffsetTop = this.$refs.tabControl.$el.offsetTop;
        // console.log(this.tabMenuOffsetTop);
      };
      //接受到itemImgLoad加载完成事件调用itemImgListener对页面进行newRefresh
      this.$bus.$on("itemImgLoad", this.itemImgListener);*/
    },
    deactivated() {
      this.$bus.$off("itemImgLoad", this.itemImgListener);
      this.$bus.$off("itemImageLoad", this.itemImgListener);
    },
    mixins: [backTopMixin, tabControlMixin, itemListenerMixin],
    data() {
      return {
        categories: [],
        categoryData: {
        },
        currentIndex: -1,
        tabMenuOffsetTop: 0
      }
    },
    computed: {
      showSubcategory() {
        if (this.currentIndex === -1) return {};
        return this.categoryData[this.currentIndex].subcategories;
      },
      showCategoryDetail() {
        if (this.currentIndex === -1) return [];
        return this.categoryData[this.currentIndex].categoryDetail[this.currentType];
      }
    },
    methods: {
      itemImgLoad() {
        this.newRefresh();
        this.tabMenuOffsetTop = this.$refs.tabControl.$el.offsetTop;
        console.log(this.tabMenuOffsetTop);
      },
      //backTop是否显示
      contentScroll(position) {
       this.isShow = -position.y > 1000;
      },
      //获取数据
      _getCategory(){
        getCategory().then(res => {
          // 1.获取商品分类
          this.categories = res.data.category.list;
          // 2.初始化每个子类的数据
          this.categories.forEach((item,index) => {
            this.categoryData[index] = {
              subcategories: {},
              categoryDetail: {
                pop: [],
                new: [],
                sell: []
              }
            }
          });
          console.log(this.categoryData);
          // 3.请求第一个分类的数据,默认进入分类界面显示第一个分类
          this._getSubcategories(0);
        })
      },
      _getSubcategories(index){
        this.currentIndex = index;
        //mailKey = 3627
        const mailKey = this.categories[index].maitKey;
        getSubcategory(mailKey).then(res => {
          this.categoryData[index].subcategories = res.data;
          this.categoryData = {...this.categoryData};
          this._getCategoryDetail(POP);
          this._getCategoryDetail(SELL);
          this._getCategoryDetail(NEW);
        })
      },
      _getCategoryDetail(type){
        //获取请求的miniWallKey
        const miniWallKey = this.categories[this.currentIndex].miniWallkey;
        //发送请求，传入miniWallKey和type
        getCategoryDetail(miniWallKey, type).then(res => {
          // console.log(res);
          this.categoryData[this.currentIndex].categoryDetail[type] = res;
          this.categoryData = {...this.categoryData};
        })
      },
      /**
       * 事件响应相关的方法
       */
      selectItem(index) {
        this._getSubcategories(index);
      }
    }

  }
</script>

<style scoped>
  .nav-bar {
    background-color: var(--color-tint);
    color: #fff;
  }
  #category {
    height: 100vh;
  }
  .content {
    position: absolute;
    left: 0;
    right: 0;
    top: 44px;
    bottom: 49px;
    display: flex;
  }
  #tab-content {
    height: calc(100vh - 49px - 44px);
    flex: 1;
  }
</style>
