/**
 * 获取选中的checkbox
 * @param {object} wrapper checkbox容器
 * @returns {Array} data 返回选中的checkbox
 */
function getCheckItems(wrapper) {
    var checkItems = [];
    var checkboxs = wrapper.querySelectorAll('[box-type="child"]');
    for(var item of checkboxs){
        if (item.checked) {
            checkItems.push(item);
        }
    }
    return checkItems;
}

/**
 * 通过选中的checkbox获取数据data
 * @returns {Array} data 返回符合条件的数据
 */
function getData(){
    var checkRegions = getCheckItems(regionWrapper);
    var checkProducts = getCheckItems(productWrapper);
    var data = [];
    var temp = [];
    for(var i = 0; i < sourceData.length; i++) {
        for(var r = 0; r < checkProducts.length; r++) {
            if (sourceData[i].product === checkProducts[r].value){
                temp.push(sourceData[i]);
            }
        }
    }
    for(var i = 0; i < temp.length; i++) {
        for(var r = 0; r < checkRegions.length; r++) {
            if (temp[i].region === checkRegions[r].value){
                data.push(temp[i]);
            }
        }
    }
    return data;
}

//绘制表格
function drawTable() {
    var data = getData();
    var tableWrapper = document.querySelector('#table-wrapper');
    tableWrapper.innerHTML = '';//清除上次绘制的表格
    var table = document.createElement('table');
    var tbody = document.createElement('tbody');
    var regionNum = getCheckItems(regionWrapper).length;
    var productNum = getCheckItems(productWrapper).length;
    var title = ['商品', '地区', '1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];
    if (regionNum === 1 && productNum > 1){//地区在前
        title[0] = '地区';
        title[1] = '商品';
        drawHeader(title,tableWrapper);
        drawBody('region')
    }else {//商品在前
        drawHeader(title,tableWrapper);
        drawBody('product');
    }

    /**
     * 绘制tbody
     * @param {string} first - 第一列
     */
    function drawBody(first) {
        for(var i in data){
            var tr = tbody.insertRow();
            for(var j in data[i]){
                if (j !== 'sale'){
                    tr.innerHTML = '';
                    if (first === 'region') {
                        var tdr = tr.insertCell();
                        tdr.innerHTML = data[i]['region'];
                        var tdp = tr.insertCell();
                        tdp.innerHTML = data[i]['product'];
                    } else {
                        var tdp = tr.insertCell();
                        tdp.innerHTML = data[i]['product'];
                        var tdr = tr.insertCell();
                        tdr.innerHTML = data[i]['region'];
                    }
                }else {
                    for(var k = 0; k < data[i][j].length; k++) {
                        var tds = tr.insertCell();
                        tds.innerHTML = data[i][j][k];
                    }
                }
            }
        }
        table.appendChild(tbody);
    }
    function drawHeader(title,wrapper) {
        var thead = document.createElement('thead');
        var thr = thead.insertRow();
        for(var i = 0; i < title.length; i++) {
            var     th = thr.insertCell();
            th.innerHTML = title[i];
        }
        table.appendChild(thead);
        wrapper.appendChild(table);
    }
}