// [120, 100, 140, 160, 180, 185, 190, 210, 230, 245, 255, 270]
var data = [120, 100, 140, 160, 180, 185, 190, 210, 230, 245, 255, 270];
drawLine(data);
function drawLine(data) {
    var canvas = document.querySelector('#line');
    var ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, 300);
    ctx.lineTo(300, 300);
    ctx.stroke();

    var len = data.length;
    var inteval = 300 / len - 3;//每个点之间的距离
    var x = 0;

    for (var i = 0; i < len; i++) {
        if (i === 0) {
            ctx.moveTo(0, 300);
        }
        ctx.lineTo(x += inteval, data[i]);
    }
    ctx.strokeStyle = '#55ff00';
    ctx.stroke();
}