import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const SALTROUNDS = 10;
const HASH_SALT = bcrypt.genSaltSync(SALTROUNDS);

function hash(password) {
	return bcrypt.hashSync(password, HASH_SALT);
}

function comparePasswords(password, encryptedPassword) {
	return bcrypt.compareSync(password, encryptedPassword);
}

function sign(userId, email) {
	return jwt.sign({ user_id: userId, email }, process.env.TOKEN_KEY,
		{
			expiresIn: "2h",
		});
}

function authenticate(req, res, next) {
	const token =
		req.body.token || req.query.token || req.headers["x-access-token"];

	if (!token) {
		return res.status(403).send("a token is required for authentication");
	}
	try {
		const decoded = jwt.verify(token, process.env.TOKEN_KEY);
		req.user = decoded;
	} catch (err) {
		return res.status(401).send("invalid token");
	}
	return next();
};

export {
	hash,
	sign,
	comparePasswords,
	authenticate
}