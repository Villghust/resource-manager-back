import mongoose from 'mongoose';

class DatabaseMock {
    constructor() {
        this.mongo();
    }

    mongo() {
        this.mongoConnection = mongoose.connect(
            'mongodb://localhost:27017/resource-manager-test',
            { useNewUrlParser: true, useFindAndModify: true }
        );
    }
}

export default new DatabaseMock();
