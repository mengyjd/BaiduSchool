function saveData() {
    var newTableData = replaceSourceData();
    localStorage.tableData = JSON.stringify(newTableData);

    //提取页面表格中的数据并返回一个数组
    function extractData() {
        var totalData = [];
        var aTr = document.querySelectorAll('table tr');
        for(var i = 1; i < aTr.length; i++) {
            var childData = [];
            var trData = aTr[i].childNodes;
            for(var j = 0,len = trData.length; j < len; j++) {
                if (j >= 2){
                    childData.push(trData[j].childNodes[0].innerHTML)
                } else {
                    childData.push(trData[j].innerText)
                }
            }
            totalData.push(childData);
        }
        return totalData;
    }
    
    //将提取出的数据(array)转换成对象数组
    function transformData() {
        var tableObjArray = [];
        var tableData = extractData();
        var firstType = judgeFirst();//获取第一列类型
        for(var i = 0; i < tableData.length; i++) {
            var dataObj = {};
            var sale = [];
            for(var j = 0; j < tableData[i].length; j++) {
                if (j >= 2) {
                    sale.push(tableData[i][j])
                } else {
                    if (firstType === 'product') {
                        dataObj['product'] = tableData[i][0];
                        dataObj['region'] = tableData[i][1];
                    } else {
                        dataObj['product'] = tableData[i][1];
                        dataObj['region'] = tableData[i][0];
                    }
                }
            }
            dataObj['sale'] = sale;
            tableObjArray.push(dataObj)
        }
        return tableObjArray;
    }

    //将对象数组替换到sourceData中
    function replaceSourceData() {
        var tableObjs = transformData();
        for(var i = 0; i < sourceData.length; i++) {
            if (tableObjs){//判断tableObjs是否为空
                for(var j = 0; j < tableObjs.length; j++) {
                    if (sourceData[i]['product'] === tableObjs[j]['product']
                        && sourceData[i]['region'] === tableObjs[j]['region']) {
                        sourceData[i]['sale'] = tableObjs[j]['sale'];
                    }
                }
            } 
        }
        return sourceData;
    }

}