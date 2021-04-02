<template>
    <div>
        <input type="file" @change="get1" ref="inputer"/>
        <input type="file" @change="get2" ref="inputer1"/>
        <button class="btn" @mousedown="diff">hello</button>
        <a href="www.baidu.com">baiduyixia</a>

        <div>
            <ul class="operate-panel">
                <!-- 主操作区域 -->
                <li class="item">点赞</li>
                <li class="item">投币</li>
                <li class="item">收藏</li>
                <li class="item item-forward">转发</li>
                
                <!-- 辅助操作区域 -->
                <li class="item item-report">投诉</li>
                <li class="item">笔记</li>
                <li class="item">更多操作</li>
                </ul>

        </div>
        <div class="auto">
            <div class="child lc">1</div>
            <div class="child lc">2</div>
            <div class="child">3</div>
            <div class="child rc">4</div>
            <div class="child rc">5</div>

        </div>
    </div>
    
</template>

<script>
// import {diff,formatters,patch} from 'jsondiffpatch'
// var jsondiffpatch = require('jsondiffpatch').create()
import {diff,diffString} from 'json-diff'
import Hello from './hello'

export default {
    name:'NewPage',
    mixins:[Hello],
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
        console.log(this.$worker)
        this.$worker.create()
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
            console.log(a)
            // console.log(formatters.console.format(delta))
        },
        test(){
            console.log('selftest')
        }
    }
}
</script>
<style lang="less" scoped>
    .auto{
        display: flex;
        align-items: center;
        .child{
            width: 100px;
            background: cornflowerblue;
        }
        .lc{
            margin-left: auto;
        }
        .rc{
            margin-right: auto;
        }
    }

    a:link{
        color: aquamarine;
    }
    a:visited{
        color: blanchedalmond;
    }
    .btn {
        font-size: 14px;
        color: #fff;
        background-color: aqua;
        padding: 14px 36px;
        border-radius: 8px;
        border: none;
        outline: none;
        transition: 200ms ease all;
        position: relative;
        display: inline-block;

        &:hover {
            background: #fff;
            color: aqua;
            box-shadow: 0 0 0 1920px rgba(0,0,0,0.7);
            transform: scale(1.2);
            &:before,
            &:after {
            width: 100%;
            transition: 600ms ease all;
            }
        }

        &:before,
        &:after {
            content: '';
            position: absolute;
            top: 0;
            right: 0;
            height: 2px;
            width: 0;
            transition: 400ms ease all;
        }

        &::after {
            right: inherit;
            top: inherit;
            left: 0;
            bottom: 0;
        }
    }

    .operate-panel{
        display: flex;
        align-items: center;
        .item{
            margin-left: 2rem;
        }
        .item.item-forward{
            margin-right: auto;
        }
        .item.item-report{
            margin-left: auto;
        }
    }
</style>