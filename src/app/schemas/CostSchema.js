import mongoose from 'mongoose';

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

export default mongoose.model('Cost', CostSchema);
