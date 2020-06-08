import moment from 'moment';
import Yup from 'yup';

import ResourceType from '../enums/ResourceTypeEnum.js';

import Cost from '../schemas/CostSchema.js';
import Reservation from '../schemas/ReservationSchema.js';
import Resource from '../schemas/ResourceSchema.js';

class ResourceController {
    async store(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            type: Yup.mixed().oneOf(ResourceType.values()).required(),
            cost: Yup.number().when('type', (type) =>
                type === ResourceType.PHYSICAL_SPACES
                    ? Yup.number().nullable()
                    : Yup.number().required()
            ),
            size: Yup.number().when('type', (type) =>
                type === ResourceType.PHYSICAL_SPACES
                    ? Yup.number().required()
                    : Yup.number().nullable()
            ),
            seat_quantity: Yup.number().when('type', (type) =>
                type === ResourceType.PHYSICAL_SPACES
                    ? Yup.number().required()
                    : Yup.number().nullable()
            ),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Contract validation fails' });
        }

        const { type } = req.body;

        if (type === ResourceType.PHYSICAL_SPACES) {
            const { name, size, seat_quantity } = req.body;
            const { cost, seat_cost } = await Cost.findOne();

            const resource = await Resource.create({
                name,
                type,
                size,
                seat_quantity,
                cost,
                seat_cost,
            });

            return res.status(201).json(resource);
        }

        const { name, cost } = req.body;

        const resource = await Resource.create({ name, type, cost });

        return res.status(201).json(resource);
    }

    async list(req, res) {
        const { type } = req.query;

        let resources;

        if (type) {
            resources = await Resource.find({ type }).sort({ name: 'asc' });
        } else {
            resources = await Resource.find({}).sort({ name: 'asc' });
        }

        return res.status(200).json({ resources });
    }

    async available(req, res) {
        const schema = Yup.object().shape({
            type: Yup.string().oneOf(ResourceType.values()).required(),
            startDate: Yup.string().required(),
            endDate: Yup.string().required(),
        });

        if (!(await schema.isValid(req.query))) {
            return res.status(400).json({ error: 'Contract validation fails' });
        }

        const { type, startDate, endDate } = req.query;

        if (
            type === ResourceType.FURNITURE &&
            moment(endDate).diff(moment(startDate), 'days') < 4
        )
            return res.status(422).json({
                error:
                    'The difference between start date and end date for FURNITURE items must be at least 4 days',
            });

        if (moment(endDate).diff(moment(startDate), 'days') < 1)
            return res.status(422).json({
                error:
                    'The difference between start date and end date must be at least 1 day',
            });

        const resources = await Resource.find({ type });

        let response = [];

        for (const resource of resources) {
            const reservations = await Reservation.find({
                resource: resource.id,
            });

            let isValid = true;

            for (const r of reservations) {
                if (moment(startDate).isAfter(r.endDate)) break;

                if (
                    moment(startDate).isBefore(r.startDate) &&
                    moment(endDate).isBefore(r.startDate)
                ) {
                    break;
                }

                isValid = false;
            }

            if (isValid) response.push(resource);
        }

        if (!response)
            return res.status(404).json({ error: 'No resources available' });

        return res.status(200).json({ response });
    }

    async totalCost(req, res) {
        const reservations = await Reservation.find({}).populate(['resource']);

        let resources = {};

        for (const reservation of reservations) {
            const { resource, total_cost } = reservation;

            const {
                id,
                name,
                type,
                cost,
                size,
                seat_quantity,
                seat_cost,
            } = resource;

            if (resources[id]) {
                resources[id].total_cost += total_cost;
                break;
            }

            Object.assign(resources, {
                [id]: {
                    id,
                    name,
                    type,
                    cost,
                    size,
                    seat_quantity,
                    seat_cost,
                    total_cost,
                },
            });
        }

        return res.status(200).json(resources);
    }
}

export default new ResourceController();
