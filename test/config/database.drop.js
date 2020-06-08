import Cost from '../../src/app/schemas/CostSchema.js';
import Reservation from '../../src/app/schemas/ReservationSchema.js';
import Resource from '../../src/app/schemas/ResourceSchema.js';
import User from '../../src/app/schemas/UserSchema.js';

export default (entity) => {
    switch (entity) {
        case 'Cost':
            Cost.collection.drop();
            break;

        case 'Reservation':
            Reservation.collection.drop();
            break;

        case 'Resource':
            Resource.collection.drop();
            break;

        case 'User':
            User.collection.drop();
            break;
    }
};
