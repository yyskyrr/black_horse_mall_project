import { request } from "../../request/index";
import {requestPayment} from"../../utils/asyncWx.js";

Page({
  data:{
    address:{},
    cart:[],
    totalprice:0,
    totalnum:0,
  },

  onShow(){
    const address=wx.getStorageSync('address')||[];
    let cart=wx.getStorageSync('cart')||[];
    cart=cart.filter(v=>v.checked)
    // const allchecked=cart.length?cart.every(v=>v.checked):false;
    this.setData({address});

    let totalprice=0;
    let totalnum=0;
    cart.forEach(v=> {
        totalprice+=v.num*v.goods_price;
        totalnum+=v.num;
    });
    this.setData({
      cart,
      totalprice,
      totalnum,
      address
    })
  },

 async handleorderpay(){
   try {
    const token=wx.getStorageSync("token");
    if(!token){
      wx.navigateTo({
        url:'/pages/auth/index'
      });
      return;
    }
    // const header={Authorization:token};
    const order_price=this.data.totalprice;
    const consignee_addr=this.data.address.all;
    const cart=this.data.cart;
    let goods=[];
    cart.forEach(v=>goods.push({
      goods_id:v.goods_id,
      goods_number:v.num,
      goods_price:v.goods_price
    }))
    const orderparams={order_price,consignee_addr,goods};
    
    const res=await request({url:"/my/orders/create",method:"POST",data:orderparams});
    const {order_number}=res.data.message;
    
    const a=await request({url:"/my/orders/req_unifiedorder",method:"POST",data:{order_number}});
    const{pay}=a.data.message;
    
    await requestPayment(pay);

    const result=await request({url:"/my/orders/chkOrder",method:"POST",data:{order_number}});
    
    wx.showToast({ title: '支付成功'});
    let newcart=wx.getStorageSync("cart");
    newcart=newcart.filter(v=>!v.checked);
    wx.setStorageSync('cart', newcart)


    wx.navigateTo({
      url: '../order/index',
    })
   } catch (err) {
    wx.showToast({ title: '支付失败',icon: 'none' });
    console.log(err); 
   }
  },


})
