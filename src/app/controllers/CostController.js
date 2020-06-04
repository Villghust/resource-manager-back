import Yup from 'yup';

import Cost from '../schemas/CostSchema.js';

class CostController {
    async store(req, res) {
        const schema = Yup.object().shape({
            cost: Yup.number().required(),
            seat_cost: Yup.number().required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation fails' });
        }

        let obj = await Cost.findOne();

        if (!obj) {
            obj = await Cost.create(req.body);
        } else {
            Object.assign(obj, req.body);
            obj.save();
        }

        return res.status(200).json(obj);
    }
}

export default new CostController();
