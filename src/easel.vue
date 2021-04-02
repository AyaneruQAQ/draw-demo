<template>
    <canvas id="can" style="height:300px;width:600px"></canvas>
</template>
<script>
import * as createjs from '@createjs/easeljs'

export default {
    data(){
        return{
            canvas:null,
            stage:null,
            container:null
        }
    },
    mounted(){
        const _this = this
        this.canvas = document.getElementById('can')
        this.stage = new createjs.Stage(this.canvas)
        this.stage.enableMouseOver()
        createjs.Touch.enable(this.stage)

        this.container = new createjs.Container()
        this.container.addEventListener('pressmove',function(event){
            console.log(event);// 可以打印出来查看x，y信息
            console.log(event.currentTarget);// 可以打印出来查看x，y信息
            console.log(event.currentTarget.x+';'+event.stageX);
            event.currentTarget.x = event.stageX;
            event.currentTarget.y = event.stageY;
            _this.stage.update();
        });

        this.stage.addEventListener('touchmove',(e)=>{
            alert(e)
        })

        let circle = new createjs.Shape()
        circle.graphics.beginFill("DeepSkyBlue").drawCircle(0, 0, 50);
        // circle.x = 100;
        // circle.y = 100;
        let circle1 = new createjs.Shape()
        circle1.graphics.beginFill("red").drawCircle(0, 0, 30);
        // circle1.x = 50;
        // circle1.y = 50;

        this.container.addChild(circle1,circle)
        this.stage.addChild(this.container);
        this.stage.update()
    }
}
</script>