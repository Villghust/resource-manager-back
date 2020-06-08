import mongoose from 'mongoose';

class DatabaseSeed {
    constructor() {
        this.mongo();
    }

    mongo() {
        this.mongoConnection = mongoose.connect(
            'mongodb://localhost:27017/resource-manager',
            { useNewUrlParser: true, useFindAndModify: true }
        );
    }
}

export default new DatabaseSeed();
