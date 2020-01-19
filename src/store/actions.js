import {
  ADD_COUNTER,
  ADD_TO_CART
} from "./mutation.types"

export default {
  addCart(context, payload) {
    //payload=Detail中加入购物车添加的product商品对象
    //1.查找之前数组中是否有该商品
    return new Promise((resolve, reject) => {
      let oldProduct = context.state.cartList.find(item => {
        return item.iid === payload.iid
      });
      if (oldProduct){ //数量+1
        context.commit(ADD_COUNTER, oldProduct);
        resolve("当前商品数量+1");
      }else { // 添加新的商品
        payload.count = 1;
        context.commit(ADD_TO_CART, payload);
        resolve("添加新的商品")
      }
      console.log(context.state.cartList);
    })
  }
}
