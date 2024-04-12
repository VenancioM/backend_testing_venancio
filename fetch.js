// GET

export const fakeGETConnect = () => {
	return fetch('http://localhost:3000', {
		method: 'GET'
	}).then((response) => {
		console.log(response);
	})
};

// POST

export const fakePOSTConnect = () => {
	return fetch('http://localhost:3000', {
		headers: {
			'Content-Type': 'application/json'
		},
		method: 'POST',
		body: JSON.stringify({ test: 'POST' })
	}).then((response) => {
		console.log(response);
	})
};

// PUT

export const fakePUTConnect = () => {
	return fetch('http://localhost:3000', {
		headers: {
			'Content-Type': 'application/json'
		},
		method: 'PUT',
		body: JSON.stringify({ test: 'PUT' })
	}).then((response) => {
		console.log(response);
	})
};