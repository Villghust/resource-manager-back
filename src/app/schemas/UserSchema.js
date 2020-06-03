import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        registration: {
            type: String,
            required: true,
            unique: true,
        },
    },
    {
        timestamps: false,
    }
);

export default mongoose.model('User', UserSchema);
