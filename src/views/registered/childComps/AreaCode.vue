<template>
  <div id="areaCode">
    <nav-bar>
      <div slot="left" class="back" @click="backClick">
        <img src="~assets/img/common/back.svg" alt="">
      </div>
      <div slot="center" class="center">
        <h2>选择国家和地区</h2>
      </div>
    </nav-bar>
    <scroll class="content">
      <div class="title">常用国家/地区</div>
      <table  id="customers">
        <tr v-for="(item, index) in numbers"
            :class="{active: index === currentIndex}"
            @click="itemClick(index,item)">
          <th>{{item.country}}</th>
          <td>{{item.tel}}</td>
        </tr>
      </table>
    </scroll>
  </div>
</template>

<script>
  import NavBar from "../../../components/common/navbar/NavBar";

  import Scroll from "../../../components/common/scroll/Scroll";

  export default {
    name: "AreaCode",
    components: {
      Scroll,
      NavBar
    },
    data() {
      return {
        numbers: [
          {country:"安哥拉", tel: "+" + 244},
          {country:"阿富汗", tel: "+" + 93},
          {country:"阿尔巴尼亚", tel: "+" + 355},
          {country:"阿尔及利亚", tel: "+" + 213},
          {country:"安道尔共和国", tel: "+" + 376},
          {country:"安圭拉岛", tel: "+" + 1264},
          {country:"安提瓜和巴布达", tel: "+" + 1268},
          {country:"阿根廷", tel: "+" + 54},
          {country:"亚美尼亚", tel: "+" + 374},
          {country:"阿森松", tel: "+" + 247},
          {country:"澳大利亚", tel: "+" + 61},
          {country:"奥地利", tel: "+" + 43},
          {country:"阿塞拜疆", tel: "+" + 994},
          {country:"巴哈马", tel: "+" + 1242},
          {country:"中国", tel: "+" + 86},
        ],
        currentIndex: null,
      }
    },
    methods: {
      backClick() {
        this.$router.back();
      },
      itemClick(index, item) {
        this.currentIndex = index;
        this.$store.state.tel = item.tel;
        setTimeout(() => {
          this.$router.replace("/registered");
        },100)
      }
    },

  }
</script>

<style scoped>
  #areaCode {
    position: relative;
    height: 100vh;
    z-index: 9;
    background-color: #fff;
  }
  .content {
    height: calc(100vh - 49px);
    overflow: hidden;
  }
  #customers {
    width: 100%;
    border-collapse:collapse;
  }
  #customers tr {
    font-size:20px;
    border-bottom:3px solid #cccccc;
    line-height: 50px;
    color: #000;
    text-align: left;
    text-indent: 1em;
  }
  #customers td {
    text-align: right;
    padding-right: 20px;
    color: #999;
  }
  .title {
    padding-left: 20px;
    font-weight: bold;
    background-color: #cccccc;
    color: #000;
    line-height: 25px;
  }
  .back img {
    margin-top: 10px;
    margin-left: 10px;
  }
  .center {
    float: left;
  }
  .active {
    background-color: #cccccc;
  }

</style>
