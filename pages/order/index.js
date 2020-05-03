import { request } from "../../request/index";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    orders:[],
    tabs:[
      {
        id:0,
        value:"全部",
        isactive:true
      },
      {
        id:1,
        value:"待付款",
        isactive:false
      },
      {
        id:2,
        value:"代发货",
        isactive:false
      },
      {
        id:3,
        value:"退款/退货",
        isactive:false
      }
    ],
  },

  onShow(options){
    const token=wx.getStorageSync("token");
    if(!token){
      wx.navigateTo({
        url: '/pages/auth/index',
      });
      return;
    }
    
    
    
    let pages=getCurrentPages();
    let currentPage=pages[pages.length-1]
    const {type}=currentPage.options;
    this.changeTitleByIndex(type-1);
    this.getOrders(type);
  },

  async getOrders(type){
    const res=await request({url:"/my/orders/all",data:{type}});
    console.log(res);
    
    this.setData({
      orders:res.data.message.orders.map(v=>({...v,create_time_cn:(new Date(v.create_time*1000).toLocaleString())})),
    })
  },
  changeTitleByIndex(index){
    let {tabs}=this.data;
    tabs.forEach((v,i)=>i===index?v.isactive=true:v.isactive=false);
    this.setData({
      tabs
    })
  },
  handletabsitemchange(e){
    const {index}=e.detail;
    this.changeTitleByIndex(index);
    this.getOrders(index+1);
  },
  
})