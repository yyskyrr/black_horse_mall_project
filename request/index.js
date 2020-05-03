let  ajaxtimes=0;
export const request=(params)=>{
    let header={...params.header};
    if (params.url.includes("/my/")) {
        header["Authorization"]=wx.getStorageSync('token')
    }


    ajaxtimes++;
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    
    const baseUrl="https://api-hmugo-web.itheima.net/api/public/v1"
    return new Promise((resolve,reject)=>{
        wx.request({
            ...params,
            header:header,
            url:baseUrl+params.url,
            success:(result)=>{
                resolve(result);
            },
            fail:(err)=>{
                reject(err);
            } ,
            complete:()=>{
                ajaxtimes--;
                if(ajaxtimes==0){
                wx.hideLoading();
            }
            }
        });
    })
}