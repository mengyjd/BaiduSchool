var tempParent = '';//input失去焦点时的parent
document.addEventListener('click', function (e) {
    var e = e || window.event;
    var target = e.target || e.srcElement;
    var initialNum = 0;
    var parent = target.parentElement;

    switch (target.className) {
        case 'num':
            exitEdit(tempParent);//先退出编辑模式
            //隐藏编辑图标
            var chils = target.parentElement.childNodes;
            for(var i = 0; i < chils.length; i++) {
                if (chils[i].className === 'editBtn') {
                    chils[i].style.display = 'none';
                }
            }
            createEdit();
            break;
        case 'editBtn':
            exitEdit(tempParent);//先退出编辑模式
            target.style.display = 'none';//隐藏编辑图标
            createEdit();
            break;
        case '':
            exitEdit(tempParent);//先退出编辑模式
            break;
    }
    
    //进入编辑模式
    function createEdit() {
        initialNum = parent.childNodes[0].innerHTML;
        var input = document.createElement('input');
        var cancelBtn = document.createElement('button');
        var confirmBtn = document.createElement('button');
        input.value = initialNum;
        input.className = 'userInput';
        cancelBtn.className = 'cancelBtn';
        confirmBtn.className = 'confirmBtn';
        cancelBtn.innerHTML = '取消';
        confirmBtn.innerHTML = '确定';

        cancelBtn.onclick = function(){
            parent.childNodes[0].innerHTML = initialNum;
            exitEdit(parent);
        };
        confirmBtn.onclick = function(){
            if (Number(input.value)){
                parent.childNodes[0].innerHTML = input.value;
                exitEdit(parent);
            } else {
                alert('请输入合法数字');
                input.focus();
            }

        };
        input.onblur = function(){
            tempParent = parent;
        };

        input.onkeyup = function(e){
            if (/enter/i.test(e.key)){
                if (Number(input.value)){
                    parent.childNodes[0].innerHTML = input.value;
                    exitEdit(parent);
                } else {
                    alert('请输入合法数字');
                    input.focus();
                }
            } else if (/escape/i.test(e.key)){
                parent.childNodes[0].innerHTML = input.value;
                exitEdit(parent);
            }
        };

        parent.appendChild(input);
        parent.appendChild(cancelBtn);
        parent.appendChild(confirmBtn);
        input.focus();
    }

    function exitEdit(parent) {
        if (parent) {
            var child = parent.childNodes;
            for (var i = child.length - 1; i >= 0; i--) {
                switch (child[i].className) {
                    case 'userInput':
                    case 'cancelBtn':
                    case 'confirmBtn':
                        parent.removeChild(child[i]);
                        break;
                }
            }
        }
    }
});




