const path = require('path');
const db = require('better-sqlite3')(path.join(__dirname, '../db.sqlite'))
const Menu = require('./menu');

class Restaurant {
	static all = [];
	name
	menus = [];
	static init = function () {
		db.prepare('CREATE TABLE IF NOT EXISTS restaurants (id INTEGER,	name TEXT, PRIMARY KEY (id));').run();
		const restaurantsInDB = db.prepare('SELECT * FROM restaurants;').all();
		const menusInDB = db.prepare('SELECT * FROM menus;').all();
		const linkedMenus = menusInDB.filter(obj => obj.restId > 0);
		restaurantsInDB.forEach(restaurant => {
			new Restaurant(restaurant.name);
		})

		linkedMenus.forEach(item => {
			const restaurantName = db.prepare('SELECT name FROM restaurants WHERE id = ?;').get(item.restId);
			let restaurantToUpdate = Restaurant.all.find(obj => obj.name === restaurantName.name);
			let menuToAdd = Menu.all.find(obj => obj.name === item.name)
			restaurantToUpdate.addMenu(menuToAdd);
		})
	}

	constructor (name) {
		if (typeof name !== 'string') throw new Error('name must be string');
		this.name = name;
		Restaurant.all.push(this);
		const dbIndex = db.prepare('SELECT id FROM restaurants WHERE name = ?;').get(name);
		if (dbIndex === undefined) {
			db.prepare('INSERT INTO restaurants (name) VALUES (?)').run(this.name);
		}
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