<template>
  <div id="category">
    <nav-bar class="nav-bar"><div slot="center">商品分类</div></nav-bar>
    <div class="content">
      <tab-menu :categories="categories"
                @selectItem="selectItem"/>
      <scroll id="tab-content"
                :data="[categoryData]"
                ref="scroll">
        <div>
          <tab-content-category :subcategories="showSubcategory"/>
        </div>
      </scroll>
    </div>
  </div>
</template>

<script>
  import NavBar from "../../components/common/navbar/NavBar";
  import TabMenu from "./childComps/TabMenu";
  import TabContentCategory from "./childComps/TabContentCategory";

  import Scroll from "../../components/common/scroll/Scroll";

  import {getCategory, getCategoryDetail, getSubcategory} from "../../network/category";
  import {POP, SELL, NEW} from "common/const";

  export default {
    name: "Category",
    components: {
      Scroll,
      TabContentCategory,
      TabMenu,
      NavBar
    },
    created() {
      //请求分类数据
      this._getCategory();
      //监听图片加载完成
      this.$bus.$on("imgLoad", () => {
        this.$refs.scroll.refresh();
      })
    },
    data() {
      return {
        categories: [],
        categoryData: {
        },
        currentIndex: -1
      }
    },
    computed: {
      showSubcategory() {
        if (this.currentIndex === -1) return {}
        return this.categoryData[this.currentIndex].subcategories;
      }
    },
    methods: {
      _getCategory(){
        getCategory().then(res => {
          // 1.获取商品分类
          this.categories = res.data.category.list;
          console.log(this.categories);
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
          console.log(res);
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
        console.log(index);
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
    height: 100vh;
    flex: 1;
  }
</style>
