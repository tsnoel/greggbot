const MOCHAPI_URL = `http://192.168.1.239:3000`;
const got = require('got');

class UserService {
    async fetchUser(id) {
        const res = await got(`${MOCHAPI_URL}/user/${id ? id : ''}`);

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

    async createUser(data) {
        let res;

        try {
            res = await got.post(`${MOCHAPI_URL}/user`, {
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

    async createMochibux(id) {
        const res = await got.post(`${MOCHAPI_URL}/mochibux`, {
            json: {id, points: 0},
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
