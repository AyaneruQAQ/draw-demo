<template lang="html">
<div class="wrap">
  <div class="cont">
    <div class="head">1</div>
    <div class="main">2</div>
    <div class="side">3</div>
    <div class="footer">4</div>
  </div>
  <div class="loading"></div>
</div>
</template>

<script>
  import QS from 'qs'
  export default {
    name: "temper",
    data() {
      return {

      };
    },
    computed: {
     
    },
    created() {
    },
    mounted() {

    },
    methods: {
      test:function(){
        console.log('test')
      }

    },
    watch: {
      
    }
  };

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
 .cont{
   display: grid;
   width: 600px;
   padding: 10px;
   border: 10px solid #000;
   gap:20px;
   grid-template-columns: repeat(3,100px);
   grid-template-rows: repeat(3,100px);
   grid-template-areas: "a a a""b b c""d d d";
   justify-content: center;
  //  align-items: center;
   .head{
     background-color: aquamarine;
    //  margin: 10px;
     grid-area: a;
   }
   .main{
     background-color: bisque;
    //  margin: 10px;
     grid-area: b;

   }
   .side{
     grid-area: c;
    //  margin:10px;
     background: blueviolet;
   }
   .footer{
     grid-area: d;
    //  margin: 10px;
     background-color: brown;
   }
 }
 .wrap{
   position: relative;
   width: 100%;
   height: 100%;
 }
 .loading{
   width: 100px;
   height: 100px;
   border: 5px solid #f3f3f3;
   border-top: 5px solid red;
   border-radius: 50%;
   display: inline-block;
   animation: rotation 1s infinite linear;
   position: absolute;
   top:calc(~"50% - 50px");
   left: calc(~"50% - 50px");
   box-shadow: 0 0 0 1920px rgba(0,0,0,0.7);
 }
 @keyframes rotation {
  0%{
    transform: rotate(0deg);
  }
  100%{
    transform: rotate(360deg);
  }
 }
</style>
