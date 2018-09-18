//顾客类
function Customer(name) {
    this.name = name;
}
//顾客点菜方法
Customer.prototype.order = function () {
    return new Promise(function (resolve, reject) {
        customerStatus.innerHTML = '点菜中... 剩余3' + '秒';
        var time = 2;
        var t2 = setInterval(function () {
            customerStatus.innerHTML = '点菜中... 剩余' + time + '秒';
            time--;
            if (time < 0){
                clearInterval(t2)
            }
        }, 1000)
        var foods = [];
        var foodName = [];
        var foodNum = createRandom(1,5);
        for(var i = 0; i < foodNum; i++) {
            var random = createRandom(0,restaurant.menu.length - 1);
            if (foods.indexOf(restaurant.menu[random]) === -1){
                foods.push(restaurant.menu[random]);
            }
        }
        for(var j = 0; j < foods.length; j++) {
            foodName.push(foods[j].name);
            foods[j].statue = '还未上';
        }
        setTimeout(function () {
            customerStatus.innerHTML = '';
            for(var num in foods){
                var foodInfo = foods[num].name + ': ' + '<span id="customer-' +
                    foods[num].name + '">' + foods[num].statue + '</span>' ;
                customerStatus.innerHTML += foodInfo + '<br>';
            }
            resolve(foods);
        },3000)
    })
};

Customer.prototype.eat = function (food) {
    var that = this;
    return new Promise(function (resolve, reject) {
        var span = document.querySelector('#customer-' + food.name);
        var time = 4;
        span.innerHTML = '剩余5秒';
        var t3 = setInterval(function () {
            span.innerHTML = '剩余' + time + '秒';
            time--;
            if (time < 0) {
                clearInterval(t3);
                span.innerHTML = '已吃完';
            }
        },1000);
    })
};
Customer.prototype.setdown = function () {
    var that = this;
    return new Promise(function (resolve, reject) {
        customerStatus.innerHTML = that.name + '已入坐';
        setTimeout(resolve,1000,that)
    })
};
Customer.prototype.pay = function (foods) {
    console.log('执行CustomerPay')
    return new Promise(function (resolve, reject) {
        customerStatus.innerHTML = '结账';
        setTimeout(function () {
            console.log('执行CustomerPay setInterval')
            resolve(foods);
            customerStatus.innerHTML = '';
        }, 1000)
    })
}

