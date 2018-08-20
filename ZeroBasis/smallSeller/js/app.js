document.body.onload = function(){
    drawTable();
};

radioWrapper.onchange = function(){
    drawTable();
    drawChart.lines();
    drawChart.bars();
};
tableWrapper.onmouseover = function (e) {
    e = e || window.event;
    var target = e.target || e.srcElement;
    var data = getChartData(target);
    //drawChart.line(data);
    //drawChart.bar(data);
}