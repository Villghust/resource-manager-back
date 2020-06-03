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
        duration: {
            type: Number,
            required: true,
        },
        startDate: {
            type: Date,
            required: true,
        },
    },
    {
        timestamps: false,
    }
);

export default mongoose.model('Reservation', ReservationSchema);
