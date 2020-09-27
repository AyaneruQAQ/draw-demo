<template lang="html">
  <div class="temper">
    <p class="basis_title">
      <i class="basis_k JC"></i>体温单
      <select id="select_id" class="select_box" v-model="Mouth" @change='select_active'>
        <option v-for="(num) in Mouth_all" :value="num" :key="num">第{{num}}周</option>
      </select>
      <button class="button" @click="enlarge($event)" v-if=" Device == 'ipad' ">放大</button>
      <button class="button" @click="restore($event)" v-if=" Device == 'ipad' ">还原</button>
    </p>
    <div class="warp_scroll">
      <iframe :src="pdfurls" width="100%" height="99%" v-if=" Device == 'pc' "></iframe>
      <!-- <embed class="move" :src="pdfurls" :width=" width + '%' " :height=" height + '%' " type="application/pdf" v-else=" Device == 'ipad' "></embed> -->
      <img src="./assets/user.jpg"   :width=" width + '%' " class="move">
      <!--
      <div class="hint1" v-show="!OK">
        <div class="hint-t">
          <p class="hint-tn">
            <b>数据同步加载中，请耐心等待。</b>
          </p>
        </div>
      </div>
      -->
    </div>
  </div>
</template>

<script>
  export default {
    name: "temper",
    data() {
      return {
        pdfurls: "",
        pv_name: "TiWenDan",
        OK: false,
        //      当前选择周数
        Mouth: "1",
        //      一共的周数
        Mouth_all: "",
        //      pdf的宽度
        width: 100,
        //      pdf的高度
        height: 140,
        //      设备类型
        Device: sessionStorage.Device,
        //      记录放大次数
        count: 0,
        pageX: 0,
        pageY: 0,
        initX: 0,
        initY: 0,
        isTouch: false,
        start: []
      };
    },
    computed: {
      a() {
        return this.$store.state.Public_Data.Public_Patient;
      },
      Refresh() {
        return this.$store.state.Public_Data.Public_Refresh;
      },
      patient_ward() {
        return this.$store.state.allData.Patient_Ward;
      },
      Public_ward() {
        return this.$store.state.Public_Data.Public_Ward;
      }
    },
    created() {
      this.select_Mouth();
      this.add(this.Mouth);
    },
    mounted() {
      var _this = this;
      document.addEventListener(
        "touchstart",
        function (e) {
          console.log(e.target.nodeName);
          if (e.target.nodeName == "IMG") {

            //手指按下时的手指所在的X，Y坐标
            _this.pageX = e.targetTouches[0].pageX;
            _this.pageY = e.targetTouches[0].pageY;

            //初始位置的X，Y 坐标
            _this.initX = e.target.offsetLeft;
            _this.initY = e.target.offsetTop;

            //记录初始 一组数据 作为缩放使用
            if (e.touches.length >= 2) {
              //判断是否有两个点在屏幕上
              _this.start = e.touches; //得到第一组两个点
            }

            //表示手指已按下
            _this.isTouch = true;
          }
        },
        false
      );

      //监听 touchmove 事件 手指 移动 缩放 做的事情
      document.addEventListener(
        "touchmove",
        function (e) {
          e.preventDefault();
          // 一根 手指 执行 目标元素移动 操作
          if (e.touches.length == 1 && _this.isTouch && e.target.nodeName == "IMG") {
            //记录 移动目标的 X Y 坐标
            var touchMoveX = e.targetTouches[0].pageX,
              touchMoveY = e.targetTouches[0].pageY;
            //设置当前点击元素的 top left 定位值
            var left =
              parseInt(touchMoveX) - parseInt(_this.pageX) + parseInt(_this.initX);
            var top =
              parseInt(touchMoveY) - parseInt(_this.pageY) + parseInt(_this.initY);

            if ((left >= -400 && left <= 300) && (top >= -550 && top <= 400)) {
              e.target.style.left = left + "px";
              e.target.style.top = top + "px";
            }
          }

          // 2 根 手指执行 目标元素放大操作
          if (
            e.touches.length >= 2 &&
            _this.isTouch &&
            (e.scale <= 2.0 && e.scale >= 0.7) &&
            e.target.nodeName == "IMG"
          ) {
            //得到第二组两个点
            var now = e.touches;
            //得到缩放比例， getDistance 是勾股定理的一个方法
            var scale =
              _this.getDistance(now[0], now[1]) /
              _this.getDistance(_this.start[0], _this.start[1]);
            // 对缩放 比例 取整
            //e.target.innerHTML = scale;
            let a = scale.toFixed(2);
            // 执行目标元素的缩放操作
            e.target.style.transform = "scale(" + scale + ")";
          }
        },
        false
      );

      //监听 手指离开屏幕时
      document.addEventListener(
        "touchend",
        function (e) {
          //将 isTouch 修改为false  表示 手指已经离开屏幕
          if (_this.isTouch) {
            _this.isTouch = false;
          }
        },
        false
      );
    },
    methods: {
      //    数据刷新时间
      Refresh_date() {
        let myDate = new Date();
        let hour = myDate.getHours(); //获取系统时间
        hour < 10 ? (hour = "0" + hour) : (hour = hour);
        let minute = myDate.getMinutes(); //分
        minute < 10 ? (minute = "0" + minute) : (minute = minute);
        let second = myDate.getSeconds(); //秒
        second < 10 ? (second = "0" + second) : (second = second);
        let timer = hour + ":" + minute + ":" + second;
        this.$store.state.Public_Data.Public_Refresh_Time = timer;
      },
      add(val) {
        let _this = this;
        let a = this.a;
        a = a.split("_");
        let gfdsp = this.$store.state.Public_Data.Public_Url;
        this.$http
          .get(
            gfdsp +
            "GetPDF?pv=" +
            a[0] +
            "," +
            a[1] +
            "," +
            this.pv_name +
            "," +
            val
          )
          .then(function (response) {
            if (response.data.result == "true") {
              _this.pdfurls = response.data.value.URL_PDF;
              _this.Refresh_date();
              _this.OK = true;
            } else {
              _this.OK = true;
              alert("体温单PDF服务异常：" + response.data.value);
            }
          })
          .catch(error => {
            _this.OK = true;
            console.log(error);
          });
      },
      //    当前日期时间转换
      getNowFormatDate() {
        var date = new Date();
        var seperator1 = "-";
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
          month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
          strDate = "0" + strDate;
        }
        var currentdate = year + seperator1 + month + seperator1 + strDate;
        return currentdate;
        this.restore();
      },
      //    计算入院到现在的周数
      select_Mouth() {
        this.Mouth = 1;
        let now_date = this.getNowFormatDate();
        now_date = now_date.replace(/-/g, "/");
        now_date = new Date(now_date);
        //      当前时间戳
        now_date = now_date.getTime();
        let In_Hospital_Date = this.$store.state.Caching_data.Patient_Ward[
          this.Public_ward
        ].cache[this.a].ADMISSION_DATE_TIME;
        In_Hospital_Date = In_Hospital_Date.split("T");
        In_Hospital_Date = new Date(In_Hospital_Date[0]);
        //      入院时间戳
        In_Hospital_Date = In_Hospital_Date.getTime();
        let now_hospital = now_date - In_Hospital_Date;
        let date_all = Math.floor(now_hospital / 86400000);
        date_all = date_all / 7 + 1;
        this.Mouth_all = parseInt(date_all);
      },
      //    选取周数
      select_active(e) {
        this.Mouth = e.target.value;
      },
      //    pdf 放大
      enlarge($event) {
        this.count++;
        if (this.count <= 3) {
          this.width = this.width *= 1.1;
          this.height = this.height *= 1.1;
        }
      },
      //    pdf 还原
      restore($event) {
        this.width = 100;
        this.height = 133;
        this.count = 0;
      },
      //    pdf 手指放大缩放函数  勾股定理方法
      getDistance(p1, p2) {
        var x = p2.pageX - p1.pageX,
          y = p2.pageY - p1.pageY;
        return Math.sqrt(x * x + y * y);
      }
    },
    watch: {
      a() {
        this.OK = false;
        this.add(this.Mouth);
        this.select_Mouth();
        //  切换病人时将 pdf 放大还原
        this.restore();
      },
      Mouth(val) {
        this.OK = false;
        this.add(val);
        this.pdfurls = "";
        //   切换周时将 pdf 放大还原
        this.restore();
      },
      //    监听刷新按钮
      Refresh(val) {
        this.pdfurls = "";
        if (val == true) {
          this.OK = false;
          this.add(this.Mouth);
          this.$store.state.Public_Data.Public_Refresh = false;
        }
        //   点击刷新按钮时将 pdf 放大还原
        this.restore();
      }
    }
  };

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  /*周筛选*/

  .select_box {
    width: 60px;
    height: 30px;
    margin-left: 36px;
    line-height: 32px;
    padding-left: 10px;
  }

  .temper {
    height: 91.5%;
    width: 780px;
    font-size: 18px;
    margin-right: 4px;
    position: relative;
  }

  .warp_scroll {
    position: relative;
    height: 610px;
    overflow: hidden;
    -webkit-overflow-scrolling: touch;
  }

  /*标题栏*/

  .basis_title {
    width: 99.8%;
    height: 35px;
    background-color: #f2f2f2;
    line-height: 32px;
    box-shadow: 1px 0.5px 6px #2c3e50;
    margin-top: 4px;
  }

  .JC {
    background-color: #77d11e;
  }

  .basis_k {
    padding: 1px 4px;
    margin-right: 15px;
    font-size: 23px;
  }

  .basis_title div {
    float: left;
  }

  .divc-v table {
    height: 100%;
  }

  .hint1 {
    width: 100%;
    height: 100%;
    /* background: url("../../../../assets/u2661.jpg"); */
    border: 1px solid #ffffff;
    background-size: 100%;
    position: absolute;
    top: 39px;
    left: 0;
  }

  .hint-t {
    width: 400px;
    height: 300px;
    margin: 100px auto;
    /* background: url("../../../../assets/u1326.gif"); */
  }

  .hint-tn {
    text-align: center;
    font-size: 20px;
    height: 70px;
    line-height: 70px;
    color: #ffffff;
  }

  /* 放大缩小按钮 */

  .button {
    width: 80px;
    height: 30px;
    font-size: 13px;
    border: none;
    position: relative;
    top: -1px;
    left: 22%;
    margin-left: 5px;
    background-color: grey;
    color: #fff;
  }

  .move {
    touch-action: none;
    position: absolute;
  }

</style>
