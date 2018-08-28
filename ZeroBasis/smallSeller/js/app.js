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
};
var saveDataBtn = document.querySelector('#saveData');
saveDataBtn.onclick = function () {
    saveData();
};

var clearLocalStorage = document.querySelector('#clearLocalStorage');
clearLocalStorage.onclick = function () {
    localStorage.tableData = '';
    console.log('localStroage已清空');
};

