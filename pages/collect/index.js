// pages/collect/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    collect:[],
    tabs:[
      {
        id:0,
        value:"商品收藏",
        isactive:true
      },
      {
        id:1,
        value:"品牌收藏",
        isactive:false
      },
      {
        id:2,
        value:"店铺收藏",
        isactive:false
      },
      {
        id:3,
        value:"浏览足迹",
        isactive:false
      }
    ],
  },
  onShow(){
    const collect=wx.getStorageSync('collect')||[];
    this.setData({
      collect
    });
  },
  handletabsitemchange(e) {
    const { index } = e.detail;
    let { tabs } = this.data;
    tabs.forEach((v, i) => i === index ? v.isactive = true : v.isactive = false);
    this.setData({
      tabs
    })
  }
})