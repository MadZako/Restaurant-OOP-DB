const Menu = require('../classes/menu.js');
const Item = require('../classes/item.js');

describe('Menu', () => {
	test('create menus', () => {
		let drinks = new Menu('drinks');
		let mains = new Menu('mains');
		expect(drinks.name).toBe('drinks')
		expect(mains.name).toBe('mains')
		expect(drinks.items.length).toBe(0)
		expect(mains.items.length).toBe(0)
	})
	test('create menus and add items', () => {
		let drinks = new Menu('drinks');
		let mains = new Menu('mains');
		
		mains.addItem(new Item('apple pie', 5.00))
		mains.addItem(new Item('nuggets', 4.00))
		mains.addItem(new Item('fries', 1.15))

		drinks.addItem(new Item('coke', 1.00))
		drinks.addItem(new Item('fanta', 0.05))

		expect(mains.items.length).toBe(3)
		expect(drinks.items.length).toBe(2)
	})
	test('create menus and remove items', () => {
		let drinks = new Menu('drinks');
		let mains = new Menu('mains');

		let pie = new Item('apple pie', 5.00);
		let soup = new Item('nuggets', 4.00);
		let cookie = new Item('fries', 1.15);
		
		mains.addItem(pie)
		mains.addItem(soup)
		mains.addItem(cookie)

		let coke = new Item('coke', 1.00);
		let water = new Item('fanta', 0.05);

		drinks.addItem(coke);
		drinks.addItem(water);

		expect(mains.items.length).toBe(3);
		expect(drinks.items.length).toBe(2);
		
		mains.removeItem(soup);
		drinks.removeItem(coke);
		
		expect(mains.items.length).toBe(2)
		expect(drinks.items.length).toBe(1)
	})
})