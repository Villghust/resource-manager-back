import Yup from 'yup';
import moment from 'moment';

import ResourceType from '../enums/ResourceTypeEnum.js';

import Cost from '../schemas/CostSchema.js';
import Reservation from '../schemas/ReservationSchema.js';
import Resources from '../schemas/ResourceSchema.js';

class ReservationController {
    async store(req, res) {
        const schema = Yup.object().shape({
            user_id: Yup.string().required(),
            resource_id: Yup.string().required(),
            resource_type: Yup.string().oneOf(ResourceType.values()).required(),
            startDate: Yup.date().required(),
            endDate: Yup.date().required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Contract validation fails' });
        }

        const {
            user_id,
            resource_id,
            resource_type,
            startDate,
            endDate,
        } = req.body;

        if (
            resource_type === ResourceType.FURNITURE &&
            moment(endDate).diff(moment(startDate), 'days') < 4
        )
            return res.status(422).json({
                error:
                    'The difference between start date and end date for FURNITURE items must be greater than 4 days',
            });

        if (moment(endDate).diff(moment(startDate), 'days') < 1)
            return res.status(422).json({
                error:
                    'The difference between start date and end date must be greater than 1 day',
            });

        const resource = await Resources.findById(resource_id);

        let total_cost;

        if (resource_type === ResourceType.PHYSICAL_SPACES) {
            const { cost, seat_cost } = await Cost.findOne({});

            total_cost =
                resource.size * cost + seat_cost * resource.seat_quantity;
        } else {
            total_cost = resource.cost;
        }

        total_cost =
            total_cost * moment(endDate).diff(moment(startDate), 'days');

        const reservation = await Reservation.create({
            user: user_id,
            resource: resource_id,
            resource_type,
            startDate,
            endDate,
            total_cost,
        });

        return res.status(201).json(reservation);
    }

    async list(req, res) {
        const schema = Yup.object().shape({
            startDate: Yup.string().nullable(),
            endDate: Yup.string().nullable(),
        });

        if (!(await schema.isValid(req.query))) {
            return res.status(400).json({ error: 'Contract validation fails' });
        }

        const { startDate, endDate } = req.query;

        let reservations;

        if (startDate && endDate) {
            reservations = await Reservation.find({
                $and: [
                    { startDate: { $gte: startDate } },
                    { endDate: { $lte: endDate } },
                ],
            });

            return res.status(200).json({ reservations });
        }

        reservations = await Reservation.find({});

        return res.status(200).json({ reservations });
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
                    'The difference between start date and end date for FURNITURE items must be greater than 4 days',
            });

        if (moment(endDate).diff(moment(startDate), 'days') < 1)
            return res.status(422).json({
                error:
                    'The difference between start date and end date must be greater than 1 day',
            });

        const resources = await Resources.find({ type });

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

        return res.status(200).json({ response });
    }

    async delete(req, res) {
        const { reservation_id } = req.params;

        const reservation = await Reservation.findById(reservation_id);

        if (!reservation)
            return res.status(404).json({ error: 'Reservation not found' });

        if (moment().isAfter(reservation.endDate))
            return res.status(422).json({ error: 'Reservation expired' });

        await Reservation.deleteOne({ _id: reservation_id });

        return res.status(200).send();
    }
}

export default new ReservationController();
