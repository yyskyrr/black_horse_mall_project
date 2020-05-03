import { request } from "../../request/index";

Page({
  data: {
    goods:[],
    isFocus:false,
    inpValue:""
  },
  TimeId:-1,
  handleInput(e){
    const {value}=e.detail;
    if(!value.trim()){
      clearTimeout(this.TimeId);
      this.TimeId=setTimeout(() => {
          this.setData({
            goods:[],
            isFocus:false,
          })
    }, 500);
      return;
    }
    this.setData({
      isFocus:true,
    })
    clearTimeout(this.TimeId);
    this.TimeId=setTimeout(() => {
      this.qsearch(value);
    }, 1000);
    
  },

  async qsearch(query){
    const res=await request({url:"/goods/search",data:{query}})
    this.setData({
      goods:res.data.message.goods,
    })
  },

  handlecancle(){
    this.setData({
      inpValue:"",
      isFocus:false,
      goods:[]
    })
  }
})