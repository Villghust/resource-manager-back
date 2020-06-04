import Yup from 'yup';

import Resource from '../schemas/ResourceSchema.js';
import ResourceType from '../enums/ResourceTypeEnum.js';

class ResourceController {
    async store(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            type: Yup.mixed().oneOf(ResourceType.values()).require(),
            cost: Yup.string().required(),
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
            seat_cost: Yup.number().when('type', (type) =>
                type === ResourceType.PHYSICAL_SPACES
                    ? Yup.number().required()
                    : Yup.number().nullable()
            ),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation fails' });
        }

        const {
            _id,
            name,
            type,
            cost,
            size,
            seat_quantity,
            seat_cost,
        } = await Resource.create(req.body);

        if (req.body.type === ResourceType.PHYSICAL_SPACES)
            return res.status(201).json({
                _id,
                name,
                type,
                cost,
                size,
                seat_quantity,
                seat_cost,
            });

        return res.status(201).json({ _id, name, type, cost });
    }

    async list(req, res) {
        const { type } = req.query;

        let resources;

        if (type) {
            resources = await Resource.find({ type })
                .sort({ name: 'asc' })
                .limit(20);

            return res.status(200).json({ resources });
        } else {
            resources = await Resource.find({}).sort({ name: 'asc' }).limit(20);
        }

        return res.status(200).json({ resources });
    }
}

export default new ResourceController();
