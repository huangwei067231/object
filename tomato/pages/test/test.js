// pages/text/text.js
Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    msg:'hello world',
    container:true,
    arr:[{
      id:1,
      text:"你好！"
    },{
        id: 2,
        text: "是的嘛！"
    },{
        id: 3,
        text: "就是的！"
    }],
    Arr:[1,2,3]
  },
  //按钮绑定事件改变data值
   clickMe:function(){
     this.setData({msg:this.data.msg.split('').reverse().join('')})
   
  },
  pushItem:function(){
    console.log(1)
    let last = this.data.Arr[this.data.Arr.length-1]+1
    let newArr =[last]
    console.log(newArr)
    this.data.Arr = this.data.Arr.concat(newArr)
    console.log(this.data.Arr)
    this.setData({ Arr: this.data.Arr})
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
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
    this.setData({msg:'huangwei'})
    //this.setData({arr:'[id:1,text:"x"]'})
    console.log (this.data.msg)
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