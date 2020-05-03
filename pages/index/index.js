import { request } from "../../request/index";
wx-Page({
  data: {
    swiperlist:[ ],
    cateslist:[ ],
    floorlist:[],
  },

  /**
   * 生命周期函数--监听页面加载
   * 页面加载 就会触发
   */
  onLoad: function (options) {
    // wx.request({
    //   url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
    //   success: (result) => {
    //     console.log(result);
    //     this.setData({
    //       swiperlist:result.data.message
    //     })
        
    //   },
    // })
     
    this.getswiperlist(); 
    this.getcatelist();
    this.getfloorlist();
  },

 getswiperlist(){

  request({ url: '/home/swiperdata'})
  .then(result => {
    this.setData({
      
     swiperlist:result.data.message
    })
  })
      
  },

  getcatelist(){

    request({ url: '/home/catitems'})
    .then(result => {
      this.setData({
       cateslist:result.data.message
      })
    })

  },

  getfloorlist(){

    request({ url: '/home/floordata'})
    .then(result => {
      this.setData({
        floorlist:result.data.message
      })
    })
    
    
  },


});