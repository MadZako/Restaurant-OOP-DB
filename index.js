const Restaurant = require('./classes/restaurant.js');
const Menu = require('./classes/menu.js');
const Item = require('./classes/item.js');
const util = require('util');

// const db = require('better-sqlite3')(':memory:')

Item.init();
Menu.init();
Restaurant.init();

const kfc = new Restaurant('kfc');
const mcD = new Restaurant('McDonalds');
const nandos = new Restaurant('Nandos');
const fiveGuys = new Restaurant('Five Guys');
const pizzaExpress = new Restaurant('Pizza Express');

const meze = new Menu('Meze');

const pie = new Item('pie', 5.00);
const pier = new Item('pier', 5.00);
pier.changePrice(7.00);
const meatballs = new Item('meatballs', 5.00);
const cheese = new Item('cheese', 0.50);
const cheeser = new Item('cheeser', 0.50);

meze.addItem(pie)
meze.addItem(cheese)
meze.addItem(meatballs)
meze.removeItem(cheese);

pizzaExpress.addMenu(meze);

console.log(util.inspect(Restaurant.all, {depth: Infinity, colors: true}));


// console.log(Restaurant.all);
// console.log(Menu.all);
// console.log(Item.all);
