import { request } from "../../request/index";

Page({
  data: {
    tabs:[
      {
        id:0,
        value:"综合",
        isactive:true
      },
      {
        id:1,
        value:"销量",
        isactive:false
      },
      {
        id:2,
        value:"价格",
        isactive:false
      }
    ],
   goodslist:[],
  },

  queryparams:{
    query:"",
    cid:"",
    pagenum:1,
    pagesize:10
  },

  totalpages:1,

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.queryparams.cid=options.cid||"";
    this.queryparams.query=options.query||"";
    this.getgoodslist();

  },

  getgoodslist(){
    request({url:"/goods/search",data:this.queryparams})
    
    
    .then(result=>{
      const total=result.data.message.total;
      this.totalpages=Math.ceil(total/this.queryparams.pagesize);
      
      this.setData({
        goodslist:[...this.data.goodslist].concat(...result.data.message.goods)
      })
    })
    wx.stopPullDownRefresh();
  
  },

  handletabsitemchange(e){
    const {index}=e.detail;
    let {tabs}=this.data;
    tabs.forEach((v,i)=>i===index?v.isactive=true:v.isactive=false);
    this.setData({
      tabs
    })
    
  },

  onReachBottom(){
    if(this.queryparams.pagenum>=this.totalpages){
      // console.log("没有下一页数据");
      wx.showToast({
        title: '没有下一页数据',
      })
    }else{
      this.queryparams.pagenum++;
      this.getgoodslist();
    }
  },
  onPullDownRefresh(){
    this.setData({
      goodslist:[],
    })
    this.queryparams.pagenum=1;
    this.getgoodslist();
  }
})