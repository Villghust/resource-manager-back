import mongoose from 'mongoose';

class DatabaseSeed {
    constructor() {
        this.mongo();
    }

    mongo() {
        this.mongoConnection = mongoose.connect(
            // 'mongodb://localhost:27017/resource-manager', // Para ambiente de desenvolvimento, utilizar este
            'mongodb://db:27017/resource-manager', // Para ambiente docker, utilizar este
            { useNewUrlParser: true, useFindAndModify: true }
        );
    }
}

export default new DatabaseSeed();
