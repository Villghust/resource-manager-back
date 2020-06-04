import Yup from 'yup';

import Resource from '../schemas/ResourceSchema.js';
import Cost from '../schemas/CostSchema.js';

import ResourceType from '../enums/ResourceTypeEnum.js';

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
            return res.status(400).json({ error: 'Validation fails' });
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
}

export default new ResourceController();
