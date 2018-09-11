var foodMenu = [];
foodMenu.push(new Food('干锅土豆片',4,15));
foodMenu.push(new Food('蒜蓉蒸金针菇',6,20));
foodMenu.push(new Food('白菜炖粉条',3,9));
foodMenu.push(new Food('秘制红烧鸡爪',10,25));

/**
 * 餐厅类
 * @param args json对象 {
 *      cash : Number
 *      seats : Number
 *      staff : Array
 *      }
 * @constructor 初始化餐厅信息
 */
function Restaurant(args) {
    var args = args || {};
    this.cash = args.cash || 1000000;
    this.seats = args.seats || 1;
    this.staff = args.staff || 10;
}
Restaurant.prototype = {
    hire : function (obj) {
        this.staff.push(obj);
    },
    fire : function (obj) {
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
    }
};


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
    completeWork : function () {
        console.log('完成一次工作');
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
    console.log('服务员完成上菜:' + food.name);

};
Waiter.prototype.getOrder = function (customer) {
    console.log(this.name + ': 你好,要吃什么?')
    var food = customer.order();
    console.log(this.name + ': 好的,你要的' + food.price + '元的' + food.name + '已下单到厨房');
    return food;
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
Cook.prototype.cook = function (food) {
    console.log(this.name + ': 菜品:' + food.name + '已完成');
    // setTimeout(function () {
    //     console.log('厨师完成菜品:' + food);
    //     new Waiter().completeWork(food);
    // },2000);

};

function Customer(name) {
    this.name = name;
}
Customer.prototype.order = function () {
    var food = foodMenu[createRandom(0,foodMenu.length-1)];
    console.log(this.name + ':我要吃 ' + food.name);
    return food;
};
Customer.prototype.eat = function (food) {
    console.log(this.name + ' 吃完了 ' + food.name + ' 离开餐厅')
    console.log('---------------------------------------')
};
Customer.prototype.setdown = function () {
    console.log(this.name + ' 已入座');
};

//菜品类
function Food(name, cost, price) {
    this.name = name;
    this.cost = cost;
    this.price = price;
}

function createRandom(min, max) {
    var random = Math.random() * (max - min) + min;
    return Math.round(random);
}


function createCustomerList() {
    var customerList = [];
    for(var i = 0; i < 3; i++) {
        customerList.push(new Customer('顾客' + i))
    }
    return customerList;
}
var customerList = createCustomerList();
while (customerList.length > 0){
    var customer = customerList.shift();
    var waiter = new Waiter('001','服务员A');
    var cook = new Cook('002','厨师A');

    customer.setdown();
    var food = waiter.getOrder(customer);
    cook.cook(food);
    waiter.takeFood(food);
    customer.eat(food)
}







