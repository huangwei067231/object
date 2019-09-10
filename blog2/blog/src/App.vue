<template>
  <div id="app">
    <headernav id="header"></headernav>
    <main id="main">
    <router-view/>
    </main>
    <footer id="footer"></footer>
  </div>
</template>

<script>
import headernav from '@/components/headernav'
import footer from '@/components/footer'

export default {
  name: 'App',
  components:{
    headernav,
    footer
  }
}
</script>

<style  scoped lang="less">

// #app { 
//  display: grid;
//  grid-template-columns: 12% auto 12%;
//  grid-template-rows: auto 1fr auto;
//  grid-template-areas: "header header header"
//                       ".      main   ."
//                       "footer footer footer";
   
//    #header {
//       grid-area: header;
//       padding-left:12%;
//       padding-right:12%;
     
//    }
//    #main{
//       grid-area:main;
//    }
//    #footer{
//      grid-area: footer;
//      padding-left:12%;
//      padding-right:12%;
     
//    }  
// } 

// @media(max-width:780px){
//   #app{
//     grid-template-columns: 10px auto 10px;

//     #header,#footer{
//       padding-left:10px;
//       padding-right:10px;
//     }
//   }
// }

</style>
