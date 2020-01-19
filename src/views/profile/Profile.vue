<template>
  <div id="profile">
    <nav-bar class="profile-nav">
      <div slot="center" class="person">
        <img src="../../assets/img/profile/person.jpg" alt=""/></div>
      <div slot="right" class="setting">
        <img src="../../assets/img/profile/setting.jpg" alt=""/>
      </div>
    </nav-bar>
    <user-info />
    <account-info/>
    <normal-list-view :list-data="orderList"></normal-list-view>
    <normal-list-view :list-data="serviceList"></normal-list-view>
  </div>
</template>

<script>
  import NavBar from "../../components/common/navbar/NavBar";
  import UserInfo from "./childComps/UserInfo";
  import AccountInfo from "./childComps/AccountInfo";
  import NormalListView from "./childComps/NormalListView";
  export default {
    name: "Profile",
    components: {
      NormalListView,
      AccountInfo,
      UserInfo,
      NavBar
    },
    data() {
      return {
        orderList: [
          {icon: "message.svg", info: "我的消息"},
          {icon: 'pointer.svg', info: '积分商城'},
          {icon: 'vip.svg', info: '会员卡'},
        ],
        serviceList: [
          {icon: 'cart.svg', info: '我的购物车'},
          {icon: 'shopping.svg', info: '下载购物APP'},
        ]
      }
    },
    methods: {

    }
  }
</script>

<style scoped>
  .profile-nav{
    background-color: #fff;
    border-bottom: 2px solid #eee;
    box-shadow: 0 -1px 5px rgba(150,150,150,.8);
  }
  .setting {
  }
  .setting img {
    width: 28px;
    height: 28px;
    display: block;
    float: right;
    margin-top: 7px;
    margin-right: 5px;
    background: #fff;
  }
  .person img {
    width: 35px;
    height: 28px;
    display: block;
    float: right;
    margin-top: 7px;
  }

</style>
