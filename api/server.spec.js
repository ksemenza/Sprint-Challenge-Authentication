const request = require('supertest');
const server = require('./server.js');

describe('server', function() {
    it('runs the test', function() {
        expect(true).toBe(true);
    });
});

describe('POST /api/auth/register', function() {
    it ('should return status 201 after a successful registration', function() {
        let randomNum = Math.random() * 8000;
        return request(server)
        .post('/api/auth/register')
        .send({"username": `dave${randomNum}`,
        "password": "toast",
        })
        .then(res => {
            expect(res.status).toBe(201);
        });
    });
    it ('should return JSON after a successful registration', function() {
        let randomNum = Math.random() * 8000;
        return request(server)
        .post('/api/auth/register')
        .send({"username": `amy${randomNum}`,
        "password": "toast",
        })
        .then(res => {
            expect(res.type).toMatch(/json/i);
        });
    });
    it ('should return a token after a successful registration', function() {
        let randomNum = Math.random() * 8000;
        return request(server)
        .post('/api/auth/register')
        .send({"username": `jeff${randomNum}`,
        "password": "lumber",
        })
        .then(res => {
            expect(res.body.token).toBeDefined();
        });
    });      
});

describe('POST /api/auth/login', function() {
    it ('should return status 200 after a successful registration', function() {
        let randomNum = Math.random() * 8000;
        return request(server)
            .post('/api/auth/register')
            .send({"username": `tom${randomNum}`,
            "password": "toast",
            })
            .then(res => {
                return request(server)
                    .post('/api/auth/login')
                    .send({"username": `tom${randomNum}`,
                    "password": "toast",
                    })
                    .then(response => {
                        expect(response.status).toBe(200);
                    }); 
            });
    });
    it ('should return a token after a successful registration', function() {
        let randomNum = Math.random() * 8000;
        return request(server)
            .post('/api/auth/register')
            .send({"username": `henrik${randomNum}`,
            "password": "toast",
            })
            .then(res => {
                return request(server)
                    .post('/api/auth/login')
                    .send({"username": `henrik${randomNum}`,
                    "password": "toast",
                    })
                    .then(response => {
                        expect(response.body.token).toBeDefined();
                    }); 
            });
    });    
});

describe('GET /api/jokes', function() {
    it ('should return status 200 after a successful registration', function() {
        let randomNum = Math.random() * 8000;
        return request(server)
            .post('/api/auth/register')
            .send({"username": `declan${randomNum}`,
            "password": "toast",
            })
            .then(res => {
                let currentToken = res.body.token;
                return request(server)
                    .get('/api/jokes')
                    .set('Authorization', currentToken)
                    .then(response => {
                        expect(response.status).toBe(200);
                    });
            });
    });
    it ('should return a body of length > 0 after a successful registration', function() {
        let randomNum = Math.random() * 8000;
        return request(server)
            .post('/api/auth/register')
            .send({"username": `abby${randomNum}`,
            "password": "brasil",
            })
            .then(res => {
                let currentToken = res.body.token;
                return request(server)
                    .get('/api/jokes')
                    .set('Authorization', currentToken)
                    .then(response => {
                        expect(response.body.length).toBeGreaterThanOrEqual(1);
                    });
            });
    });
});