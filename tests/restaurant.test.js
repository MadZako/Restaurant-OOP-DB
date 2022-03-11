const Restaurant = require('../classes/restaurant.js');
const Menu = require('../classes/menu.js');
const Item = require('../classes/item.js');

describe('Restaurant', () => {
	test('create restaurants', () => {
		let nobu = new Restaurant('Nobu');
		expect(nobu.name).toBe('Nobu')
		expect(nobu.menus.length).toBe(0)
	})
	test('create restaurants and add menus', () => {
		let nobu = new Restaurant('Nobu');
		let drinks = new Menu('drinks');
		let mains = new Menu('mains');
		nobu.addMenu(drinks);
		nobu.addMenu(mains);
		expect(nobu.menus.length).toBe(2);
	})
	test('create restaurants and remove menus', () => {
		let nobu = new Restaurant('Nobu');
		let drinks = new Menu('drinks');
		let mains = new Menu('mains');
		nobu.addMenu(drinks);
		nobu.addMenu(mains);
		expect(nobu.menus.length).toBe(2);
		nobu.removeMenu(drinks);
		expect(nobu.menus.length).toBe(1);
	})
})