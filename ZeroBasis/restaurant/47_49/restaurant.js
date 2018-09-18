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
    this.cash = args.cash || 10000;
    this.seats = args.seats || 1;
    this.staff = args.staff || [];
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
    },
    updateMenu  :　function () {
        this.menu = createFoodMenu();
    }
};
