const jwt = require('jsonwebtoken');
const data = require('../data/users.json');
const { connect, ObjectId } = require('./mongo');
const model = require('../models/users');
const COLLECTION_NAME = 'users'

const data = require('../data/users.json');

async function collection() {
    const db = await connect();
    return db.collection(COLLECTION_NAME);
}

async function getAll(page = 1, pageSize = 30) {
    const col = await collection();
    const items = await col.find().skip((page-1) * pageSize).limit(pageSize).toArray();
    const total = await col.countDocuments();
    return { items, total };
}

async function getById(id) {
    const col = await collection();
    const item = await col.findOne({ _id: new ObjectId(id) });
    return item;
}

async function add(item) {
    const col = await collection();

    const result = await col.insertOne(item);

    item._id = result.insertedId;
    return item;
}

async function update(item) {

    console.log(item);
    const col = await collection();
    const result = await col.findOneAndUpdate(
        { _id: new ObjectId(item.id) },
        { $set: item },
        { returnDocument: 'after' }
    );

    return result.value;
}

async function deleteItem(id) {
    const col = await collection();
    const result = await col.deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount;
}

async function search(searchTerm, page = 1, pageSize = 30) {
    const col = await collection();
    const query = {
        $or: [
            { name: { $regex: searchTerm, $options: 'i' } },
            { email: { $regex: searchTerm, $options: 'i' } },
        ]
    };

    const items = await col.find(query).skip((page - 1) * pageSize).limit(pageSize).toArray();
    const total = await col.countDocuments(query);
    return { items, total };
}

async function seed() {
    const col = await collection();
    const result = await col.insertMany(data.users);
    return result.insertedCount;
}

async function login(id){
    const col = await collection();
    const user = await col.findOne({ id });
    if(!user){
        throw new Error('User not found')
    }
    const cleanuser = { ...user }
    const token = await generateTokenAsync(cleanuser, process.env.JWT_SECRET, 'ld')

    return { user: cleanuser, token}
}

function generateTokenAsync(user, secret, expiresIn) {
    return new Promise( (resolve, reject) => {
        jwt.sign(user, secret, { expiresIn }, (err, token) => {
            if (err) {
                reject(err);
            } else {
                resolve(token);
            }
        });
    });
}

function verifyTokenAsync(token, secret) {
    return new Promise( (resolve, reject) => {
        jwt.verify(token, secret, (err, user) => {
            if (err) {
                reject(err);
            } else {
                resolve(user);
            }
        });
    });
}

module.exports = {
    getAll,
    getById,
    add,
    update,
    deleteItem,
    search,
    seed,
    login,
    generateTokenAsync,
    verifyTokenAsync

};