const path = require('path');
const db = require('better-sqlite3')(path.join(__dirname, '../db.sqlite'))
const Menu = require('./menu');

class Restaurant {
	static all = [];
	index;
	name;
	menus = [];
	static init = function () {
		db.prepare('CREATE TABLE IF NOT EXISTS restaurants (id INTEGER,	name TEXT, PRIMARY KEY (id));').run();
		const restaurantsInDB = db.prepare('SELECT * FROM restaurants;').all();
		const menusInDB = db.prepare('SELECT * FROM menus;').all();
		const linkedMenus = menusInDB.filter(obj => obj.restId > 0);
		restaurantsInDB.forEach(restaurant => {
			const { id, name} = restaurant
			new Restaurant(name, id);
		})

		linkedMenus.forEach(item => {
			const { menuId, restId } = item;
			let restaurantToUpdate = Restaurant.all.find(obj => obj.index === restId);
			let menuToUpdate = Menu.all.find(obj => obj.index === menuId);
			restaurantToUpdate.addMenu(menuToUpdate);
		})
	}

	constructor (name, id) {
		if (typeof name !== 'string') throw new Error('name must be string');
		this.name = name;
		if (id) {
			this.index = id;
		} else {
			this.index = (Restaurant.all.length + 1);
			db.prepare('INSERT INTO restaurants (name) VALUES (?)').run(this.name);
		}
		Restaurant.all.push(this);
	}

	updateRestaurant (name) {
		if (typeof name !== 'string') throw new Error('name must be a string');
		this.name = name;

		db.prepare('UPDATE restaurants SET name = ? WHERE id = ?;').run(name, this.index);
	}

	addMenu (menu) {
		if (!(menu instanceof Menu)) throw new Error('has to be a Menu object')
		this.menus.push(menu);
		let restIndex = db.prepare('SELECT id FROM restaurants WHERE name = ?;').get(this.name)
		db.prepare('UPDATE menus SET restId = ? WHERE name = ?;').run(restIndex.id, menu.name);
	}

	removeMenu (menu) {
		if (!(menu instanceof Menu)) throw new Error('has to be a Menu object')
		this.menus = this.menus.filter(ele => ele !== menu);
		
		db.prepare('UPDATE menus SET restId = ? WHERE name = ?;').run(0, menu.name);
	}
}

module.exports = Restaurant;