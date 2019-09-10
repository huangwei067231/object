

// pages/home/home.js
const {http} = require('../../lib/http.js')

Page({ 

  /**
   * 页面的初始数据
   */
  updateId:'',
  updateIndex:'',
  data: {
    lists:[],
    visibleCreateConfirm:false,
    visibleUpdateConfirm: false,
    updateContent:"",
    animationData: {}
  },

  onShow(){
    http.get('/todos?completed=false').then(response=>{
      this.setData({lists:response.data.resources})
    })
  },
  comfirmCreate(event){
    let content = event.detail
    if(content){
      http.post('/todos',{
        completed:false, description:content
      })
      .then(response=>{
        let todo = [response.data.resource]
        this.data.lists = todo.concant(this.data.lists)
        this.setData({lists:this.data.lists})
        this.hideCreateConfirm()
      })
    }
  },
  changeText(event){
    let {content, id ,index} = event.currentTarget.dataset
    this.updateId = id
    this.updateIndex = index
    this.setData({ visibleUpdateConfirm: true, updateContent:content})
  },
  confirmUpdate(event){
    let content = event.detail
    http.put(`/todos/${this.updateIndex}`,{
      description:content
    })
    .then(response=>{
      let todo = response.data.resource
      this.data.lists[this.updataIndex] = todo
      this.setData({lists:this.data.lists})
      this.hideUpdateConfirm()
    })
  },
  destroyTodo(event){
    let index = event.currentTarget.dataset.index
    let id = event.currentTarget.dataset.id
    http.put(`/todos/${id}`,{
      completed:true
    })
    .then(response=>{
      let todo = response.data.resource
      this.data.lists[index] = todo
      this.setData({lists:this.data.lists})
    })
  },
  hideCreateConfirm(){
    this.setData({visibleCreateConfirm:false})
  },
  showCreateConfirm(){
    this.setData({visibleCreateConfirm:true})
  },
  hideUpdateConfirm(){
    this.setData({visibleUpdateConfirm:false})
  }
})