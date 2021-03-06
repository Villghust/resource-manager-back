import express from 'express';

import routes from '../../src/routes.js';

import './database.mock.js';

class AppMock {
    constructor() {
        this.server = express();
        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.server.use(express.json());
    }

    routes() {
        this.server.use(routes);
    }
}

export default new AppMock().server;
