import Yup from 'yup';
import moment from 'moment';

import Reservation from '../schemas/ReservationSchema.js';

import ResourceType from '../enums/ResourceTypeEnum.js';

class ReservationController {
    async store(req, res) {
        const schema = Yup.object().shape({
            user: Yup.object()
                .shape({
                    user_id: Yup().string().required(),
                })
                .required(),
            resource: Yup.object()
                .shape({
                    resource_id: Yup().string().required(),
                })
                .required(),
            resource_type: Yup.string().required(),
            startDate: Yup.date().min(moment()._d).required(),
            endDate: Yup.date().when('resource_type', (type) =>
                type === ResourceType.FURNITURE
                    ? Yup.date().min(moment().add(4, 'd')._d).required()
                    : Yup.date().min(moment().add(1, 'd')._d).required()
            ),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation fails' });
        }

        // TODO - Rever regras de negócio
        // Disponibilidade
        // Data não pode ser passado
        // Calcular total_cost

        const reservation = await Reservation.create(req.body);

        return res.status(201).json(reservation);
    }

    async available(req, res) {
        // TODO - where disponiveis
        const { type } = req.query;

        return res.status(200).json({ 'deu bom': true });
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
