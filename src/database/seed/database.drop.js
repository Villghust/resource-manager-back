import Cost from '../../app/schemas/CostSchema.js';
import Reservation from '../../app/schemas/ReservationSchema.js';
import Resource from '../../app/schemas/ResourceSchema.js';
import User from '../../app/schemas/UserSchema.js';

export default async () => {
    await Cost.deleteMany({});
    await Reservation.deleteMany({});
    await Resource.deleteMany({});
    await User.deleteMany({});
};
