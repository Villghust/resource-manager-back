import request from 'supertest';

import app from './app.mock.js';

export default () => request(app);
