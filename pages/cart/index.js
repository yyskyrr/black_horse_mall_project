import { request } from "../../request/index";
Page({
  data:{
    address:{},
    cart:[],
    allchecked:false,
    totalprice:0,
    totalnum:0
  },

  onShow(){
    const address=wx.getStorageSync('address')||[];
    const cart=wx.getStorageSync('cart')||[];
    // const allchecked=cart.length?cart.every(v=>v.checked):false;
    this.setCart(cart);
    this.setData({address});
  },

   handlechoose(){
    wx.getSetting({
      success: (result) => {
        console.log(result);
        
        const scopeAddress =result.authSetting["scope.address"];
       
        if(scopeAddress===true||scopeAddress===undefined){
          wx.chooseAddress({
            success: (res) => {
              res.all=res.provinceName+res.cityName+res.countyName+res.detailInfo;
              wx.setStorageSync('address', res)
            },
          })
        }else{
          wx.openSetting({
            success: (res1) => {
              
              wx.chooseAddress({
                success: (res3) => {
                  res3.all=res3.provinceName+res3.cityName+res3.countyName+res3.detailInfo;
                  wx.setStorageSync('address', res3)
                  
                },
              })
            },
          })
        }
      },

    })
  
  // const res1= await getSetting();
  // const scopeAddress =result.authSetting["scope.address"];
  // if(scopeAddress===true||scopeAddress===undefined){
  //   const res2=await chooseAddress();
  //   console.log(res2);
  // }else{
  //   await openSetting();
  //   const res2=await chooseAddress();
  //   console.log(res2);
  // }
  },

  handleitemchange(e){
    const goods_id=e.currentTarget.dataset.id;
    let {cart}=this.data;
    let index=cart.findIndex(v=>v.goods_id===goods_id);
    cart[index].checked=!cart[index].checked;
    
    this.setCart(cart);
  },

  setCart(cart){
    
    let allchecked=true;
    let totalprice=0;
    let totalnum=0;
    cart.forEach(v=> {
      if(v.checked){
        totalprice+=v.num*v.goods_price;
        totalnum+=v.num;
      }else{
        allchecked=false;
      }
    });
    allchecked=cart.length!=0?allchecked:false;
    this.setData({
      cart,
      allchecked,
      totalprice,
      totalnum
    })
    wx.setStorageSync("cart",cart);
  },

  handleitemallcheck(){
    let {cart,allchecked}=this.data;
    allchecked=!allchecked;
    cart.forEach(v=>v.checked=allchecked);
    this.setCart(cart);
  },

  handleitemnumedit(e){
    const{operation,id}=e.currentTarget.dataset;
    
    let {cart}=this.data;
    const index=cart.findIndex(v=>v.goods_id===id);
    if(cart[index].num===1&&operation===-1){
      wx.showModal({
        title:'提示',
        content: '您是否要删除?',
        success:(res)=>{
          if(res.confirm){
            cart.splice(index,1);
            this.setCart(cart);
          }else if(res.cancel){
            console.log("用户取消操作");
          }
        }
      })
    }else{
    cart[index].num+=operation;
    this.setCart(cart);
    }
  },

  handlepay(){
    const{address,totalnum}=this.data;
    if(!address.userName){
      wx.showToast({
        title: '您还没有选择收货地址',
        icon:'none'
      })
    }
    else if(totalnum===0){
      wx.showToast({
        title: '您还没有选购商品',
        icon:'none'
      })
    }

    else{wx.navigateTo({
      url:'/pages/pay/index',

    })
  }
  }
})