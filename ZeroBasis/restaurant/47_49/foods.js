//菜品类
function Food(name, cost, price, time) {
    this.name = name;
    this.cost = cost;
    this.price = price;
    this.time = time;
}

function createFoodMenu() {
    var foodMenu = [];
    foodMenu.push(new Food('干锅土豆片',4,15,13));
    foodMenu.push(new Food('蒜蓉蒸金针菇',6,20,12));
    foodMenu.push(new Food('白菜炖粉条',3,9,11));
    foodMenu.push(new Food('秘制红烧鸡爪',10,25,10));
    foodMenu.push(new Food('椒麻鸡',30,65,15));
    foodMenu.push(new Food('大盘鸡',30,65,8));
    foodMenu.push(new Food('红烧豆腐',5,12,7));
    foodMenu.push(new Food('烤鱼',15,30,6));
    foodMenu.push(new Food('凉拌牛肉',24,28,6));
    foodMenu.push(new Food('虎皮辣子',8,18,7));
    foodMenu.push(new Food('紫菜汤',3,10,5));
    return foodMenu;
}