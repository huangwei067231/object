<template>
 
  <div class="cell" v-on:click="clickCell">
     <template v-if="a">{{text}}</template>
     <template v-else></template>
  </div>

</template>

<script>
export default {
  props:['n'],
  data(){
    return { a:false ,text:""}
  },
  methods:{
  clickCell(){
    if(this.text !== ""){
      return;
    }
      this.a=true;
      this.text = this.n % 2 === 0 ? "x" : "o";
      this.$emit("click",this.text)
  }
 }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.cell{
  border:1px solid red;
  width:200px;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 120px;
}
</style>
