<template>
  <div class="back-top" ref="div"> <!--@touchstart="move"-->
    <img src="~assets/img/common/top.png" alt="">
  </div>
</template>

<script>
  export default {
    name: "BackTop",
    data() {
        return{

     }
    },
    methods: {
      move(e){
        let odiv = this.$refs.div;        //获取目标元素
        e.preventDefault();
        let disX = e.touches[0].clientX - odiv.offsetLeft;
        let disY = e.touches[0].clientY - odiv.offsetTop;
        document.ontouchmove = (e)=>{
          console.log("移动")
          //鼠标按下并移动的事件
          //用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
          //因为img居中对齐，所以还要减去目标元素距离body的偏移量
          let left = e.touches[0].clientX - disX;
          let top = e.touches[0].clientY - disY;
          console.log(odiv.offsetWidth, odiv.offsetHeight);
          console.log(left, top);
          console.log(document.body.clientWidth, document.body.clientHeight)
          //移动当前元素
          if (left >= document.body.clientWidth - odiv.offsetWidth){
            left = document.body.clientWidth - odiv.offsetWidth
          } else if (left <= 0) {
            left = 0;
          }
          if (top >= document.body.clientHeight - odiv.offsetHeight - 49){
            top = document.body.clientHeight - odiv.offsetHeight - 45
          } else if (top <= 44){
            top = 44
          }
          odiv.style.left = left + 'px';
          odiv.style.top = top + 'px';
        };
        document.ontouchend = (e) => {
          console.log("停止");
          document.ontouchmove = null;
        };
      }
    }
    }
</script>

<style scoped>
 .back-top {
   position: absolute;
   right: 10px;
   bottom: 50px;
   height: 43px;
   width: 43px;
 }
  .back-top img {
    height: 43px;
    width: 43px;
    position: relative;
  }
</style>
