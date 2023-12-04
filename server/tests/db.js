const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

let mongod;

// connect to the in-memory database
module.exports.connect = async () => {
  mongod = await MongoMemoryServer.create();
  const uri = await mongod.getUri();

  const mongooseOpts = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    poolSize: 10,
    useCreateIndex: true,
  };

  await mongoose.connect(uri, mongooseOpts);
};

// disconnect and close connection
module.exports.closeDatabase = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongod.stop();
};

// clear the db, remove all data
module.exports.clearDatabase = async () => {
  const collections = mongoose.connection.collections;

  for (const key in collections) {
    const collection = collections[key];
    // console.log(await collection.findOne());
    await collection.deleteMany();
  }
};
