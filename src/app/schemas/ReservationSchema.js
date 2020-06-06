import mongoose from 'mongoose';

const ReservationSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        resource: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Resource',
            required: true,
        },
        resource_type: {
            type: String,
            required: true,
        },
        startDate: {
            type: Date,
            required: true,
        },
        endDate: {
            type: Date,
            required: true,
        },
        total_cost: {
            type: Number,
        },
    },
    {
        timestamps: false,
    }
);

export default mongoose.model('Reservation', ReservationSchema);
