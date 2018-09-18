//创建一个餐厅对象
var restaurant = new Restaurant({
    cash : 10000,
    seats : 1,
    staff : []
});
restaurant.updateMenu();
var tomWaiter = new Waiter('001','服务员A',2500);
var tonyCook = new Cook('002','厨师A',2500);
restaurant.hire(tomWaiter);
restaurant.hire(tonyCook);


function createCustomerQueue() {
    var queue = [];
    for(var i = 0; i < 5; i++) {
        queue.push(new Customer('顾客' + i))
    }
    return queue;
}

var customerQueue = createCustomerQueue();
var customer = {};
function process() {
    customer = customerQueue.shift();
    var promise = customer.setdown();
    promise.then(tomWaiter.order)
        .then(customer.order)
        .then(tomWaiter.callCook)
        .then(tonyCook.cook)
        .then(customer.pay)
        .then(tomWaiter.pay)
        .then(process)
        .catch(function () {
            waiterStatus.innerHTML = '今天的顾客都服务完了，下班了';
            console.log('今天的顾客都服务完了，下班了')
        });
}

window.onload = function(){
    process();
};









