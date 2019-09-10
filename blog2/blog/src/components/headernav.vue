<template>
  <div class="header">
      <div id="mingxi">
        <img src="../assets/logo.png" alt="">
        <div id="nav-pre">
        <span>在线商城</span><span>坚果 Pro</span><span>Smartisan M1/M1L</span><span>Smartisan OS</span>
        <span>欢喜云</span><span>应用下载</span><span>官方论坛</span></div>
      </div>
      <div id="nav-next">
         <span>首页</span><span>手机</span><span>*足迹系列*手感膜</span><span>官方配件</span>
         <span>周边产品</span><span>第三配件</span><span>全部商品</span><span>服务</span>
      </div>
  </div>
</template>

<script>
export default {
  name: 'headernav',
  data () {
    return {
      msg: 'this is message'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
   #mingxi{
     color:white;
     background: black;
     font-size: 12px;
     height:60px;
     position: relative;
    

   }
   #mingxi > img{
      position: absolute;
      width:24px;
      height:24px;
      border-radius:12px;
      background: white;
      margin-top:18px;
      margin-left:25%;
   }
    #mingxi > #nav-pre{
 
      position: absolute;
      margin-top:22px;
      margin-left:26%;
      }
      #mingxi > #nav-pre> span{
      margin-left:36px;
      }
      #nav-next{
      text-align: center;
      margin-top:12px;
      }
      #nav-next>span{
        margin-right: 36px;
      }
</style>
