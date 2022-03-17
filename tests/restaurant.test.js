const Restaurant = require('../classes/restaurant.js');
const Menu = require('../classes/menu.js');
const Item = require('../classes/item.js');

describe('Restaurant', () => {
	test('create restaurants', () => {
		let pizzaExpress = new Restaurant('pizza express');
		expect(pizzaExpress.name).toBe('pizza express')
		expect(pizzaExpress.menus.length).toBe(0)
	})
	test('create restaurants and add menus', () => {
		let pizzaExpress = new Restaurant('pizza express');
		let drinks = new Menu('bevearges');
		let mains = new Menu('pizzas');
		pizzaExpress.addMenu(drinks);
		pizzaExpress.addMenu(mains);
		expect(pizzaExpress.menus.length).toBe(2);
	})
	test('create restaurants and remove menus', () => {
		let pizzaExpress = new Restaurant('pizza express');
		let drinks = new Menu('bevearges');
		let mains = new Menu('pizzas');
		pizzaExpress.addMenu(drinks);
		pizzaExpress.addMenu(mains);
		expect(pizzaExpress.menus.length).toBe(2);
		pizzaExpress.removeMenu(drinks);
		expect(pizzaExpress.menus.length).toBe(1);
	})
})