const path = require('path');
const db = require('better-sqlite3')(path.join(__dirname, '../db.sqlite'))
const Item = require('./item');

class Menu {
	static all = [];
	index;
	name;
	items = [];
	static init = function () {
		db.prepare('CREATE TABLE IF NOT EXISTS menus (menuId INTEGER, restId INTEGER, name TEXT, PRIMARY KEY (menuId));').run();
		const menusInDB = db.prepare('SELECT * FROM menus;').all();
		const itemsInDB = db.prepare('SELECT * FROM items;').all();
		const linkedItems = itemsInDB.filter(obj => obj.menuId > 0);
		menusInDB.forEach(menu => {
			const { menuId, name } = menu
			new Menu(name, menuId);
		})

		linkedItems.forEach(item => {
			const { itemId, menuId } = item;
			let menuToUpdate = Menu.all.find(obj => obj.index === menuId);
			let itemToAdd = Item.all.find(obj => obj.index === itemId);
			menuToUpdate.addItem(itemToAdd);
		})
	}

	constructor (name, id) {
		if (typeof name !== 'string') throw new Error('name must be string');
		this.name = name;
		if (id) {
			this.index = id;
		} else {
			this.index = (Menu.all.length + 1);
			db.prepare('INSERT INTO menus (restId, name) VALUES (?, ?)').run(0, this.name);
		}		
		Menu.all.push(this);
	}

	updateMenu (name) {
		if (typeof name !== 'string') throw new Error('name must be a string');
		this.name = name;

		db.prepare('UPDATE menus SET name = ? WHERE menuId = ?;').run(name, this.index);
	}

	addItem (item) {
		if (!(item instanceof Item)) throw new Error('has to be an Item object')
		this.items.push(item);

		db.prepare('UPDATE items SET menuId = ? WHERE itemId = ?;').run(this.index, item.index);
	}

	removeItem (item) {
		if (!(item instanceof Item)) throw new Error('has to be an Item object')
		this.items = this.items.filter(obj => obj !== item);

		db.prepare('UPDATE items SET menuId = ? WHERE itemId = ?;').run(0, item.index);
	}
}

module.exports = Menu;