var canvasLine = document.querySelector('#line');
var canvasBar = document.querySelector('#bar');

drawChart = {
    //绘制一条折线
    line: function (data) {
        var ctx = canvasLine.getContext('2d');
        ctx.clearRect(0, 0, 300, 250);//清除画布

        //绘制x y 轴
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(0, 250);
        ctx.lineTo(300, 250);
        ctx.strokeStyle = '#1b2529';
        ctx.stroke();

        var len = data.length;
        var inteval = 300 / len - 2;//x轴每个点之间的距离
        var x = 0;

        for (var i = 0; i < len; i++) {
            if (i === 0) {
                ctx.moveTo(0, 250);
            }
            ctx.lineTo(x += inteval, 250 - parseInt(data[i]) / 3);
        }
        ctx.strokeStyle = '#55ff00';
        ctx.stroke();
    },
    //绘制多条折线
    lines: function () {
        var linesData = getCheckedData();
        var ctx = canvasLine.getContext('2d');
        ctx.clearRect(0, 0, 300, 250);//清除画布
        //绘制x y 轴
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(0, 250);
        ctx.lineTo(300, 250);
        ctx.strokeStyle = '#1b2529';
        ctx.stroke();

        for (var i = 0; i < linesData.length; i++) {
            var inteval = 300 / linesData[i]['sale'].length - 13;//x轴每个点之间的距离
            var x = 0;
            ctx.beginPath();
            var rgb = 'rgb(' + Math.floor(Math.random()*255) +',' +
                Math.floor(Math.random()*255) + ',' +
                Math.floor(Math.random()*255) + ')';
            for (var j = 0,len = linesData[i]['sale'].length; j < len; j++) {
                if (j === 0) {
                    ctx.moveTo(0, 250);
                }
                ctx.arc(x += inteval, 250-parseInt(linesData[i]['sale'][j])/3,
                    3,0,Math.PI*2);
                ctx.lineTo(x += inteval, 250-parseInt(linesData[i]['sale'][j])/3);
                ctx.strokeStyle = rgb;
            }
            ctx.fillStyle=rgb;
            ctx.strokeStyle = rgb;
            ctx.stroke();
        }
    },
    //绘制一个柱状
    bar: function (data) {
        var ctx = canvasBar.getContext('2d');
        ctx.clearRect(0, 0, 300, 250);//清除画布

        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(0, 250);
        ctx.lineTo(300, 250);
        ctx.strokeStyle = '#1b2529';
        ctx.stroke();

        var inteval = 0;
        for (var i in data) {
            if (i === 0) {
                ctx.moveTo(0, 250);
            }
            ctx.fillRect(inteval += 20, 250 - parseInt(data[i]) / 3, 15, parseInt(data[i]) / 3);
        }
    },
    //绘制多个柱状
    bars: function () {
        var checkedData = getCheckedData();//

        var ctx = canvasBar.getContext('2d');
        ctx.clearRect(0, 0, 900, 250);//清除画布

        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(0, 250);
        ctx.lineTo(900, 250);
        ctx.strokeStyle = '#1b2529';
        ctx.stroke();

        var inteval = 0;
        var colors = ['#bcdedd','#ddbd8a','#e6a5bd','#f8aeaf','#e6bebe','#ffe6d7','#f8f8d6'];

        for (var i in checkedData) {
            ctx.beginPath();
            ctx.fillStyle=colors[i];
            inteval = i * 10 + 10;
            if (i === 0) {
                ctx.moveTo(0, 250);
            }else {
                ctx.moveTo(inteval, 250);
            }

            for(var j = 0; j < checkedData[i]['sale'].length; j++) {
                ctx.fillRect(inteval,
                    250 - parseInt(checkedData[i]['sale'][j]) / 3,
                    10,
                    parseInt(checkedData[i]['sale'][j]) / 3);

                inteval += checkedData.length * 10 + 15;
            }
        }
    }
};

//当鼠标在table上滑动时获取12个月的数据
function getChartData(target) {
    var data = [];
    var chartData = [];
    if (target.tagName.toLowerCase() === 'td') {
        data = target.parentNode.childNodes;
        for (var i = 2; i < data.length; i++) {
            chartData.push(data[i].innerHTML);
        }
    }
    return chartData;
}
