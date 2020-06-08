import mongoose from 'mongoose';

const connection = {
    production: {
        url: `mongodb://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@${process.env.MONGO_DB_IP}/resource-manager`,
    },
    development: {
        url: 'mongodb://localhost:27017/resource-manager',
    },
};

class Database {
    constructor() {
        this.mongo();
    }

    mongo() {
        this.mongoConnection = mongoose.connect(
            process.env.ENVIRONMENT
                ? connection[process.env.ENVIRONMENT].url
                : 'mongodb://localhost:27017/resource-manager',
            { useNewUrlParser: true, useFindAndModify: true }
        );
    }
}

export default new Database();
