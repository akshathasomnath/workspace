import { url } from './config.js';

const SETTINGS = {
	headers: {
		'Content-Type': 'application/json',
		'Accept': 'application/json',
	},
};

const SETTINGS_GET = {
	method: 'GET',
	...SETTINGS
};

const SETTINGS_POST = {
	method: 'POST',
	...SETTINGS
};

const jsonGet = async (relativeUrl, token) => {
	let request = {
		...SETTINGS_GET
	}

	if (token) {
		request.headers['x-access-token'] = token
	}

	const response = await fetch(`${url}${relativeUrl}`, request)
	if (!response.ok) throw Error(response.message)
	return await response.json()
}

const jsonPost = async (relativeUrl, payload, token) => {
	let request = {
		...SETTINGS_POST,
		body: JSON.stringify(payload),
	}

	if (token) {
		request.headers['x-access-token'] = token
	}

	const response = await fetch(`${url}${relativeUrl}`, request)
	if (!response.ok) throw Error(response.message)
	return await response.json()
}

export {
	jsonGet, jsonPost
};
