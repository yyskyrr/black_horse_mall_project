// pages/feedback/index.js
Page({

  data: {
    tabs:[
      {
        id:0,
        value:"体验问题",
        isactive:true
      },
      {
        id:1,
        value:"商品、商家投诉",
        isactive:false
      },
    ],
    chooseImages:[],
    textVal:""
  },
  UploadImgs:[],
  handletabsitemchange(e){
    const {index}=e.detail;
    let {tabs}=this.data;
    tabs.forEach((v,i)=>i===index?v.isactive=true:v.isactive=false);
    this.setData({
      tabs
    })
    
  },

  handleChoose(){
    wx.chooseImage({
      success: (res) => {
        
        this.setData({
          chooseImages:[...this.data.chooseImages,...res.tempFilePaths]
        })
      },
    })
  },

  handleRemoveImg(e){
    
    const {index}=e.currentTarget.dataset;
    
    let {chooseImages}=this.data;
    
    chooseImages.splice(index,1)
    this.setData({
      chooseImages
    })
  },

  handleTextInpute(e){
    this.setData({
      textVal:e.detail.value,
    })
  },

  handleFormSubmit(){
    const {textVal,chooseImages}=this.data;
    if (!textVal.trim()) {
      wx.showToast({
        title: '输入不合法',
        icon:'none',
        mask:true,
        duration: 1000,
      });
      return;
    }
    wx.showLoading({
      title: '正在上传中',
      mask:true
    })
    if (chooseImages!=0) {
      chooseImages.forEach((v,i)=>{
      console.log(v);
      
      wx.uploadFile({
        filePath: 'v',
        name: 'image',
        url: 'https://img.coolcr.cn/api/upload',
        formData:{}, 
        success:(res)=>{
          console.log(res);
          let url=JSON.parse (res.data).url;
          this.UploadImgs.push(url);

          if (i===chooseImages.length-1) {
            wx.hideLoading( );
            console.log("111");
            this.setData({
              textVal:"",
              chooseImages:[]
            })
            wx.navigateBack({
              delta:1
            })
          }
        }
      })
    });
    } else {
      wx.hideLoading();
      console.log("只是提交了文本");
      wx.navigateBack({
        delta:1
      })
    }
    
  },
})