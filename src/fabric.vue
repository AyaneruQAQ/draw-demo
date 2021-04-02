<template>
    <div>
        <button @click="clicks">remove</button>
        <button @click="add">add</button>
        <canvas id="c" ></canvas>

    </div>
</template>

<script>
import {fabric} from 'fabric-with-gestures'
export default {
    data(){
        return {
            zoomStartScale:'',
            pausePanning:false,
            canvas:null,
            lastX:0,
            lastY:0,
            group:null
        }
    },
    mounted(){
        this.canvas = new fabric.Canvas('c',{
            backgroundColor:"#0ff",
            width: '600',
            height: '600',
            selection:false,
            selectable:false
            })
        

        const circle = new fabric.Circle({
            radius: 100,
            fill: '#eef',
            originX: 'center',
            originY: 'center'
        });
        this.group = new fabric.Group([circle],{left:0,top:0    })
        let txt = new fabric.Text('hello world', {
            fontSize: 30,
            originX: 'center',
            originY: 'center',
            top:10,
            left:10
        })
        this.group.add(txt);
        const _this = this
        this.canvas.on({
            'touch:gesture': function (e) {
                if (e.e.touches && e.e.touches.length == 2) {
                    _this.pausePanning = true;
                    let point = new fabric.Point(e.self.x, e.self.y);
                    if (e.self.state == "start") {
                        _this.zoomStartScale = _this.canvas.getZoom();
                    }
                    let delta = _this.zoomStartScale * e.self.scale;
                    _this.canvas.zoomToPoint(point, delta);
                    _this.pausePanning = false;
                }
            },
            'touch:start':function(e){
                alert(e)
            },
            'touch:drag': function(e) {
                console.log(e)
                if (_this.pausePanning == false && undefined != e.e.layerX && undefined != e.e.layerY) {
                    let currentX = e.e.layerX;
                    let currentY = e.e.layerY;
                    let xChange = currentX - _this.lastX;
                    let yChange = currentY - _this.lastY;

                    if( (Math.abs(currentX - _this.lastX) <= 50) && (Math.abs(currentY - _this.lastY) <= 50)) {
                        let delta = new fabric.Point(xChange, yChange);
                        _this.canvas.relativePan(delta);
                    }

                    _this.lastX = e.e.layerX;
                    _this.lastY = e.e.layerY;
                }
            },
            'touch:orientation': function() {
                var text = document.createTextNode(' Orientation ');
                // info.insertBefore(text, info.firstChild);
            },
            'touch:shake': function() {
                var text = document.createTextNode(' Shaking ');
                // info.insertBefore(text, info.firstChild);
            },
            'touch:longpress': function() {
                var text = document.createTextNode(' Longpress ');
                // info.insertBefore(text, info.firstChild);
            }
        })

        this.canvas.add(this.group)
        
        this.canvas.renderAll()
    },
    methods:{
        clicks(){
            this.canvas.remove(this.group)
        },
        add(){
            this.canvas.add(this.group)
            console.log(a)

        }
    }
}

</script>