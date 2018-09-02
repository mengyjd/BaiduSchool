//checkbox容器
var regionWrapper = document.querySelector('#region-radio-wrapper');
var productWrapper = document.querySelector('#product-radio-wrapper');
var radioWrapper = document.querySelector('#radio-wrapper');

//checkbox子选项
var regionSelect = {
    0: '华南',
    1: '华北',
    2: '华东',
};
var projectSelect = {
    0: '手机',
    1: '笔记本',
    2: '智能音箱'
};

//创建checkbox选项
createCheckbox(regionWrapper,regionSelect);
createCheckbox(productWrapper,projectSelect);

/**
 * 创建checkbox选项
 * @param {object} wrapper - 容器
 * @param {object} select - 各个子选项组成的对象
 */
function createCheckbox(wrapper, selectObj) {
    //全选checkbox
    var checkAll = document.createElement('input');
    checkAll.type = 'checkbox';
    checkAll.value = 'checkAll';
    checkAll.setAttribute('box-type','all');
    checkAll.checked = true;
    wrapper.appendChild(checkAll);
    var lableAll = document.createElement('lable');
    lableAll.innerText = '全选';
    wrapper.appendChild(lableAll);

    //子选项checkbox
    var checkboxs = [];
    for (var index in selectObj) {
        var checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.setAttribute('box-type','child');
        checkbox.value = selectObj[index];
        checkbox.checked = true;
        checkboxs.push(checkbox);
        wrapper.appendChild(checkbox);
        var childLable = document.createElement('lable');
        childLable.innerText = selectObj[index];
        wrapper.appendChild(childLable);
    }

    //为wrapper内的checkbox添加点击事件
    wrapper.onclick = function (e) {
        e = e || window.event;
        var childCheckeds = [];//选中的子选项
        var target = e.target || e.srcElement;
        var boxType = target.getAttribute('box-type');
        if (boxType === 'all'){//点击全选
            for(var i = 0; i < checkboxs.length; i++) {
                checkboxs[i].checked = true;
            }
        }else {//点击子选项将选中的checkbox push到childCheckeds中
            for(var j = 0; j < checkboxs.length; j++) {
                if (checkboxs[j].checked){
                    childCheckeds.push(checkboxs[j]);
                } 
            }
            var checkedChildNum = childCheckeds.length;//选中的子选项个数
            var checkedCompleteNum = checkboxs.length;//全部子选项个数
            if (checkedChildNum === checkedCompleteNum){
                checkAll.checked = true;
            }else if (checkedChildNum < checkedCompleteNum){
                checkAll.checked = false;
            }
            if (checkedChildNum === 0) {//不允许取消最后一个选项
                target.checked = true;
            }
            // setHash(regionCheckbox, 'region');
            // setHash(productCheckbox, 'product');
            addHistoryState(regionCheckbox,'region');
            addHistoryState(productCheckbox,'product');
            history.pushState({},null,location.href.split('?')[0] + '?' + JSON.stringify(checkCondition));
        }
    }
}


var checkCondition = {};
var regionCheckbox = document.querySelectorAll('#region-radio-wrapper input');
var productCheckbox = document.querySelectorAll('#product-radio-wrapper input');



/****************           history.State版本            ***************/
/**
 * 点击checkbox时push一条history.State
 * @param checkboxs {object} checkbox对象数组
 * @param type {string} checkbox类型,可选 region,product
 */
function addHistoryState(checkboxs,type) {
    var checkArray = [];
    for(var i = 1; i < checkboxs.length; i++) {
        if (checkboxs[i].checked){
            checkArray.push(checkboxs[i].value);
        }
    }
    checkCondition[type] = checkArray;
}

window.addEventListener('popstate',function () {
    changeCheckbox(regionCheckbox,'region');
    changeCheckbox(productCheckbox,'product');
    drawTable();
});

//解析URL参数返回选择的条件
function analysisUrl() {
    if (!location.href.split('?')[1]) return;
    var condition = location.href.split('?')[1];
    condition = condition.replace(/%22/g,'\"');
    condition = decodeURI(condition);
    condition = JSON.parse(condition);
    return condition;
}

/**
 * 根据url改变checkbox的状态
 * @param checkboxs {object} checkbox对象数组
 * @param type {string} checkbox类型,可选 region,product
 */
function changeCheckbox(checkboxs,type) {
    var condition = analysisUrl();
    for(var i = 1; i < checkboxs.length; i++) {
        for(var j = 0; j < condition[type].length; j++) {
            console.log(checkboxs[i].value, condition[type][j]);
            if (checkboxs[i].value === condition[type][j]){
                checkboxs[i].checked = true;
                break;
            } else {
                checkboxs[i].checked = false;
            }
        }
    }
}


/****************           location.hash版本            ***************/
/**
 * 根据checkbox状态设置location.hash的值
 * @param {object} wrapper checkbox对象数组
 * @param {string} type checkbox容器类型 region product
 */
// function setHash(wrapper, type) {
//     var condition = [];
//     for(var i = 1; i < wrapper.length; i++) {
//         if (wrapper[i].checked) {
//             condition.push(wrapper[i].value);
//         }
//     }
//     if (type === 'region'){
//         checkCondition.region = condition;
//     } else if(type === 'product') {
//         checkCondition.product = condition;
//     }
//     location.hash = JSON.stringify(checkCondition);
// }

//changeCheckboxState();

//根据location.hash改变checkbox选中状态
// function changeCheckboxState() {
//     if (!location.hash) return;
//     var parameter = location.hash.replace('#','');
//     parameter = decodeURI(parameter);
//     var checkItems = JSON.parse(parameter);
//     var regions = checkItems.region;
//     var products = checkItems.product;
//
//     for(var i = 1; i < regionCheckbox.length; i++) {
//         for(var j = 0; j < regions.length; j++) {
//             if (regionCheckbox[i].value === regions[j]){
//                 regionCheckbox[i].checked = true;
//                 break;
//             } else {
//                 regionCheckbox[i].checked = false;
//             }
//         }
//     }
//
//     for(var m = 1; m < productCheckbox.length; m++) {
//         for(var n = 0; n < products.length; n++) {
//             if (productCheckbox[m].value === products[n]){
//                 productCheckbox[m].checked = true;
//                 break;
//             } else {
//                 productCheckbox[m].checked = false;
//             }
//         }
//     }
// }


