//创建一个随机数
function createRandom(min, max) {
    var random = Math.random() * (max - min) + min;
    return Math.round(random);
}

var customerStatus = document.querySelector('#customerStatus');
var waiterStatus = document.querySelector('#waiterStatus');
var cookStatus = document.querySelector('#cookStatus');
var waiterImg = document.querySelector('#waiter');
var cookImg = document.querySelector('#cook');
var customerImg = document.querySelector('#customer');
var restaurantCash = document.querySelector('#restaurantCash');

cookStatus.innerHTML = '空闲中';
waiterStatus.innerHTML = '空闲中';
customerStatus.innerHTML = '等待中';

//服务员移动到厨师旁边
function moveToCook(foods) {
    return new Promise(function (resolve, reject) {
        waiterStatus.innerHTML = '';
        waiterImg.style.transition = '0.5s';
        resolve()
    }).then(function () {
        return new Promise(function (resolve, reject) {
            waiterImg.style.top = 50 + 'px';
            setTimeout(resolve, 500);
        })
    }).then(function () {
        return new Promise(function (resolve, reject) {
            waiterImg.style.transition = '1s';
            resolve();
        })
    }).then(function () {
        return new Promise(function (resolve, reject) {
            waiterImg.style.left = 170 + 'px';
            setTimeout(resolve, 1000, foods)
        })
    })
}

//服务员移动到顾客旁边
function moveToCustomer() {
    return new Promise(function (resolve, reject) {
        waiterStatus.innerHTML = '';
        waiterImg.style.transition = '0.5s';
        resolve()
    }).then(function () {
        return new Promise(function (resolve, reject) {
            waiterImg.style.top = 300 + 'px';
            setTimeout(resolve, 500);
        })
    }).then(function () {
        return new Promise(function (resolve, reject) {
            waiterImg.style.transition = '1s';
            resolve()
        })
    }).then(function () {
        return new Promise(function (resolve, reject) {
            waiterImg.style.left = 1000 + 'px';
            resolve();
        })
    })
}