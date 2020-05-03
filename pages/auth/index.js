import { request } from "../../request/index";
import {login}from"../../utils/asyncWx.js";
// pages/auth/index.js
Page({
async  bindGetuserInfo(e){
  try{
    
    const{encryptedData,rawData,iv,signature}=e.detail;
    
    const {code}=await login();
    const loginparams={encryptedData,rawData,iv,signature,code}
        
    const res=await request({url:"/users/wxlogin",data:loginparams,method:"post"});
    console.log(res);
    wx.setStorageSync('token', token);
    wx.navigateBack({
      delta:1
    });
      
  }catch(error){
    console.log(error);
    
  }
  
  }
})