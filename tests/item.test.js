const Item = require('../classes/item.js');

describe('Items', () => {
	test('create item', () => {
		let pie = new Item('pie', 5.00);
		expect(typeof pie.name).toBe('string')
		expect(pie.name).toBe('pie');
	})
	test('change items price', () => {
		let soup = new Item('Soup', 4.00);
		expect(soup.price).toBe(4);
		soup.changePrice(4.50);
		expect(soup.price).toBe(4.5);
	})
	test('change items stock', () => {
		let cookie = new Item('Cookie', 1.15);
		expect(cookie.stock).toBe(true)
		cookie.toggleStock();
		expect(cookie.stock).toBe(false)
	})
})