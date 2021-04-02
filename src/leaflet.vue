<template>
    <div class="map" id="map"></div>
</template>
<script>
import L from 'leaflet'
import img from './assets/map.png'
export default {
    data(){
        return{
            map:null
        }
    },
    mounted(){
        let width = document.getElementById('map').clientWidth
        let height = document.getElementById('map').clientHeight
        this.map = L.map('map',{
            crs:L.CRS.Simple,
            maxZoom:15,
            minZoom:1,
            center:[width/2,height/2],
            renderer:L.svg()
        })
        
        var bounds = [[0,0], [width,height]];
        // L.imageOverlay(img,bounds).addTo(this.map)
        // debugger
        this.map.fitBounds(bounds)
        // L.circle([width/2, height/2], {radius: 10,color:"#ff0000"}).addTo(this.map);
        let x,y,color
        for(let i=0;i<20000;i++){
            x = Math.floor(Math.random() * width)
            y = Math.floor(Math.random() * height)
            color = this.rgb()
            L.circle([x,y],{radius:5,color}).on('click',function(e){console.log(e)}).addTo(this.map)
        }

        this.map.on('click',(e)=>{
            console.log(e)
        })

    },
    methods:{
        rgb(){//rgb颜色随机
			var r = Math.floor(Math.random()*256);
			var g = Math.floor(Math.random()*256);
			var b = Math.floor(Math.random()*256);
			var color = '#'+r.toString(16)+g.toString(16)+b.toString(16);
			return color
		}
    }
}
</script>
<style>
.map{
    width: 100%;
    height: 100%;
    /* background-color: aquamarine; */
}
</style>