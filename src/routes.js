import express from 'express';

import CostController from './app/controllers/CostController.js';
import UserController from './app/controllers/UserController.js';
import ResourceController from './app/controllers/ResourceController.js';
import ReservationController from './app/controllers/ReservationController.js';

const routes = new express.Router();

routes.post('/cost', CostController.store);

routes.post('/users', UserController.store);
routes.get('/users', UserController.list);
routes.get('/users/cost', UserController.totalCost);

routes.post('/resources', ResourceController.store);
routes.get('/resources', ResourceController.list);
routes.get('/resources/available', ResourceController.available);
routes.get('/resources/cost', ResourceController.totalCost);

routes.post('/reservations', ReservationController.store);
routes.get('/reservations', ReservationController.list);
routes.delete('/reservations/:reservation_id', ReservationController.delete);

export default routes;
