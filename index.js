const Restaurant = require('./classes/restaurant.js');
const Menu = require('./classes/menu.js');
const Item = require('./classes/item.js');

// Item.init();
// Menu.init();
// Restaurant.init();

// const util = require('util');
// console.log(util.inspect(Restaurant.all, {depth: Infinity, colors: true}));
// console.log(util.inspect(Menu.all, {depth: Infinity, colors: true}));
// console.log(util.inspect(Item.all, {depth: Infinity, colors: true}));

module.exports = { Restaurant, Menu, Item };