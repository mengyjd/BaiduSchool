/**
 * 员工类
 * @param args json对象{
 *      id : string,
 *      name : string,
 *      salary : number
 *      }
 * @constructor
 */
function Staff(id, name, salary) {
    this.id = id;
    this.name = name;
    this.salary = salary;
}

Staff.prototype = {
    completeWork: function () {
    }
};


//服务员类
function Waiter(id, name, salary) {
    Staff.call(this, id, name, salary);
    var instance = null;
    instance = this;
    Waiter = function () {
        return instance;
    }
}

//继承员工类 staff
Waiter.prototype = Object.create(Staff.prototype);
Waiter.prototype.constructor = Waiter;
Waiter.prototype.takeFood = function (food) {
    return new Promise(function (resolve, reject) {
        resolve(food)
    })
};
Waiter.prototype.order = function () {
    return new Promise(function (resolve, reject) {
        waiterStatus.innerHTML = '服务员: 你好,要吃什么?';
        setTimeout(function () {
            waiterStatus.innerHTML = '';
            resolve();
        }, 1000)
    })
};
Waiter.prototype.callCook = function (foods) {
    return new Promise(function (resolve, reject) {
        waiterStatus.innerHTML = '你点的菜已下单到厨房,请稍候...';
        setTimeout(function () {
            moveToCook();
        }, 1500);
        setTimeout(resolve, 2000, foods)
    })
}

Waiter.prototype.pay = function (foods) {
    console.log('执行WaiterPay')
    return new Promise(function (resolve, reject) {
        console.log('执行WaiterPay setInterval')
        var total = 0;
        for (var i = 0; i < foods.length; i++) {
            total += foods[i].price;
        }
        waiterStatus.innerHTML = '一共' + total + '元';
        restaurant.cash += total;//更新餐厅的金额
        restaurantCash.innerHTML = restaurant.cash;
        setTimeout(resolve, 2000)
    })
}

//厨师类
function Cook(id, name, salary) {
    Staff.call(this, id, name, salary);
    var instance = null;
    instance = this;
    Cook = function () {
        return instance;
    }
}

Cook.prototype = Object.create(Staff.prototype);
Cook.prototype.constructor = Cook;
//厨师烹饪方法
Cook.prototype.cook = function (foods) {
    return new Promise(function (resolve, reject) {
        var k = 0;//指向正在烹饪的菜品下标
        var compeleteFood = [];
        cookFood()

        function cookFood() {
            if (k < foods.length) {
                var time = foods[k].time;

                if (k === 0) {
                    cookStatus.innerHTML = '';
                    for(var num in foods){
                        var foodInfo = foods[num].name + ': ' + '<span id="cook-' +
                            foods[num].name + '">' + '还未做' + '</span>' ;
                        cookStatus.innerHTML += foodInfo + '<br>';
                    }
                }
                var foodSpan = document.querySelector('#cook-' + foods[k].name);
                //定时器
                var t1 = setInterval(function () {
                    foodSpan.innerHTML = '还剩' + time + '秒';
                    time--;
                    //time<0 表示一道菜烹饪完成
                    if (time < 0) {
                        foodSpan.innerHTML = '已完成';
                        // foods[k].statue = ''
                        // console.log(foods)
                        compeleteFood.push(foods[k]);
                        if (compeleteFood.shift()) {
                            var food = compeleteFood.shift();
                            moveToCustomer();
                            setTimeout(function () {
                                waiterStatus.innerHTML = '上菜中...';
                            }, 1500);
                            if (k !== foods.length - 1) {
                                setTimeout(function () {
                                    moveToCook();
                                }, 3000)
                            }
                        }
                        setTimeout(function () {
                            customer.eat(foods[k]);
                            k++;
                            cookFood();//递归调用烹饪下一道菜
                        }, 2000);
                        clearInterval(t1);
                    }
                }, 1000);

            } else {//所有采都做完了
                moveToCustomer();
                cookStatus.innerHTML = '空闲中';
                setTimeout(resolve, 6000, foods)
            }
        }

    })
};
