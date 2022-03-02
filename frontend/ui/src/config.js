const url = import.meta.env.MODE != "production" ? "http://localhost:8080" : window.location.origin
console.log("API ENDPOINT - ", url, window.location)

export {
	url
};