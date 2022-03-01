import express from 'express'
import bodyParser from "body-parser";
import { v4 as uuidv4 } from 'uuid';

import dotenv from 'dotenv';
dotenv.config();

import {
	hash,
	sign,
	comparePasswords,
	authenticate
} from './jwt.js';

const app = express()
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use('/static', express.static(join(__dirname, 'static')))

import {
	db,
	SELECT_PRODUCTS,
	SELECT_PRODUCTS_BY_CATEGORY,
	INSERT_PRODUCT,
	UPDATE_PRODUCT,
	DELETE_PRODUCT,

	SELECT_USER_BYEMAIL,
	INSERT_USER,
} from './database.js'

////////////////////////////////////////////////////////////
// PRODUCTS
////////////////////////////////////////////////////////////

app.get('/api/products', authenticate, function (req, res) {
	try {
		const rows = SELECT_PRODUCTS.all();
		res.json({
			"data": rows
		})
	} catch (error) {
		res.status(400)
			.json({
				"error": err.message
			});
	}
})

app.get('/api/products/:category', authenticate, function (req, res) {
	try {
		const category = req.params.category;
		const rows = SELECT_PRODUCTS_BY_CATEGORY.all(category);
		res.json({
			"data": rows
		})
	} catch (error) {
		res.status(400)
			.json({
				"error": error.message
			});
	}
})

app.post('/api/products/', authenticate, function (req, res) {
	try {
		var errors = []
		if (!req.body.id) {
			errors.push("No id specified");
		}
		if (!req.body.category) {
			errors.push("No product category specified");
		}
		if (!req.body.name) {
			errors.push("No product name specified");
		}
		if (!req.body.units) {
			errors.push("No product units specified");
		}
		if (errors.length) {
			res.status(400).json(
				{
					"error": errors.join(",")
				});
			return;
		}

		INSERT_PRODUCT.run([req.body.id, req.body.category, req.body.name, req.body.description, req.body.units]);
		const newProduct = {
			id: req.body.id,
			category: req.body.category,
			name: req.body.name,
			units: req.body.units
		}

		res.json({
			"data": newProduct
		})
	} catch (error) {
		res.status(400)
			.json({
				"error": error.message
			});
	}
})

app.put("/api/products", authenticate, (req, res, next) => {
	var errors = []
	if (!req.body.id) {
		errors.push("No id specified");
	}
	if (!req.body.category) {
		errors.push("No product_category specified");
	}
	if (!req.body.name) {
		errors.push("No product name specified");
	}
	if (!req.body.units) {
		errors.push("No product units specified");
	}
	if (errors.length) {
		res.status(400).json({
			"error": errors.join(",")
		});
		return;
	}

	try {
		UPDATE_PRODUCT.run([req.body.category, req.body.name, req.body.description, req.body.units, req.body.id]);
		res.json({
			"success": true,
			"id": req.body.id
		})
	} catch (error) {
		res.status(400).json({
			"error": err.message
		});
	}
});

// delete
app.delete("/api/products", authenticate, (req, res, next) => {
	var errors = []
	if (!req.body.id) {
		errors.push("No id specified");
	}
	if (errors.length) {
		res.status(400).json({
			"error": errors.join(",")
		});
		return;
	}

	try {
		DELETE_PRODUCT.run([req.body.id]);
		res.json({
			"success": true,
			"id": req.body.id
		})
	} catch (error) {
		res.status(400).json({
			"error": error.message
		});
	}
});

////////////////////////////////////////////////////////////
// USERS
////////////////////////////////////////////////////////////
app.post("/api/users/register", async (req, res) => {
	try {
		const { full_name, email, password } = req.body;

		if (!(email && password && full_name)) {
			res.status(400).send("full name, email, passwords are required");
		}

		const oldUsers = SELECT_USER_BYEMAIL.all(email);
		if (oldUsers && oldUsers.length) {
			return res.status(400).send("user already exists. try login with the credentials.");
		}

		const encryptedPassword = hash(password);
		const user = {
			id: uuidv4(),
			full_name,
			password: encryptedPassword,
			email: email.toLowerCase(),
		};
		INSERT_USER.run([user.id, user.full_name, user.email, user.password]);

		const token = sign(user.id, user.email);
		const nuser = {
			id: user.id,
			full_name: user.full_name,
			email: user.email,
			token,
		};
		res.status(201).json(nuser);
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
});

app.post("/api/users/login", async (req, res) => {
	try {
		const { email, password } = req.body;
		if (!(email && password)) {
			res.status(400).send("All input is required");
		}

		const oldUsers = SELECT_USER_BYEMAIL.all(email);
		if (!oldUsers || !oldUsers.length) {
			return res.status(400).send("user does not exist. try register.");
		}

		// get first user...
		const user = oldUsers[0];
		if (user && comparePasswords(password, user.password)) {
			const token = sign(user.id, user.email);
			const nuser = {
				id: user.id,
				full_name: user.full_name,
				email: user.email,
				token,
			};
			res.status(200).json(nuser);
			return;
		}
		res.status(400).send("invalid credentials");
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
});

app.listen(8080)