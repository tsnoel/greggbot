const MOCHAPI_URL = `http://192.168.1.206:3000`;
const got = require('got');

class UserService {
    async fetchUser(id) {
	console.log(`${MOCHAPI_URL}/user/${id ? id : ''}`)
        const res = await got(`${MOCHAPI_URL}/user/${id ? id : ''}`);

	console.log(res);
        return JSON.parse(res.body);
    }

    async updateUser(id, data) {
	let res;

	try {
        res = await got.put(`${MOCHAPI_URL}/user/${id}`, {
	    json: data,
	    responseType: 'json'
	});
	} catch (e) {
	    console.log(e);
	}

        return res.body;
    }
}

class MochibuxService {
    async fetchMochibux(id) {
        const res = await got(`${MOCHAPI_URL}/mochibux/${id}`);

        return JSON.parse(res.body);
    }

    async updateMochibux(id, data) {
        const res = await got.put(`${MOCHAPI_URL}/mochibux/${id}`, {
	    json: data,
	    responseType: 'json'
	});

        return res.body;   
    }
}

class WisdomService {
    async fetchWisdoms() {
        const res = await got(`${MOCHAPI_URL}/wisdom`);

      	return JSON.parse(res.body);
    }
}

class PingService {
    async fetchPings() {
        const res = await got(`${MOCHAPI_URL}/ping`);

      	return JSON.parse(res.body);
    }
}

module.exports = {
    user: new UserService(),
    mochibux: new MochibuxService(),
    wisdom: new WisdomService(),
    ping: new PingService()
}
