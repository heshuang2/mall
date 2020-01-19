<template>
  <!--ref/children-->
  <div class="wrapper" ref="wrapper">
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from "better-scroll"
  export default {
    name: "Scroll",
    props: {
      probeType: {
        type: Number,
        default: 0
      },
      pullUpLoad: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        scroll: null
      }
    },
    mounted() {
      this.scroll = new BScroll(this.$refs.wrapper, {
        click: true,
        probeType: this.probeType,
        pullUpLoad: this.pullUpLoad
      });
      //监听滚动位置
      // if (this.prototype === 2 || this.prototype === 3) {
        this.scroll.on("scroll", (position) => {
          // console.log(position);
          this.$emit("scroll", position)
        })
      // }
      //监听上拉事件
     if (this.pullUpLoad) {
       this.scroll.on("pullingUp", () => {
         this.$emit("pullingUp")
       })
     }
    },
    methods: {
      scrollTo(x, y, Time=500) {
        this.scroll.scrollTo(x, y, Time)
      },
      finishPullUp() {
        // 事情做完，需要调用此方法告诉数据已加载，否则上拉事件只会执行一次
        this.scroll.finishPullUp()
      },
      refresh() {
        // console.log("!!");
        this.scroll && this.scroll.refresh()
      },
      getScrollY() {
        return this.scroll ? this.scroll.y : 0
      }
    }
  }
</script>

<style scoped>
  .wrapper{
    overflow: hidden;
  }
</style>
