<template>
  <div id="app">
          <div>第{{n}}手</div>
    <div id="chess">
    <div class="row">
       <Cell @click="onClickCell(0,$event)" :n='n'/>
       <Cell @click="onClickCell(1,$event)" :n='n'/>
       <Cell @click="onClickCell(2,$event)" :n='n'/>
    </div>
    <div class="row">
       <Cell @click="onClickCell(3,$event)" :n='n'/>
       <Cell @click="onClickCell(4,$event)" :n='n'/>
       <Cell @click="onClickCell(5,$event)" :n='n'/>
    </div>
    <div class="row">
       <Cell @click="onClickCell(6,$event)" :n='n'/>
       <Cell @click="onClickCell(7,$event)" :n='n'/>
       <Cell @click="onClickCell(8,$event)" :n='n'/>
    </div>
   </div>
   <div>结果：{{result===null?'胜负未分':`${result}:获得胜利！`}}</div>
  </div>
</template>

<script>
import Cell from '@/components/Cell'

export default {
  name: 'App',
  components:{
    Cell
  },
  data(){
     return {n:0,map:[[null,null,null],[null,null,null],[null,null,null]],result:null}
  },
  methods:{
    onClickCell(i,text){
      console.log(`第${i}被点击了，内容是：${text}`);
      this.map[Math.floor(i/3)][i%3] = text;

      this.n += 1
      this.tell()
    },
    tell(){
     for(let i=0;i<2;i++){
       if(this.map[i][0]!==null&&this.map[i][0]===this.map[i][1]&&this.map[i][1]===this.map[i][2]){
         this.result=this.map[i][0]
       }
     }
     for(let j=0;j<2;j++){
       if(this.map[0][j]!==null&&this.map[0][j]===this.map[1][j]&&this.map[1][j]===this.map[2][j]){
         this.result=this.map[0][j]
       }
     }
     if(this.map[0][0]!==null&&this.map[0][0]===this.map[1][1]&&this.map[1][1]===this.map[2][2]){
        this.result=this.map[0][0]
     }
      if(this.map[0][2]!==null&&this.map[0][2]===this.map[1][1]&&this.map[1][1]===this.map[2][0]){
        this.result=this.map[0][2]
     }

    }
  }
}
</script>

<style>
#app {
  margin-top: 20px;
  margin-bottom: 20px;
  color:red;
  display:flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;;
} 
.row{
  display: flex;
  
}
</style>
