import Yup from 'yup';
import moment from 'moment';

import Cost from '../schemas/CostSchema.js';
import Reservation from '../schemas/ReservationSchema.js';
import Resources from '../schemas/ResourceSchema.js';

import ResourceType from '../enums/ResourceTypeEnum.js';

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
            return res.status(400).json({ error: 'Validation fails' });
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

    async available(req, res) {
        const schema = Yup.object().shape({
            type: Yup.string().oneOf(ResourceType.values()).required(),
            startDate: Yup.string().required(),
            endDate: Yup.string().required(),
        });

        if (!(await schema.isValid(req.query))) {
            return res.status(400).json({ error: 'Validation fails' });
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

    async list(req, res) {
        let { startDate, endDate } = req.query;

        // Se tiver startDate e endDate, listamos por periodo. Caso contrário tudo.

        // moment(startDate).isBetween()

        const reservation = await Reservation.find({}).sort({ name: 'asc' });

        return res.status(200).json({ reservation });
    }

    async resources(req, res) {
        const { resource_id } = req.params;

        return res.status(200).json({ 'deu bom': true });
    }

    async users(req, res) {
        const { user_id } = req.params;

        return res.status(200).json({ 'deu bom': true });
    }

    async delete(req, res) {
        const reservation = await reservation.findById(
            req.params.reservation_id
        );

        if (!reservation) {
            return res.status(404).json({ error: 'reservation not found' });
        }

        for (const user of reservation.user_list) {
            await User.findOneAndUpdate(
                { email: user.email },
                { reservation: null }
            );
        }

        await reservation.deleteOne({ _id: req.params.reservation_id });

        return res.status(200).send();
    }
}

export default new ReservationController();
