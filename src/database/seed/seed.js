import req from 'supertest';

import data from './data.js';

import app from './app.seed.js';

const request = req(app);
const seed = data();

seeding();

async function seeding() {
    try {
        await request.post('/cost').send(seed[0].documents[0]);
        await request.post('/users').send(seed[1].documents[0]);
        await request.post('/users').send(seed[1].documents[1]);
        await request.post('/users').send(seed[1].documents[2]);
        await request.post('/users').send(seed[1].documents[3]);
        await request.post('/users').send(seed[1].documents[4]);
        await request.post('/resources').send(seed[2].documents[0]);
        await request.post('/resources').send(seed[2].documents[1]);
        await request.post('/resources').send(seed[2].documents[2]);
        await request.post('/resources').send(seed[2].documents[3]);
        await request.post('/resources').send(seed[2].documents[4]);
        await request.post('/resources').send(seed[2].documents[5]);
        await request.post('/resources').send(seed[2].documents[6]);
        await request.post('/resources').send(seed[2].documents[7]);
        await request.post('/resources').send(seed[2].documents[8]);
        await request.post('/resources').send(seed[2].documents[9]);

        console.log('Done.');
    } catch (error) {
        console.log('err', error);
    }
    process.exit();
}
