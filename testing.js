const Restaurant = require('./classes/restaurant.js');
const Menu = require('./classes/menu.js');
const Item = require('./classes/item.js');
const util = require('util');

Item.init();
Menu.init();
Restaurant.init();

const kfc = new Restaurant('kfc');
const chickenFood = new Menu('chicken food');
chickenFood.addItem(new Item('Chicken Drumstick', 2.55))
kfc.addMenu(chickenFood)
const mcD = new Restaurant('McDonalds');
const nandos = new Restaurant('Nandos');
const fiveGuys = new Restaurant('Five Guys');
const pizzaExpress = new Restaurant('Pizza Express');

const food = new Menu('Food');

const pie = new Item('pie', 5.00);
const pier = new Item('pier', 5.00);
pier.changePrice(7.00);
const meatballs = new Item('meatballs', 5.00);
const cheese = new Item('cheese', 0.50);
const cheeser = new Item('cheeser', 0.50);

food.addItem(pie)
food.addItem(cheese)
food.addItem(meatballs)
food.removeItem(cheese);

pizzaExpress.addMenu(food);

console.log(util.inspect(Restaurant.all, {depth: Infinity, colors: true}));
console.log('==========');
console.log(util.inspect(Menu.all, {depth: Infinity, colors: true}));
console.log('==========');
console.log(util.inspect(Item.all, {depth: Infinity, colors: true}));


// console.log(Restaurant.all);
// console.log(Menu.all);
// console.log(Item.all);
