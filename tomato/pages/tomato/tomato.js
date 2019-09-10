// pages/tomato/tomato.js
const {http} = require('../../lib/http.js');

Page({
   timer:null,
  /**
   * 页面的初始数据
   */
  data: {
    defalutSecond:1500,
    time:"",
    timerStatus:'stop',
    confirmVisible:false,
    againButtonVisible:false,
    finishConfirmVisible: false,
    tomato:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
     this.startTimer()
     http.post('/tomatoes').then(response =>{
       this.setData({ tomato :response.data.resource})
     })
  },
  startTimer(){
    this.setData({ timerStatus:'start'})
    this.changeTime()
    this.timer=setInterval(()=>{
      this.data.defalutSecond = this.data.defalutSecond - 1
      this.changeTime()
      if(this.data.defalutSecond <=0){
        this.setData({ againButtonVisible: true})
        this.setData({ finishConfirmVisible: true })
        return this.clearTimer()
      }
    },1000)
  },
  againTime(){
    this.data.defalutSecond = 1500
    this.setData({ againButtonVisible: false})
    this.startTimer()
  },
  clearTimer(){
    clearInterval(this.timer)
    this.time = null
    this.setData({timerStatus:'stop'})
  },
  changeTime(){
    let m = Math.floor(this.data.defalutSecond/60)
    let s = Math.floor(this.data.defalutSecond%60)
    if(s ===0){
      s="00"
    }
    if((s+"").length ===1){
      s = "0" +s
    }
    if((m+"").length === 1){
      m = "0" + m
    }
    this.setData({time: `${m}:${s}` })
  },
  confirmAbandon(event){
    let content = event.detail
    http.put(`/tomatoes/${this.data.tomato.id}`,{
      description:content,
      aborted:true
    })
    .then(response =>{
      wx.navigateBack({ to:-1 })
    })
  },
  confirmFinish(event){
    let content = event.detail
  },
  confirmCancel(){
    this.setData({finishConfirmVisible:false})
  },
  showConfirm(){
    this.setData({confirmVisible:true})
    this.clearTimer()
  },
  hideConfirm(){
    this.setData({ confirmVisible: false})
    this.startTimer()
  },
  onHide(){
    this.clearTimer()
    http.put(`/tomatoes/${this.data.tomato.id}`,{
      description:"退出放弃",
      aborted: true
    })
  },
  onUnload(){
    this.clearTimer()
    http.put(`/tomatoes/${this.data.tomato.id}`, {
      description: "退出放弃",
      aborted: true
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})