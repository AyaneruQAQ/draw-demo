<template>
    <div>
        <div id="pp" style="position:absolute;top:0;left:0;color:white;z-index:10"></div>
        <div id="ppp" style="position:absolute;top:20px;left:0;color:white;z-index:10"></div>
        <div id="pppp" style="position:absolute;top:40px;left:0;color:white;z-index:10"></div>

        <div id="stage"></div>
        <button id="btn" @click="change">按钮</button>
    </div>
</template>

<script>
import * as spritejs  from 'spritejs'
import {draggable,install} from 'next-draggable'
import IMG from './assets/user.jpg'
import LABEL from './assets/addedLabel.svg'
const {Scene,Path,Group,Sprite,SpriteSvg} = spritejs
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
            gridgroup:'',
            labelgroup:'',
            layer:'',
            timer:-1
        }
    },
    beforeDestroy(){
        // clearInterval(this.timer)
    },
    mounted(){
        // this.hello()
        document.addEventListener('keyup',(e)=>{
            if(e&&e.keyCode=== 65){
                console.log('a')
            }
        })
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
        this.layer = scene.layer({
            zIndex:1,
            // displayRatio:2
        });
        this.g = new Group({
            pos:[_this.width/2,_this.height/2],
            scale:[1,-1],
            anchor:[0.5,0.5],
            width:8000,
            height:8000,
            enableCache:false,
        })
        // this.g.draggable()
        this.layer.append(this.g)

        const sp = new Sprite()
        sp.attr({
            anchor: [0.5, 0.5],
            pos: [0, 0],
            scale:[1,-1],
            size: [40, 40],
            // bgcolor: '#3c7',
            texture:IMG,
            // zIndex:1,
            name:'130'
            })



        //单击双击等事件可以注册在父元素上，使用事件冒泡来处理，避免渲染卡顿
        this.g.addEventListener('mousedown',(e)=>{
            console.log(e.target.name)
            e.originalEvent.stopPropagation()//阻止冒泡

            document.getElementById('ppp').innerHTML = 'click'
        })
        sp.addEventListener('dblclick',(e)=>{
            console.log('dblclick')
        })

        this.labelgroup = new Group()
        let svg = new SpriteSvg(LABEL)
        svg.attr({
            size:[100,100],
            anchor:[0.5,0.5],
            pos:[100,100],
            flexible:true
        })

        let pat = new Path({
            d:"M5 15H3v4c0 1.1.9 2 2 2h4v-2H5v-4zM5 5h4V3H5c-1.1 0-2 .9-2 2v4h2V5zm14-2h-4v2h4v4h2V5c0-1.1-.9-2-2-2zm0 16h-4v2h4c1.1 0 2-.9 2-2v-4h-2v4zM12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z",
            fillColor:'green',
            // lineWidth:12,
            normalize:true,
            pos:[-100,100],
            scale:[2,2],
            zIndex:1
        })
        this.g.addEventListener('mousemove',(e)=>{
            document.getElementById('pp').innerHTML = 'x,y:'+_this.g.getOffsetPosition(e.x,e.y).map(Math.round)
            document.getElementById('ppp').innerHTML = 'layer:'+e.layerX+' '+e.layerY
            document.getElementById('pppp').innerHTML = 'original:'+e.originalX+' '+e.originalY
        })
        this.g.addEventListener('wheel',(e)=>{
            let delta = e.originalEvent.wheelDeltaY>0?0.1:-0.1
            let originscale = _this.g.attr().scale
            let pos = _this.g.attr().pos
            
            _this.g.attr({
                scale:[(1+delta)*originscale[0],(1+delta)*originscale[1]],
                pos:[e.x-(e.x-pos[0])*(1+delta),e.y-(e.y-pos[1])*(1+delta)]
            })
        })
        this.g.addEventListener('touchstart',(e)=>{
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
            e.originalEvent.stopPropagation()//阻止冒泡

            let pos = _this.g.attr().pos
          // 一根 手指 执行 目标元素移动 操作
          if (e.originalEvent.touches.length === 1 && _this.isTouch) {
            var touchMoveX = e.x,
              touchMoveY = e.y;

              
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
            document.getElementById('ppp').innerHTML = _this.g.attr().scale
            let now = e.originalEvent.touches;
            //得到缩放比例， getDistance 是勾股定理的一个方法
            let scale =
              _this.getDistance(now[0], now[1]) /
              _this.getDistance(_this.start[0], _this.start[1]);
            // 对缩放 比例 取整
            let a = scale.toFixed(2);
            let originscale = _this.g.attr().scale
            // 执行目标元素的缩放操作

            // let originpos = [(_this.start[0].pageX+_this.start[1].pageX)/2,(_this.start[0].pageY+_this.start[1].pageY)/2]
            let nowpos = [(now[0].pageX+now[1].pageX)/2,(now[0].pageY+now[1].pageY)/2]
            document.getElementById('pppp').innerHTML =nowpos
            _this.g.attr({
                scale:[a*originscale[0],a*originscale[1]],
                pos:[nowpos[0]-(nowpos[0]-pos[0])*a,nowpos[1]-(nowpos[1]-pos[1])*a]
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

        this.labelgroup.append(sp,svg,pat)
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
        this.g.append(this.labelgroup)
    },
    methods:{
        getDistance(p1, p2) {
        var x = p2.pageX - p1.pageX,
          y = p2.pageY - p1.pageY;
        return Math.sqrt(x * x + y * y);
      },
      change(){
          this.layer.remove(this.g)
      },
      hello(){
          console.log('hello')
          this.hello()
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