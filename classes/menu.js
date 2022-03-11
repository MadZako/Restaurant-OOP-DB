const path = require('path');
const db = require('better-sqlite3')(path.join(__dirname, '../db.sqlite'))
const Item = require('./item');

class Menu {
	static all = []
	name;
	items = [];
	static init = function () {
		db.prepare('CREATE TABLE IF NOT EXISTS menus (menuId INTEGER, restId INTEGER, name TEXT, PRIMARY KEY (menuId));').run();
		const menusInDB = db.prepare('SELECT * FROM menus;').all();
		const itemsInDB = db.prepare('SELECT * FROM items;').all();
		const linkedItems = itemsInDB.filter(obj => obj.menuId > 0);
		menusInDB.forEach(menu => {
			new Menu(menu.name);
		})

		linkedItems.forEach(item => {
			const menuName = db.prepare('SELECT name FROM menus WHERE menuId = ?;').get(item.menuId)
			let menuToUpdate = Menu.all.find(obj => obj.name === menuName.name);
			let itemToAdd = Item.all.find(obj => obj.name === item.name)
			menuToUpdate.addItem(itemToAdd);
		})
	}

	constructor (name) {
		if (typeof name !== 'string') throw new Error('name must be string');
		this.name = name;
		Menu.all.push(this);

		const dbIndex = db.prepare('SELECT menuId FROM menus WHERE name = ?;').get(name);
		if (dbIndex === undefined) {
			db.prepare('INSERT INTO menus (restId, name) VALUES (?, ?)').run(0, this.name);
		}
	}

	addItem (item) {
		if (!(item instanceof Item)) throw new Error('has to be an Item object')
		this.items.push(item);

		let menuIndex = db.prepare('SELECT menuId FROM menus WHERE name = ?;').get(this.name);
		db.prepare('UPDATE items SET menuId = ? WHERE name = ?;').run(menuIndex.menuId, item.name);
	}

	removeItem (item) {
		if (!(item instanceof Item)) throw new Error('has to be an Item object')
		this.items = this.items.filter(obj => obj !== item);

		db.prepare('UPDATE items SET menuId = ? WHERE name = ?;').run(0, item.name);
	}
}

module.exports = Menu;