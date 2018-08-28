var tableWrapper = document.querySelector('#table-wrapper');

/**
 * 获取选中的checkbox
 * @param {object} wrapper checkbox容器
 * @returns {Array} data 返回选中的checkbox
 */
function getCheckItems(wrapper) {
    var checkItems = [];
    var checkboxs = wrapper.querySelectorAll('[box-type="child"]');
    for (var item of checkboxs) {
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
function getCheckedData() {
    var checkRegions = getCheckItems(regionWrapper);
    var checkProducts = getCheckItems(productWrapper);
    var data = [];
    if (localStorage.tableData) {
        data = filter(JSON.parse(localStorage.tableData));
        console.log('从localStorage读取数据')
    } else {
        data = filter(sourceData);
        console.log('从sourceData读取数据')
    }

    //根据选择的checkbox过滤数据
    function filter(data) {
        var temp = [];
        var tableData = [];
        for (var i = 0; i < data.length; i++) {
            for (var r = 0; r < checkProducts.length; r++) {
                if (data[i].product === checkProducts[r].value) {
                    temp.push(data[i]);
                }
            }
        }
        for (var i = 0; i < temp.length; i++) {
            for (var r = 0; r < checkRegions.length; r++) {
                if (temp[i].region === checkRegions[r].value) {
                    tableData.push(temp[i]);
                }
            }
        }
        return tableData;
    }
    return data;
}

function judgeFirst() {
    var regionNum = getCheckItems(regionWrapper).length;
    var productNum = getCheckItems(productWrapper).length;
    if (regionNum === 1 && productNum > 1) {//地区在前
        return 'region'
    } else {//商品在前
        return 'product'
    }
}

//绘制表格
function drawTable() {
    var data = getCheckedData();
    tableWrapper.innerHTML = '';//清除上次绘制的表格
    var table = document.createElement('table');
    var tbody = document.createElement('tbody');
    var first = judgeFirst();
    var title = ['商品', '地区', '1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];
    if (first === 'region') {
        title[0] = '地区';
        title[1] = '商品';
        drawHeader(title, tableWrapper);
        drawBody('region')
    } else {
        drawHeader(title, tableWrapper);
        drawBody('product');
    }

    /**
     * 绘制tbody
     * @param {string} first - 第一列
     */
    function drawBody(first) {
        for (var i in data) {
            var tr = tbody.insertRow();
            for (var j in data[i]) {
                if (j !== 'sale') {
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
                } else {
                    for (var k = 0; k < data[i][j].length; k++) {
                        var tds = tr.insertCell();
                        var editBtn = document.createElement('button');
                        var num = document.createElement('span');

                        num.className = 'num';
                        editBtn.className = 'editBtn';

                        tds.appendChild(num);
                        num.innerHTML = data[i][j][k];
                        tds.appendChild(editBtn);
                    }
                }
            }
        }
        table.appendChild(tbody);
    }

    //绘制表头
    function drawHeader(title, wrapper) {
        var thead = document.createElement('thead');
        var thr = thead.insertRow();
        for (var i = 0; i < title.length; i++) {
            var th = thr.insertCell();
            th.innerHTML = title[i];
        }
        table.appendChild(thead);
        wrapper.appendChild(table);
    }
}