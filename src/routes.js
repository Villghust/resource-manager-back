import express from 'express';

import UserController from './app/controllers/UserController.js';
import ResourceController from './app/controllers/ResourceController.js';
import ReservationController from './app/controllers/ReservationController.js';

const routes = new express.Router();

routes.post('/users', UserController.store);
routes.get('/users', UserController.list);

routes.post('/resources', ResourceController.store);
routes.get('/resources', ResourceController.list);

routes.post('/reservations', ReservationController.store);
routes.get('/reservations/available', ReservationController.available);
routes.get('/reservations/list', ReservationController.list);
routes.get(
    '/reservations/resources/:resource_id',
    ReservationController.resources
);
routes.get('/reservations/users/:user_id', ReservationController.users);
routes.delete('/reservations/:reservation_id', ReservationController.delete);

export default routes;
