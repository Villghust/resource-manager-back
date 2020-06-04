import mongoose from 'mongoose';
import ResourceType from '../enums/ResourceTypeEnum.js';

const ResourceSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            enum: ResourceType.values(),
            required: true,
        },
        cost: {
            type: Number,
            required: true,
        },
        size: {
            type: Number,
        },
        seat_quantity: {
            type: Number,
        },
        seat_cost: {
            type: Number,
        },
    },
    {
        timestamps: false,
    }
);

export default mongoose.model('Resource', ResourceSchema);
