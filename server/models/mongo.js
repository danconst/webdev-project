const { MongoClient, ObjectId  } = require('mongodb');

const url = process.env.MONGO_URL ?? "";
const DB_Name = process.env.MONGO_DB_NAME ?? 'workouts';

console.log(url)
console.log(DB_Name)
const client = new MongoClient(url);

async function connect() {
    const db = await client.connect();
    return db.db(DB_Name);
}


module.exports = {
    connect, ObjectId, DB_Name
}
