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
        }
    }
}
