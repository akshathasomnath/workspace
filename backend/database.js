import Database from 'better-sqlite3';
import { hash } from './jwt.js';

const DBSOURCE = "products.sqlite"
const db = new Database(DBSOURCE, { verbose: console.log });

let users_table_created = false;
try {
    db.exec(`CREATE TABLE users
    (
        id TEXT PRIMARY KEY,
        fullname text, 
        email text UNIQUE, 
        password text, 
        CONSTRAINT email_unique UNIQUE (email)
    )`);

    users_table_created = true;
}
catch { }

const INSERT_USER = db.prepare('INSERT INTO users (id, fullname, email, password) VALUES (?,?,?,?)');
if (users_table_created) {
    const adminHash = hash("admin123");
    INSERT_USER.run(["uid1", "admin", "admin@buyproducts.com", adminHash])
    
    const defaultHash = hash("user123");
    INSERT_USER.run(["uid2", "user1", "user1@buyproducts.com", defaultHash])
    INSERT_USER.run(["uid3", "user2", "user2@buyproducts.com", defaultHash])
    INSERT_USER.run(["uid4", "user3", "user3@buyproducts.com", defaultHash])
}

let products_table_created = false;
try {
    db.exec(`CREATE TABLE products
    (
        id TEXT PRIMARY KEY,
        category TEXT, 
        name TEXT, 
        description TEXT, 
        units INTEGER
    )`);

    products_table_created = true;
}
catch { }

const INSERT_PRODUCT = db.prepare('INSERT INTO products (id, category, name, description, units) VALUES (?,?,?,?,?)');
if (products_table_created) {
    INSERT_PRODUCT.run(["P01", "Commercial", "A320", "Passenger aircraft family", 2])
    INSERT_PRODUCT.run(["P02", "Commercial", "A320", "Passenger aircraft family", 3])
    INSERT_PRODUCT.run(["P03", "Space", "Sentinel", "Satellite family", 1])
    INSERT_PRODUCT.run(["P04", "Helicopter", "H135", "Light twin", 2])
    INSERT_PRODUCT.run(["P05", "Helicopter", "H135", "Intermediate single", 3])
}

const SELECT_PRODUCTS = db.prepare('SELECT * FROM products');
const SELECT_PRODUCTS_BY_CATEGORY = db.prepare('SELECT * FROM products WHERE category=?');
const UPDATE_PRODUCT = db.prepare("UPDATE products SET category=?, name=?, description=?, units=? WHERE id=?");
const DELETE_PRODUCT = db.prepare("DELETE FROM products WHERE id=?");

const SELECT_USER_BYEMAIL = db.prepare("SELECT * FROM users WHERE email=?");

export {
	db,
    SELECT_PRODUCTS,
    SELECT_PRODUCTS_BY_CATEGORY,
	INSERT_PRODUCT,
    UPDATE_PRODUCT,
    DELETE_PRODUCT,

    SELECT_USER_BYEMAIL,
    INSERT_USER,
};