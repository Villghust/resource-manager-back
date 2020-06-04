import mongoose from 'mongoose';

import Resource from './ResourceSchema.js';

import ResourceType from '../enums/ResourceTypeEnum.js';

const CostSchema = new mongoose.Schema(
    {
        cost: {
            type: Number,
            required: true,
        },
        seat_cost: {
            type: Number,
            required: true,
        },
    },
    {
        timestamps: false,
    }
);

CostSchema.post('save', (c) => {
    Resource.update(
        { type: ResourceType.PHYSICAL_SPACES },
        {
            cost: c.cost,
            seat_cost: c.seat_cost,
        },
        { multi: true }
    ).exec();
});

export default mongoose.model('Cost', CostSchema);
