import {debounce} from "./utils";
import {TOP_DISTANCE, POP, NEW, SELL} from "./const";
import BackTop from "../components/content/backTop/BackTop";

export const itemListenerMixin = {
  data() {
    return {
      newRefresh: null,
      itemImgListener: null
    }
  },
  mounted() {
    this.newRefresh = debounce(this.$refs.scroll.refresh, 200);
    //对监听事件进行保存
    this.itemImgListener = () => {
      this.newRefresh()
    };
    //接受到image加载完成事件调用itemImgListener对页面进行newRefresh
    this.$bus.$on("itemImageLoad", this.itemImgListener);
  }
}

export const backTopMixin = {
  components: {
    BackTop
  },
  data() {
    return {
      isShow: false,
    }
  },
  methods: {
    backClick() {
      this.$refs.scroll.scrollTo(0, 0, TOP_DISTANCE)
    },
  }
}
export const tabControlMixin = {
  data: function () {
    return {
      currentType: POP
    }
  },
  methods: {
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = POP;
          break;
        case 1:
          this.currentType = NEW;
          break;
        case 2:
          this.currentType = SELL;
          break
      }
      console.log(this.currentType);
    }
  }
}
