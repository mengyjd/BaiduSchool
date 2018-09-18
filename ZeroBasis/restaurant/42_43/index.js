/**
 * 餐厅类
 * @param json
 *      cash : Number
 *      seats : Number
 *      staff : Array
 * @constructor 初始化餐厅信息
 */
function Restaurant(json) {
    this.cash = json.cash;
    this.seats = json.seats;
    this.staff = json.staff;
}

//雇佣员工
Restaurant.prototype.hire = function (obj) {
    this.staff.push(obj);
};

//开除员工
Restaurant.prototype.fire = function (obj) {
    //别人写的,没看懂
    this.staff = this.staff.find(function (arr) {
        return arr !== obj;
    });
    if (this.staff === undefined) this.staff = [];

    //自己写的
    // for (var i in this.staff) {
    //     if (this.staff[i] === obj) {
    //         this.staff.splice(i, 1);
    //     }
    // }
};

/**
 * 员工类
 * @param id {string} 工号
 * @param name {string} 名字
 * @param salary {Number} 薪水
 * @constructor
 */
function Staff(id, name, salary) {
    this.id = id;
    this.name = name;
    this.salary = salary;
}

Staff.prototype.completeWork = function () {
    console.log('完成一次工作');
};

function Waiter(id, name, salary) {
    Staff.call(this, id, name, salary);
}

Waiter.prototype = Object.create(Staff.prototype);
Waiter.prototype.constructor = Waiter;

Waiter.prototype.completeWork = function (a) {
    if (a instanceof Array) {
        console.log('完成一次点菜')
    } else {
        console.log('上菜')
    }
}

function Cook(id, name, salary) {
    Staff.call(this, id, name, salary);
}

Cook.prototype = Object.create(Staff.prototype);
Cook.prototype.constructor = Cook;

Cook.prototype.completeWork = function () {
    console.log('完成一道菜品')
}

function Customer() {
}

Customer.prototype.order = function () {
    console.log('点菜')
}

Customer.prototype.eat = function () {
    console.log('吃')
}

function Food(name, cost, price) {
    this.name = name;
    this.cost = cost;
    this.price = price;
}

var ifeRestaurant = new Restaurant({
    cash: 1000000,
    seats: 20,
    staff: []
});

var newCook = new Cook("0001","Tony", 10000);
ifeRestaurant.hire(newCook);
console.log(ifeRestaurant.staff);

ifeRestaurant.fire(newCook);
console.log(ifeRestaurant.staff);



