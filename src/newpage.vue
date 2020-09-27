<template>
    <div>
        <input type="file" @change="get1" ref="inputer"/>
        <input type="file" @change="get2" ref="inputer1"/>
        <el-button @click="diff">hello</el-button>
    </div>

</template>

<script>
// import {diff,formatters,patch} from 'jsondiffpatch'
// var jsondiffpatch = require('jsondiffpatch').create()
import {diff,diffString} from 'json-diff'

export default {
    name:'NewPage',
    data(){
        return {    
            file1:{
                name:"1"
            },
            file2:{
                name:"2"
            },
        }
    },
    mounted(){
        // console.log(this.$router)
    },
    methods:{
        get1(){
            var that = this;

            var inputDOM = that.$refs.inputer;
            var file = inputDOM.files[0];
            // this.file1 = file[0]
            const reader = new FileReader()
            reader.readAsText(file)
            reader.onload = e=>{
                const res = e.target.result
                try{
                    this.file1 = res
                }catch{
                    console.log('err')
                }
            }
        },
        get2(){
            var that = this;

            var inputDOM = that.$refs.inputer1;
            var file = inputDOM.files[0];
            // this.file2 = file[0]
            const reader = new FileReader()
            reader.readAsText(file)
            reader.onload = e=>{
                const res = e.target.result
                try{
                    this.file2 = res
                }catch{
                    console.log('err')
                }
            }
        },
        diff(){
            // console.log(DiffPatcher)
            let delta = diff(this.file1,this.file2)
            console.log(delta)
            // console.log(formatters.console.format(delta))
        }
    }
}
</script>