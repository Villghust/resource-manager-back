import Yup from 'yup';

import Reservation from '../schemas/ReservationSchema.js';
import User from '../schemas/UserSchema.js';

class UserController {
    async store(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string().email().required(),
            registration: Yup.string().required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Contract validation fails' });
        }

        const { name, email, registration } = req.body;

        const userByEmail = await User.findOne({ email });
        const userByRegistration = await User.findOne({ registration });

        if (userByEmail || userByRegistration) {
            return res.status(422).json({ error: 'User already exists' });
        }

        const user = await User.create({
            name,
            email,
            registration,
        });

        return res.status(201).json(user);
    }

    async list(req, res) {
        const users = await User.find({}).sort({ name: 'asc' });

        return res.status(200).json({ users });
    }

    async totalCost(req, res) {
        const reservations = await Reservation.find({}).populate(['user']);

        let users = {};

        for (const reservation of reservations) {
            const { user, total_cost } = reservation;

            const { id, name, email, registration } = user;

            if (users[id]) {
                users[id].total_cost += total_cost;
                break;
            }

            Object.assign(users, {
                [id]: {
                    id,
                    name,
                    email,
                    registration,
                    total_cost,
                },
            });
        }

        return res.status(200).json(users);
    }
}

export default new UserController();
