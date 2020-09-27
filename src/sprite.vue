<template>
    <div>
        <div id="pp" style="position:absolute;top:0;left:0;color:white;z-index:10"></div>
        <div id="ppp" style="position:absolute;top:20px;left:0;color:white;z-index:10"></div>
        <div id="pppp" style="position:absolute;top:40px;left:0;color:white;z-index:10"></div>

        <div id="stage"></div>
        <!-- <button id="btn" @click="change">按钮</button> -->
    </div>
</template>

<script>
import * as spritejs  from 'spritejs'
import {draggable,install} from 'next-draggable'
const {Scene,Path,Group,Sprite} = spritejs
install(spritejs)
// const = spritejs


export default {
    data(){
        return{
            width:0,
            height:0,
            g:'',
            obj:{},
            pageX:0,
            pageY:0,
            initX:0,
            initY:0,
            isTouch:false,
            start: [],
            gridgroup:''
        }
    },
    mounted(){

        const container = document.getElementById('stage')
        const _this = this
        this.width = document.getElementById('stage').clientWidth
        this.height = document.getElementById('stage').clientHeight
        const scene = new Scene({
            container,
            width:_this.width,
            height:_this.height,
        })
        // const gridlayer = scene.layer()
        const layer = scene.layer({
            zIndex:1
        });
        this.g = new Group({
            pos:[_this.width/2,_this.height/2],
            scale:[1,-1],
            anchor:[0.5,0.5],
            width:8000,
            height:8000,
        })
        // this.g.draggable()
        layer.append(this.g)

        const sp = new Sprite()
        sp.attr({
            anchor: [0.5, 0.5],
            pos: [0, 0],
            size: [100, 100],
            rotate: 45,
            bgcolor: '#3c7',
            zIndex:1,
            name:'130'
            })


        sp.addEventListener('mousedown',(e)=>{
            // console.log(e)
            console.log(e)
            document.getElementById('ppp').innerHTML = 'click'
        })

        this.g.addEventListener('mousemove',(e)=>{
            document.getElementById('pp').innerHTML = 'x,y:'+e.x+' '+e.y
            document.getElementById('ppp').innerHTML = 'layer:'+e.layerX+' '+e.layerY
            document.getElementById('pppp').innerHTML = 'original:'+e.originalX+' '+e.originalY
        })
        this.g.addEventListener('mousewheel',(e)=>{
            console.log(e)
        })
        this.g.addEventListener('touchstart',(e)=>{
            console.log(e)
            document.getElementById('pp').innerHTML = e.originalEvent.touches.length
            _this.pageX = e.originalEvent.targetTouches[0].pageX;
            _this.pageY = e.originalEvent.targetTouches[0].pageY;

            //初始位置的X，Y 坐标
            _this.initX = e.x;
            _this.initY = e.y;

            //记录初始 一组数据 作为缩放使用
            if (e.originalEvent.touches.length >= 2) {
              //判断是否有两个点在屏幕上
              _this.start = e.originalEvent.touches; //得到第一组两个点
            }

            //表示手指已按下
            _this.isTouch = true;
        })
        this.g.addEventListener('touchmove',(e)=>{
        // console.log(e.originalEvent.touches.length)
            e.originalEvent.stopPropagation()
        //   e.original.cancelBubble = true
          // 一根 手指 执行 目标元素移动 操作
          if (e.originalEvent.touches.length === 1 && _this.isTouch) {
            var touchMoveX = e.x,
              touchMoveY = e.y;

              let pos = _this.g.attr().pos
              _this.g.attr({
                  pos:[pos[0]+touchMoveX-_this.initX,pos[1]+touchMoveY-_this.initY]
              })
              _this.initX = touchMoveX
              _this.initY = touchMoveY
            //设置当前点击元素的 top left 定位值
            // var left =
            //   parseInt(touchMoveX) - parseInt(_this.pageX) + parseInt(_this.initX);
            // var top =
            //   parseInt(touchMoveY) - parseInt(_this.pageY) + parseInt(_this.initY);

            // if ((left >= -400 && left <= 300) && (top >= -550 && top <= 400)) {
            //   e.target.style.left = left + "px";
            //   e.target.style.top = top + "px";
            // }
          }

          // 2 根 手指执行 目标元素放大操作
          if (
            e.originalEvent.touches.length > 1 &&
            _this.isTouch 
          ) {
            //得到第二组两个点
            document.getElementById('pppp').innerHTML = '2zhi'
            document.getElementById('ppp').innerHTML = _this.g.attr().scale
            let now = e.originalEvent.touches;
            //得到缩放比例， getDistance 是勾股定理的一个方法
            let scale =
              _this.getDistance(now[0], now[1]) /
              _this.getDistance(_this.start[0], _this.start[1]);
            // 对缩放 比例 取整
            //e.target.innerHTML = scale;
            // document.getElementById('pp').innerHTML = scale
            let a = scale.toFixed(2);
            let originscale = _this.g.attr().scale
            // 执行目标元素的缩放操作
            _this.g.attr({
                scale:[a*originscale[0],a*originscale[1]]
            })
            _this.start = now
          }
        },
        false
        )
        this.g.addEventListener('touchend',(e)=>{
            // document.getElementById('pp').innerHTML =  JSON.stringify(e.currentTarget)

             if (_this.isTouch) {
                _this.isTouch = false;
            }
            },
        false
        )

        // g.append(path);
        this.g.append(sp)
   
        this.gridgroup = new Group()
        for(let i=-4000;i<4000;){
            let p = new Path()
            p.attr({
                d:`M${i},4000 L${i},-4000`,
                strokeColor:'black',
            })
            this.gridgroup.append(p)
            i+=100
        }
        for(let i=-4000;i<4000;){
            let p = new Path()
            p.attr({
                d:`M4000,${i} L-4000,${i}`,
                strokeColor:'black',
            })
            this.gridgroup.append(p)
            i+=100
        }
        this.g.append(this.gridgroup)
    },
    methods:{
        getDistance(p1, p2) {
        var x = p2.pageX - p1.pageX,
          y = p2.pageY - p1.pageY;
        return Math.sqrt(x * x + y * y);
      }
    }
}
</script>
<style scoped>
    #stage{
        width: 100vw;
        height: 100vh;
        background: #212121;
        margin: 0;

    }
    #btn{
        position: absolute;
        top:20px;
        right: 20px;
    }
</style>