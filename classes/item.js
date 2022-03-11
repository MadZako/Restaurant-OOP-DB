const path = require('path')
const db = require('better-sqlite3')(path.join(__dirname, '../db.sqlite'))

class Item {
	static all = []
	name
	price
	stock
	static init = function () {
		db.prepare('CREATE TABLE IF NOT EXISTS items (itemId INTEGER, menuId INTEGER, name TEXT, price REAL, stock BOOLEAN, PRIMARY KEY (itemId));').run();
		const itemsInDB = db.prepare('SELECT * FROM items;').all();
		itemsInDB.forEach(item => {
			const { name, price, stock} = item;
			const newItem = new Item(name, price);
			if (stock === 0) newItem.toggleStock();
		})
	}

	constructor (name, price) {
		if (typeof name !== 'string') throw new Error('name must be string');
		this.name = name;
		this.price = price;
		this.stock = true;
		Item.all.push(this);

		const dbIndex = db.prepare('SELECT itemId FROM items WHERE name = ?;').get(name);
		if (dbIndex === undefined) {
			db.prepare('INSERT INTO items (menuID, name, price, stock) VALUES (?, ?, ?, ?);').run(0, this.name, this.price, 1);
		}
	}

	changePrice (newPrice) {
		this.price = newPrice;
		db.prepare('UPDATE items SET price = ? WHERE name = ?;').run(newPrice, this.name);
	}

	toggleStock () {
		this.stock = !this.stock;
		let state = (this.stock) ? 1 : 0;
		db.prepare('UPDATE items SET stock = ? WHERE name = ?;').run(state, this.name);
	}
}

module.exports = Item;