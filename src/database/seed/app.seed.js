import express from 'express';

import routes from '../../routes.js';

import './database.seed.js';

class AppSeed {
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

export default new AppSeed().server;
